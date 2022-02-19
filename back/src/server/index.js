const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("../config");

class Server {
  constructor() {
    this.app = express();
    this.path = config.api.prefix;
    this.port = config.port;

    this._middleware();
    this._routes();
    this._notFound();
    this._handlerError();
  }

  _middleware() {
    this.app.use(cors({ origin: "*" }));
    this.app.use(morgan("tiny"));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  _routes() {
    this.app.use(`${this.path}operation`, require("../routes/operations"));
    this.app.use(`${this.path}auth/`, require("../routes/user"));
  }

  _notFound() {
    this.app.use((req, res, next) => {
      const error = new Error("Not Found");
      error.code = 404;
      next(error);
    });
  }

  _handlerError() {
    this.app.use((err, req, res, next) => {
      const code = err.code || 500;
      console.log("- ERROR: " + err.message);
      const body = {
        error: {
          code,
          message: err.message,
          detail: err.data,
        },
      };
      res.status(code).json(body);
    });
  }

  start() {
    this.app.listen(this.port, (err) => {
      if (err) {
        process.exit(1);
      }
      console.log("\nServer Started...");
      console.log(`       Port: http://localhost:${this.port}/`);
    });
  }
}

module.exports = Server;
