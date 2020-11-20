/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
const knex = require("knex");
const app = require("../src/app");

describe("Testing the sights endpoint", () => {
    let db;
    let sights = [
        {
            id: 1,
            name: "Sight1",
            city: "City1",
            description: "Desc1",
            url: "url1",
            image: "image1",
        },
        {
            id: 2,
            name: "Sight2",
            city: "City2",
            description: "Desc2",
            url: "url2",
            image: "image2",
        },
        {
            id: 3,
            name: "Sight3",
            city: "City3",
            description: "Desc3",
            url: "url3",
            image: "image3",
        },
    ];
    before("make knex instance", () => {
        db = knex({
            client: "pg",
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set("db", db);
    });

    before("cleanup", () => db.raw("TRUNCATE TABLE sights CASCADE;"));

    afterEach("cleanup", () => db.raw("TRUNCATE TABLE sights CASCADE;"));

    after("disconnect from the database", () => db.destroy());
    describe("GET /api/sights/", () => {
        it("should return with an array with all sights", () => {
            return supertest(app)
                .get("/api/sights/")
                .expect(200)
                .expect((res) => {
                    expect(res.body).to.be.a("array");
                });
        });
    });
});
