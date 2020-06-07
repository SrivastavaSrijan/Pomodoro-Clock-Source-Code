let express = require("express");
let router = express.Router();
const body = require("body-parser");
const bcrypt = require("bcryptjs");
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
  let { name, email, password } = req.body;
  // const hash = bcrypt.hashSync(password);
  // req.body.password = hash;
  // knex("users")
  //   .insert({ name: name, email: email, joined: new Date(), notes: [] })
  //   .then(console.log);
  // res.json(`${name}, you have registered successfully. Please log in.`);
  const hash = bcrypt.hashSync(password);
  let date = new Date();
  knex
    .transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email", "hash")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0],
              name: name,
              joined: `${date.getDay() + 1}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`,
              tasks: [],
              nosess: 0,
              pic: `https://api.adorable.io/avatars/285/${loginEmail[0]}`,
            })
            .then((user) => {
              res.json("You're all set! You can log in now.");
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch((err) => {
      res.status(400).json("Email already registered. Want to log in instead?");
      console.log(err);
    });
});
module.exports = router;
