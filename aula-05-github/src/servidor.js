const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const luxon = require("luxon");
const fs = require("fs");
const pg = require("pg");

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

async function conectarBanco() {
  const client = new pg.Client({
    host: "192.168.30.2",
    database: "aula-node",
    user: "cedoc",
    password: "cedocpass",
  });
  await client.connect();

  return client;
}

app.post("/cadastromed", async (req, res) => {
  const { nomedomedicamento, tipo, medida, unidade, laboratorio, email } =
    req.body;

  const client = await conectarBanco();
  await client.query(
    `
  insert into medicamentos (nome, unidade, medida, tipo, laboratorio, email)
  values ($1, $2, $3, $4, $5, $6)
  `,
    [nomedomedicamento, unidade, medida, tipo, laboratorio, email]
  );

  res.render("cadastromed");
});

app.get("/medicamentos", async (req, res) => {
  const client = await conectarBanco();
  const resultado = await client.query(`
  select *
  from medicamentos
  order by nome`);

  const medicamentos = resultado.rows;
  res.render("medicamentos", { lista3: "", medicamentos });
});

app.listen(5000);
