const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

const server = "http://localhost:3000/";

let token;
let idNewOperation;

const testOperation = {
  concepto: "",
  monto: 3500,
  fecha: "",
  tipo: "",
};

describe("Test operations", () => {
  /**
   * Test the GET
   */
  describe("GET api/operations", () => {
    it("It should GET all the operations", (done) => {
      chai
        .request(server)
        .get("api/operation")
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.should.have.lengthOf(1);
          done();
        });
    });
    // Test Error 404
    it("It should not GET all the operations", (done) => {
      chai
        .request(server)
        .get("api/operations")
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
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("concepto");
          res.body.should.have.property("monto");
          res.body.should.have.property("fecha");
          res.body.should.have.property("tipo");
          res.body.id.should.be.eq(1);
          done();
        });
    });

    // Test Error
    it("It should fail to fetch a operation by id.", (done) => {
      chai
        .request(server)
        .get("api/operation/180")
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
    before.skip((done) => {
      chai
        .request(server)
        .post("api/auth/login")
        .send({ email: "prueba@prueba.com", password: "123456" })
        .end((err, res) => {
          if (err) done(err);
          token = res.body.token;
          res.should.have.status(200);
          res.body.should.property("token");
          done();
        });
    });

    it.skip("It should add a operation", (done) => {
      chai
        .request(server)
        .post("api/operation")
        .auth(token, { type: "bearer" })
        .send(testOperation)
        .end((err, res) => {
          if (err) done(err);
          idNewOperation = res;
          console.log(idNewOperation);
          res.should.have.status(201);
          done();
        });
    });

    it.skip("It should authentication fail when adding a operation", (done) => {
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
    it.skip("It should fail the add a operation", (done) => {
      delete testOperation.monto;
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
    it.skip("It should modifield operation.", (done) => {
      chai
        .request(server)
        .put(`api/operation/${idNewOperation}`)
        .auth(token, { type: "bearer" })
        // REVEER ---------------------------------------------------------------<<<<>>>>
        .send({ name: "Test", age: "1" })
        .end((err, res) => {
          if (err) done(err);
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
    it.skip("It should remove a operation", (done) => {
      chai
        .request(server)
        .delete(`api/operation/${idNewOperation}`)
        .auth(token, { type: "bearer" })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(204);
          done();
        });
    });

    it.skip("It should fail remove a operation", (done) => {
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
