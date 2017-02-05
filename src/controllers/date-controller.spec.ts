import * as chai from "chai";
import chaiHttp = require("chai-http");

import app from "../../src/app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Date controller", () => {
    it("is authenticated", (done) => {
        chai.request(app)
            .get("/date")
            .end((err, response) => {
                expect(response).to.be.status(401);
                done();
            });
    });

    it("rejects wrong token", (done) => {
        chai.request(app)
            .get("/date")
            .set("Authorization", "foo")
            .end((err, response) => {
                expect(response).to.be.status(401);
                done();
            });
    });

    it("works with token", (done) => {
        chai.request(app)
            .get("/date")
            .set("Authorization", "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5lbGx5QHRoZS1qb25lc2VzLmNvbSIsImlkIjoxLCJuYW1lIjoiTmVsbHkgSm9uZXMiLCJwYXNzd29yZCI6IkFzZGYxMjM0ISJ9.jLTD4kb0K41RI8CoHoX2uk8hM-qjuCgysMww89lLdi4")
            .end((err, response) => {
                expect(response).to.be.status(200);
                done();
            });
    });
});