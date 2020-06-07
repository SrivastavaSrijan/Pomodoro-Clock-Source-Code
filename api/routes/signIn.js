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

router.post("/", (req, res, next) => {
  console.log(req);
  var emailReq = req.body.email;
  var passwordReq = req.body.password;
  knex
    .select("email", "hash")
    .from("login")
    .where("email", "=", emailReq)
    .then((data) => {
      let storedPass = data[0].hash;
      console.log(passwordReq);
      console.log(data);

      if (bcrypt.compareSync(passwordReq, storedPass)) {
        knex
          .select("*")
          .from("users")
          .where("email", "=", emailReq)
          .then((user) => {
            const accessToken = jwt.sign(
              user[0],
              process.env.ACCESS_TOKEN_SECRET
            );
            res.status(200).json({ accessToken: accessToken });
          });
      } else {
        res.status(400).json(`Failed Authentication. Please try again.`);
      }
    })
    .catch(function (error) {
      res.status(400).json(`If you're new, please register first!`);
      console.log(error);
    });
});
module.exports = router;
