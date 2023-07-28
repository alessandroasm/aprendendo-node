const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const luxon = require("luxon");
const fs = require("fs");

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

app.post("/cadastro", (req, res) => {
  const { nome, idade, peso, sintoma } = req.body;
  const data = luxon.DateTime.now();

  const paciente = `${nome};${idade};${peso};${sintoma};${data}\n`;
  fs.appendFileSync("./pacientes.txt", paciente);

  res.render("cadastro");
});

app.get("/formulario", (req, res) => {
  const lista = fs.readFileSync("./pacientes.txt", "utf8");
  const linhas = lista.split("\n");
  linhas.reverse();
  //const lista2 = linhas.join("\n");

  const pacientes = linhas.map((item) => {
    const [nome, idade, peso, sintoma, data] = item.split(";");
    return {
      nome,
      idade,
      peso,
      sintoma,
      data,
    };
  });

  res.render("formulario", { lista: "Lista de pacientes:", pacientes });
});

app.get("/cdmedicamentos", (req, res) => {
  res.render("cdmedicamentos");
});

app.post("/cdmedicamentos", (req, res) => {
  const { nome, tipo, medida, unidade, laboratorio, email } = req.body;

  const medicamentos = `${nome};${tipo};${medida};${unidade};${laboratorio};${email}\n`;
  fs.appendFileSync("./medicamentos.txt", medicamentos);

  res.render("cdmedicamentos");
});

app.get("/formedicamentos", (req, res) => {
  const lista = fs.readFileSync("./medicamentos.txt", "utf8");
  const linhas = lista.split("\n");
  linhas.reverse();
  //const lista2 = linhas.join("\n");

  const medicamentos = linhas.map((item) => {
    const [nome, tipo, medida, unidade, laboratorio, email] = item.split(";");
    return {
      nome,
      tipo,
      medida,
      unidade,
      laboratorio,
      email,
    };
  });

  res.render("formedicamentos", { lista: "Lista de medicamentos:", medicamentos });
});

app.listen(5000);

