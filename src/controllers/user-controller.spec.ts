import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as mocha from "mocha";

import app from "../../src/app";

chai.use(chaiHttp);
const expect = chai.expect;

// let app: express.Application;
// beforeEach('load app', () => {
//     app = require("../app").default;
// });

describe("User controller", () => {
    it("GET should return JSON", (done) => {
        chai.request(app)
            .get("/users")
            .end((err, response) => {
                expect(err).to.be.null;
                expect(response).to.be.json;
                done();
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
