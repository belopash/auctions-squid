import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Auction} from "./auction.model"
import {BidType} from "./_bidType"

@Entity_()
export class Bid {
  constructor(props?: Partial<Bid>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("int4", {nullable: false})
  paraId!: number

  @Index_()
  @ManyToOne_(() => Auction, {nullable: false})
  auction!: Auction

  @Column_("int4", {nullable: false})
  blockNumber!: number

  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date

  @Column_("int4", {nullable: false})
  firstSlot!: number

  @Column_("int4", {nullable: false})
  lastSlot!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint

  @Column_("varchar", {length: 9, nullable: false})
  type!: BidType

  @Column_("text", {nullable: false})
  bidder!: string
}
