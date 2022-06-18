module.exports = class Init1655652373932 {
  name = 'Init1655652373932'

  async up(db) {
    await db.query(`CREATE TABLE "auction" ("id" character varying NOT NULL, "index" integer NOT NULL, "start" integer NOT NULL, "ending_period_start" integer NOT NULL, "end" integer, "first_period" integer NOT NULL, "last_period" integer NOT NULL, "status" character varying(9) NOT NULL, CONSTRAINT "PK_9dc876c629273e71646cf6dfa67" PRIMARY KEY ("id"))`)
  }

  async down(db) {
    await db.query(`DROP TABLE "auction"`)
  }
}
