import { EventHandlerContext, SubstrateProcessor } from '@subsquid/substrate-processor'
import { Store, TypeormDatabase } from '@subsquid/typeorm-store'
import assert from 'assert'
import { Auction, AuctionStatus } from './model'
import { Bid } from './model/generated/bid.model'
import { BidType } from './model/generated/_bidType'
import {
    AuctionsAuctionClosedEvent,
    AuctionsAuctionStartedEvent,
    AuctionsBidAcceptedEvent,
} from './types/generated/events'
import * as ss58 from '@subsquid/ss58'

const database = new TypeormDatabase()
const processor = new SubstrateProcessor(database)

processor.setBlockRange({ from: 7468792 })

processor.setBatchSize(500)
processor.setDataSource({
    archive: 'https://kusama.archive.subsquid.io/graphql',
    chain: 'wss://kusama-rpc.polkadot.io',
})

const LeasePeriodsPerSlot = 8

processor.addEventHandler('Auctions.AuctionStarted', async (ctx) => {
    const data = getAuctionStartedData(ctx)

    const auction = new Auction({
        id: data.auctionIndex.toString(),
        index: data.auctionIndex,
        firstPeriod: data.leasePeriod,
        lastPeriod: data.leasePeriod + LeasePeriodsPerSlot - 1,
        start: ctx.block.height,
        endingPeriodStart: data.ending,
        status: AuctionStatus.Started,
    })

    await ctx.store.insert(auction)
})

processor.addEventHandler('Auctions.AuctionClosed', async (ctx) => {
    const data = getAuctionClosedData(ctx)

    const auction = await ctx.store.get(Auction, data.auctionIndex.toString())
    assert(auction != null)

    auction.end = ctx.block.height
    auction.status = AuctionStatus.Closed

    await ctx.store.save(auction)
})

processor.addEventHandler('Auctions.BidAccepted', async (ctx) => {
    const { paraId, firstSlot, lastSlot, bidder, amount } = getBidAcceptedData(ctx)

    const auction = await ctx.store.get(Auction, { order: { index: 'DESC' } }) //current auction
    assert(auction != null)

    const bid = new Bid({
        id: ctx.event.id,
        blockNumber: ctx.block.height,
        timestamp: new Date(ctx.block.timestamp),
        paraId,
        firstSlot,
        lastSlot,
        amount,
        auction,
        type: ctx.event.call?.name === 'Auctions.bid' ? BidType.Bid : BidType.Crowdloan,
        bidder: encodeId(bidder),
    })

    await ctx.store.insert(bid)
})

processor.run()

function getAuctionStartedData(ctx: EventHandlerContext<Store>): {
    auctionIndex: number
    leasePeriod: number
    ending: number
} {
    const event = new AuctionsAuctionStartedEvent(ctx)
    if (event.isV9010) {
        const [auctionIndex, leasePeriod, ending] = event.asV9010
        return { auctionIndex, leasePeriod, ending }
    } else if (event.isV9230) {
        return event.asV9230
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

function getAuctionClosedData(ctx: EventHandlerContext<Store>): {
    auctionIndex: number
} {
    const event = new AuctionsAuctionClosedEvent(ctx)
    if (event.isV9010) {
        const auctionIndex = event.asV9010
        return { auctionIndex }
    } else if (event.isV9230) {
        return event.asV9230
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

function getBidAcceptedData(ctx: EventHandlerContext<Store>): {
    bidder: Uint8Array
    paraId: number
    amount: bigint
    firstSlot: number
    lastSlot: number
} {
    const event = new AuctionsBidAcceptedEvent(ctx)
    if (event.isV9010) {
        const [bidder, paraId, amount, firstSlot, lastSlot] = event.asV9010
        return { bidder, paraId, amount, firstSlot, lastSlot }
    } else if (event.isV9230) {
        return event.asV9230
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

const prefix = 'kusama'

export function encodeId(id: Uint8Array) {
    return ss58.codec(prefix).encode(id)
}

export class UnknownVersionError extends Error {
    constructor(name: string) {
        super(`There is no relevant version for ${name}`)
    }
}
