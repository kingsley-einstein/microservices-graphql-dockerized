import { expect } from "chai";
import request from "supertest";
import app from "..";

const ROOT = "/api/v1/auth";
let token = "";
let id = null;

const name = "John Doe";
const dob = "1998-10-30";
const age = 21;

describe("Authentication tests", () => {
 describe("+++++++++++++++++++++", () => {
  it("should create a user", (done) => {
   request(app)
    .post(ROOT + "/create")
    .send({ name, dob, age })
    .end((err, res) => {
     const { status, body } = res;
     console.table([body.response]);
     token = body.response.token;
     id = body.response.id;
     expect(status).to.be.eql(201);
     done(err);
    });
  });
  it("should get user using their id", (done) => {
   request(app)
    .get(ROOT + "/byId/" + id)
    .end((err, res) => {
     const { status, body } = res;
     console.table([body.response]);
     expect(status).to.be.eql(200);
     done(err);
    });
  });
  it("should get a list of users", (done) => {
   request(app)
    .get(ROOT + "/all")
    .end((err, res) => {
     const { status, body } = res;
     console.table(body.response);
     expect(status).to.be.eql(200);
     expect(body.response).to.be.an("Array");
     done(err);
    });
  });
  it("should update a user by id", (done) => {
   request(app)
    .patch(ROOT + "/update/byId")
    .set("token", token)
    .send({ name: "Ashur Banipal" })
    .end((err, res) => {
     const { status, body } = res;
     console.table([body.response[1]]);
     expect(status).to.be.eql(200);
     done(err);
    });
  });
  it("should get logged in user", (done) => {
   request(app)
    .get(ROOT + "/logged")
    .set("token", token)
    .end((err, res) => {
     const { status, body } = res;
     console.table([body.response]);
     expect(status).to.be.eql(200);
     done(err);
    });
  });
 });
});
