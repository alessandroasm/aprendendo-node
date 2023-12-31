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

  res.render("formulario", { lista: "Lista de pacientes:", pacientes });
});

app.listen(5000);
