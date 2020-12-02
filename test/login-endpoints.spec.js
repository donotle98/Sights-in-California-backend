/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");

describe("Testing login router endpoint", () => {
    describe("GET /api/login", () => {
        it("should return with a 200 status", () => {
            return supertest(app).get("/api/login").expect(200);
        });
    });
});
