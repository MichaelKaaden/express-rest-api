import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as mocha from "mocha";

import app from "../../src/app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("User controller", () => {
    it("GET should return JSON", () => {
        chai.request(app)
            .get("/users")
            .then((response) => {
                expect(response).to.be.json;
            });
    });

    it("GET should return an object", (done) => {
        chai.request(app)
            .get("/users")
            .end((err, response) => {
                expect(err).to.be.null;
                expect(response.body.message).to.equal("okay");
                done();
            });
    });
});
