let express = require("express");
let router = express.Router();
const body = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const knex = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
router.put("/", (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const id = authHeader && authHeader.split(" ")[1];
  knex("users")
    .where("id", "=", id)
    .increment("nosess", 1)
    .returning("nosess")
    .then((nosess) => {
      res.json(nosess[0]);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Unable to update session");
    });
});
module.exports = router;
