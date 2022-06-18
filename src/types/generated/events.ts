import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v9010 from './v9010'
import * as v9230 from './v9230'

export class AuctionsAuctionClosedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'Auctions.AuctionClosed')
  }

  /**
   *  An auction ended. All funds become unreserved. [auction_index]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('Auctions.AuctionClosed') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  An auction ended. All funds become unreserved. [auction_index]
   */
  get asV9010(): v9010.AuctionIndex {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * An auction ended. All funds become unreserved.
   */
  get isV9230(): boolean {
    return this.ctx._chain.getEventHash('Auctions.AuctionClosed') === 'b43a4f04c143465b1befbba20a53ad22053012b22824f10dc981cf180e36e10d'
  }

  /**
   * An auction ended. All funds become unreserved.
   */
  get asV9230(): {auctionIndex: number} {
    assert(this.isV9230)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9230
  }

  get asLatest(): {auctionIndex: number} {
    deprecateLatest()
    return this.asV9230
  }
}

export class AuctionsAuctionStartedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'Auctions.AuctionStarted')
  }

  /**
   *  An auction started. Provides its index and the block number where it will begin to
   *  close and the first lease period of the quadruplet that is auctioned.
   *  [auction_index, lease_period, ending]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('Auctions.AuctionStarted') === 'ee14df8652ec18f0202c95706dac25953673d4834fcfe21e7d7559cb96975c06'
  }

  /**
   *  An auction started. Provides its index and the block number where it will begin to
   *  close and the first lease period of the quadruplet that is auctioned.
   *  [auction_index, lease_period, ending]
   */
  get asV9010(): [v9010.AuctionIndex, v9010.LeasePeriod, v9010.BlockNumber] {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * An auction started. Provides its index and the block number where it will begin to
   * close and the first lease period of the quadruplet that is auctioned.
   */
  get isV9230(): boolean {
    return this.ctx._chain.getEventHash('Auctions.AuctionStarted') === '8b2d1722dc0088981b41be544b21195e4f399c63086aae153946e56fab444698'
  }

  /**
   * An auction started. Provides its index and the block number where it will begin to
   * close and the first lease period of the quadruplet that is auctioned.
   */
  get asV9230(): {auctionIndex: number, leasePeriod: number, ending: number} {
    assert(this.isV9230)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9230
  }

  get asLatest(): {auctionIndex: number, leasePeriod: number, ending: number} {
    deprecateLatest()
    return this.asV9230
  }
}

export class AuctionsBidAcceptedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'Auctions.BidAccepted')
  }

  /**
   *  A new bid has been accepted as the current winner.
   *  \[who, para_id, amount, first_slot, last_slot\]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('Auctions.BidAccepted') === '89884350b7a4ca0c3118205f5dd286d5dc73be6020a05db22ce70b152f4d165e'
  }

  /**
   *  A new bid has been accepted as the current winner.
   *  \[who, para_id, amount, first_slot, last_slot\]
   */
  get asV9010(): [v9010.AccountId, v9010.ParaId, v9010.Balance, v9010.LeasePeriod, v9010.LeasePeriod] {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A new bid has been accepted as the current winner.
   */
  get isV9230(): boolean {
    return this.ctx._chain.getEventHash('Auctions.BidAccepted') === 'd351ff1617e3b6a9ea0a145957d1071c8f96f30490cd8f8cb5287a3bc9c81fa6'
  }

  /**
   * A new bid has been accepted as the current winner.
   */
  get asV9230(): {bidder: v9230.AccountId32, paraId: v9230.Id, amount: bigint, firstSlot: number, lastSlot: number} {
    assert(this.isV9230)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9230
  }

  get asLatest(): {bidder: v9230.AccountId32, paraId: v9230.Id, amount: bigint, firstSlot: number, lastSlot: number} {
    deprecateLatest()
    return this.asV9230
  }
}
