function abrirModal (nomeDoAluno, dataDeEnvioDoAtestado, periodoDeAfastamento) {
    document.getElementById("conteudoDoModal").innerHTML =
        `<strong>Nome do aluno:</strong> ${nomeDoAluno}
         <strong>Data de envio do atestado:</strong> ${dataDeEnvioDoAtestado}
         <strong>Período de afastamento:</strong> ${periodoDeAfastamento}`;
    document.getElementById("popUp").style.visibility = "visible";
    document.querySelector(".fundoDoModal").style.display = "block";
}

function fecharModal() {
    document.getElementById("popUp").style.visibility = "hidden";
    document.querySelector(".fundoDoModal").style.display = "none";
}