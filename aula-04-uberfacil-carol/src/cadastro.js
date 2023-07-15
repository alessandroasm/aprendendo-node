const moduloLayout = require("./layout");

function postCadastro(req, res) {
  console.log(req.body);
  const desempenho = req.body.desempenho;
  const preco = req.body.preco;
  const valor = req.body.valor;
  const quilometragem = req.body.quilometragem;

  const litroGastos = quilometragem / desempenho;
  const totalGasto = litroGastos * preco;

  const lucro = valor - totalGasto;
  res.send(moduloLayout.montaHtml(lucro));
}

module.exports = {
  postCadastro,
};
