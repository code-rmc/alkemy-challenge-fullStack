const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

const server = "http://localhost:3000/";

let token;
let idNewOperation;

const testOperation = {
  categoryId: 1,
  concept: "Test",
  amount: 3500,
  type: "EXIT",
};

describe("Test operations", () => {
  before((done) => {
    chai
      .request(server)
      .post("api/auth/login")
      .send({ email: "test8@test.com.ar", password: "123456" })
      .end((err, res) => {
        if (err) done(err);
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.property("token");
        done();
      });
  });
  /**
   * Test the GET
   */
  describe("GET api/operations", () => {
    it.skip("It should GET all the operations", (done) => {
      chai
        .request(server)
        .get("api/operation")
        .auth(token, { type: "bearer" })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.should.have.lengthOf(8);
          done();
        });
    });
    // Test Error 404
    it("It should not GET all the operations", (done) => {
      chai
        .request(server)
        .get("api/operations")
        .auth(token, { type: "bearer" })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET by Id
   */
  describe("GET operation/:id", () => {
    it("It should get a operation by id", (done) => {
      chai
        .request(server)
        .get("api/operation/1")
        .auth(token, { type: "bearer" })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("concept");
          res.body.should.have.property("amount");
          res.body.should.have.property("date");
          res.body.should.have.property("type");
          res.body.id.should.be.eq(1);
          done();
        });
    });

    // Test Error
    it("It should fail to fetch a operation by id.", (done) => {
      chai
        .request(server)
        .get("api/operation/180")
        .auth(token, { type: "bearer" })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(400);
          res.text.should.to.contain("The Id does not not exist in DB");
          done();
        });
    });
  });

  /**
   * Test the POST
   */
  describe("POST operation/", () => {
    it("It should add a operation", (done) => {
      chai
        .request(server)
        .post("api/operation")
        .auth(token, { type: "bearer" })
        .send(testOperation)
        .end((err, res) => {
          if (err) done(err);
          idNewOperation = res.body.id;
          res.should.have.status(201);
          done();
        });
    });

    it("It should authentication fail when adding a operation", (done) => {
      chai
        .request(server)
        .post(`api/operation`)
        .send(testOperation)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(401);
          res.text.should.to.contain("Authentication failed! Token required");
          done();
        });
    });
    it("It should fail the add a operation", (done) => {
      delete testOperation.amount;
      chai
        .request(server)
        .post("api/operation")
        .auth(token, { type: "bearer" })
        .send(testOperation)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(400);
          done();
        });
    });
  });

  /**
   * Test the PUT
   */
  describe("PUT operation/:id", () => {
    it("It should modifield operation.", (done) => {
      chai
        .request(server)
        .put(`api/operation/${idNewOperation}`)
        .auth(token, { type: "bearer" })
        .send({ concept: "Test2", amount: "1" })
        .end((err, res) => {
          if (err) done(err);
          console.log(res.text);
          res.should.have.status(200);
          res.text.should.to.contain("1");
          done();
        });
    });
  });

  /**
   * Test the DELETE
   */
  describe("DELETE operation/:id", () => {
    it("It should remove a operation", (done) => {
      chai
        .request(server)
        .delete(`api/operation/${idNewOperation}`)
        .auth(token, { type: "bearer" })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          done();
        });
    });

    it("It should fail remove a operation", (done) => {
      chai
        .request(server)
        .delete(`api/operation/${idNewOperation}`)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(401);
          done();
        });
    });
  });
});
