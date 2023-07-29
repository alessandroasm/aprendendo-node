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

app.get("/pacientes", (req, res) => {
  const lista = fs.readFileSync("./pacientes.txt", "utf8");
  const linhas = lista.split("\n");
  linhas.reverse();
  //const lista2 = linhas.join("\n");

  const pacientes = linhas.map((item) => {
    const [nome, idade, peso, sintoma, data] = item.split(";");

    // Converter data de string para luxon
    const dataLuxon = luxon.DateTime.fromISO(data);

    // Formatar o luxon em DD/MM/YYYY
    const dataFormatada = dataLuxon.toFormat("dd/MM/yyyy");

    const paciente = {
      nome,
      idade,
      peso,
      sintoma: sintoma,
      data: dataFormatada,
    };

    return paciente;
  });

  res.render("pacientes", { lista: "", pacientes });
});

app.get("/cadastromed", (req, res) => {
  res.render("cadastromed");
});

app.post("/cadastromed", (req, res) => {
  const { nomedomedicamento, tipo, medida, unidade, laboratorio, email } =
    req.body;

  const medicamento = `${nomedomedicamento};${tipo};${medida};${unidade};${laboratorio};${email}\n`;
  fs.appendFileSync("./medicamentos.txt", medicamento);

  res.render("cadastromed");
});

app.get("/medicamentos", (req, res) => {
  const lista3 = fs.readFileSync("./medicamentos.txt", "utf8");
  const linhas = lista3.split("\n").filter((linha) => linha != "");
  linhas.reverse();

  //const lista4 = linhas.join("\n");

  const medicamentos = linhas.map((item) => {
    const [nomedomedicamento, tipo, medida, unidade, laboratorio, email] =
      item.split(";");
    const medicamento = {
      nomedomedicamento,
      tipo,
      medida,
      unidade,
      laboratorio,
      email,
    };

    return medicamento;
  });

  res.render("medicamentos", { lista3: "", medicamentos });
});

app.listen(5000);
