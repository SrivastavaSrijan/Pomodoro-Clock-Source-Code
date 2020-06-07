const cors = require("cors");
const bodyParser = require("body-parser");

const testAPIRouter = require("./routes/testAPI");
const signIn = require("./routes/signIn");
const registerTo = require("./routes/regsiterTo");
const updateNotes = require("./routes/updateNotes");
const authUser = require("./routes/authUser");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const updateSess = require("./routes/updateSess");
const app = express();

// view engine setup
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// knex
//   .select("*")
//   .from("users")
//   .then((data) => console.log(data));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/signIn", signIn);
app.use("/registerTo", registerTo);
app.use("/updateNotes", updateNotes);
app.use("/updateSess", updateSess);
app.use("/authUser", authUser);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
