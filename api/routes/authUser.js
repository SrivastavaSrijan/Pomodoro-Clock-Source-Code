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
router.get("/", authenticateToken, (req, res, next) => {
  if (req.user !== undefined) {
    res.json({ hello: req.user });
  } else {
    res.json(req);
  }
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null || token === undefined)
    res
      .status(403)
      .json("Failed Authorization. Please tell me that your JWT is invalid.");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json("Failed Authorization. Please tell me that your JWT is invalid.");
    // req.user = user;
    knex
      .select("*")
      .from("users")
      .where("email", "=", user.email)
      .then((user) => {
        const userUpdated = user[0];
        req.user = userUpdated;
        next();
      });
  });
}
module.exports = router;
