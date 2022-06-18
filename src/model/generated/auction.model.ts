import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {AuctionStatus} from "./_auctionStatus"
import {Bid} from "./bid.model"

@Entity_()
export class Auction {
  constructor(props?: Partial<Auction>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("int4", {nullable: false})
  index!: number

  @Column_("int4", {nullable: false})
  start!: number

  @Column_("int4", {nullable: false})
  endingPeriodStart!: number

  @Column_("int4", {nullable: true})
  end!: number | undefined | null

  @Column_("int4", {nullable: false})
  firstPeriod!: number

  @Column_("int4", {nullable: false})
  lastPeriod!: number

  @Column_("varchar", {length: 9, nullable: false})
  status!: AuctionStatus

  @OneToMany_(() => Bid, e => e.auction)
  bids!: Bid[]
}
