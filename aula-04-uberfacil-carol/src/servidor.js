const express = require("express");
const bodyParser = require("body-parser");

const moduloLayout = require("./layout");
const moduloCadastro = require("./cadastro");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/layout", moduloLayout.getLayout);
app.post("/cadastro", moduloCadastro.postCadastro);

app.listen(5000);
