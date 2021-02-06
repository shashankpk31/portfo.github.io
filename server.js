const express = require("express");
const path = require("path");
const { title } = require("process");
const app = express();
const bodyParser = require("body-parser");
// var session = require("express-session");
// const flash = require("connect-flash");
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/portfolio");
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});

// app.use(
//     session({
//       secret: "keyboard cat",
//       resave: true,
//       saveUninitialized: true,
//     })
//   );

// app.use(require("connect-flash")());
// app.use(function (req, res, next) {
//   res.locals.messages = require("express-messages")(req, res);
//   next();
// });

app.set("views", path.join(__dirname, "views")); // specify the views directory
app.set("view engine", "pug"); // register the template engine

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

app.post("/", (req, res) => {
  var Name = req.body.Name;
  var Email = req.body.Email;
  var Subject = req.body.Subject;

  var data = {
    Name: Name,
    Email: Email,
    Subject: Subject,
  };
  db.collection("details").insertOne(data, function (err, collection) {
    if (err) throw err;
  
      console.log("Record inserted Successfully");
    //   req.flash("success", "Article Added");
   
    
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
