module.exports = class AddBid1655657456434 {
  name = 'AddBid1655657456434'

  async up(db) {
    await db.query(`CREATE TABLE "bid" ("id" character varying NOT NULL, "para_id" integer NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "first_slot" integer NOT NULL, "last_slot" integer NOT NULL, "amount" numeric NOT NULL, "type" character varying(9) NOT NULL, "bidder" text NOT NULL, "auction_id" character varying NOT NULL, CONSTRAINT "PK_ed405dda320051aca2dcb1a50bb" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_9e594e5a61c0f3cb25679f6ba8" ON "bid" ("auction_id") `)
    await db.query(`ALTER TABLE "bid" ADD CONSTRAINT "FK_9e594e5a61c0f3cb25679f6ba8d" FOREIGN KEY ("auction_id") REFERENCES "auction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "bid"`)
    await db.query(`DROP INDEX "public"."IDX_9e594e5a61c0f3cb25679f6ba8"`)
    await db.query(`ALTER TABLE "bid" DROP CONSTRAINT "FK_9e594e5a61c0f3cb25679f6ba8d"`)
  }
}
