const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const luxon = require("luxon");
const fs = require("fs");
const { readFile } = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.post("/cadastro", (req, res) => {
  const { nome, idade, peso, sintoma } = req.body;
  const data = luxon.DateTime.now();

  const paciente = `${nome};${idade};${peso};${sintoma};${data}\n`;
  fs.appendFileSync("./pacientes.txt", paciente);

  res.render("cadastro");
});

app.get("/pacientes", (req, res) => {
  console.log("1");
  const caminhoArquivo = "./pacientes.txt";

  console.log("2");
  readFile(caminhoArquivo, (err, data) /* callback */ => {
    console.log("4");
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.set({ "Content-Type": "text/plain" }).send(data);
  });

  console.log("3");
}); /* Final do GET /arquivos */

app.listen(5000);
