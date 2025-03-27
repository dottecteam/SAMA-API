function abrirModal (nomeDoAluno, dataDeEnvioDoAtestado, periodoDeAfastamento) {
    document.getElementById("conteudoDoModal").innerHTML =
        `<strong>Nome do aluno:</strong> ${nomeDoAluno}
         <strong>Data de envio do atestado:</strong> ${dataDeEnvioDoAtestado}
         <strong>Período de afastamento:</strong> ${periodoDeAfastamento}`;
    const popUp = document.getElementById("popUp");
    const fundo = document.querySelector(".fundoDoModal");
    popUp.style.visibility = "visible";
    popUp.classList.add("active");
    popUp.classList.remove("remove");
    fundo.style.display = "block";
}

function fecharModal() {
    const popUp = document.getElementById("popUp");
    const fundo = document.querySelector(".fundoDoModal");
    popUp.classList.remove("active");
    popUp.classList.add("remove");
    fundo.style.display = "none";
}