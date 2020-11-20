/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
const knex = require("knex");
const app = require("../src/app");

describe("Testing bookmarks endpoint", () => {
    let db;
    let bookmarks = [
        {
            id: 1,
            first_name: "test1",
            sightid: 1,
        },
        {
            id: 2,
            first_name: "test2",
            sightid: 2,
        },
        {
            id: 3,
            first_name: "test3",
            sightid: 3,
        },
    ];
    before("make knex instance", () => {
        db = knex({
            client: "pg",
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set("db", db);
    });

    before("cleanup", () => db.raw("TRUNCATE TABLE bookmarks CASCADE;"));

    afterEach("cleanup", () => db.raw("TRUNCATE TABLE bookmarks CASCADE;"));

    after("disconnect from the database", () => db.destroy());
    describe("GET /api/sights/", () => {
        it("should return with an array with all bookmarks", () => {
            return supertest(app)
                .get("/api/bookmarks/")
                .expect(200)
                .expect((res) => {
                    expect(res.body).to.be.a("array");
                });
        });
    });
});
