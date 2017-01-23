import * as mocha from "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import app from "../../src/app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("User controller", () => {
    it("GET should return JSON", () => {
        chai.request(app)
            .get("/users")
            .then(res =>
                console.log("foo!")
            )
    });

    it('GET should return an object', () => {
        chai.request(app)
            .get("/users")
            .end((err, result: any) => {
                expect(result.message).to.equal("okay");
            });
    });
});