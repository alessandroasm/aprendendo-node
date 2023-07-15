const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.listen(5000);
