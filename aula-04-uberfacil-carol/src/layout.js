function montaHtml(lucro) {
  let mensagem = "";
  if (lucro != null) {
    if (lucro < 0) {
      const lucroFinal = (-lucro).toFixed(2);
      mensagem = `<div class="mensagem">Seu prejuízo foi de ${lucroFinal}</div>`;
    } else {
      const lucroFinal = lucro.toFixed(2);
      mensagem = `<div class="mensagem">Seu lucro foi de ${lucroFinal}</div>`;
    }
  }

  return `
    <html>
        <head>
          <style type="text/css">
.mensagem {
    border: 1px solid #000;
    margin: 10px;
    padding: 5px;
}
          </style>
        </head>
        <body style="
        border: 1px solid blue;
        height: 310px;
        width: 300px;">
    
        <p style="
        background-color: blue;
        color: white;
        font-family: system-ui; padding-left: 10px;
        "><b> Uber Fácil $</b></p>
            <p style="
            text-align: center; 
            font-family: system-ui; margin-bottom: 2px;
            "> A forma mais rápida de 
            <br> calcular seus lucros </p><br/>
    
            <form action="/cadastro" method="post">
                <label style="
                font-family: system-ui; margin-left: 10px; font-size: small;
                "> Desempenho (km/l):
                    <br>
                    <input style="background-color: #DCDCDC; font-family: system-ui; border: 1px solid gray; width: 93%; type=; padding-left: 2px; margin-left: 10px; margin-right: 10px; type= "number" id="num1" name="desempenho" />
                </label>
                <br>
                <label style="
                font-family: system-ui; margin-left: 10px; font-size: small;
                "> Preço por Litro (Combustível):
                    <br>
                    <input style="background-color: #DCDCDC; font-family: system-ui; border: 1px solid gray; width: 93%; type=; padding-left: 2px; margin-left: 10px; margin-right: 10px; type= "number" id="num2" name="preco" />
                </label>
                <br>
                <label style="
                font-family: system-ui; margin-left: 10px; font-size: small;
                "> Valor da Corrida (R$):
                    <br>
                    <input style="background-color: #DCDCDC; font-family: system-ui; border: 1px solid gray; width: 93%; type=; padding-left: 2px; margin-left: 10px; margin-right: 10px; type= "number" id="num3" name="valor" />
                <br>
                <label style="
                font-family: system-ui; margin-left: 10px; font-size: small;
                "> Quilometragem:
                    <br>
                    <input style="background-color: #DCDCDC; font-family: system-ui; border: 1px solid gray; width: 93%; type=; padding-left: 2px; margin-left: 10px; margin-right: 10px; type= "number" id="num4" name="quilometragem" />
                </label>
                <br><br />
                <button style="background-color: blue; color: white; font-family: system-ui; border: 1px solid blue; margin-left: 10px; border-radius: 4px; type="submit">Calcular</button>
        
            </form>

            ${mensagem}
        </body>
    </html>`;
}

function getLayout(req, res) {
  res.send(montaHtml(null));
}

module.exports = {
  getLayout,
  montaHtml,
};
