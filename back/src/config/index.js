const dotenv = require("dotenv");

dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  port: process.env.PORT,
  api: {
    prefix: "/api/",
  },
  auth: {
    secret: process.env.SECRET,
    ttl: process.env.TTL,
  },
};
