/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
const knex = require("knex");
const app = require("../src/app");

describe("Testing the users router", () => {
    let db;
    let user = [
        {
            id: 1,
            first_name: "Donovan",
            username: "dondon",
            password: "123",
            city: "San Jose",
        },
        {
            id: 2,
            first_name: "Meeks",
            username: "itsmeeks",
            password: "1234",
            city: "San Jose",
        },
        {
            id: 3,
            first_name: "Gianne",
            username: "viagianne",
            password: "12345",
            city: "San Diego",
        },
    ];

    before("make knex instance", () => {
        db = knex({
            client: "pg",
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set("db", db);
    });

    before("cleanup", () =>
        db.raw("TRUNCATE TABLE sight_users RESTART IDENTITY;")
    );

    afterEach("cleanup", () =>
        db.raw("TRUNCATE TABLE sight_users RESTART IDENTITY;")
    );

    after("disconnect from the database", () => db.destroy());

    describe("GET /api/users/", () => {
        it("should return a array of users", () => {
            return supertest(app)
                .get("/api/users/")
                .expect(200)
                .expect((res) => {
                    expect(res.body).to.be.a("array");
                });
        });
    });
});
