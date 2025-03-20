$(document).ready(function() {
    // Formulário de acesso
    $('#form-login-secretaria').submit(function(event) {
        event.preventDefault();
        let formData = new FormData(this);
        $.ajax({
            type: "POST",
            url: "/atestados/acesso/logar",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.status) {
                    window.location.href = "/painel/atestados";
                } else {
                    var myModal = new bootstrap.Modal($('#errorModal'));
                    myModal.show();
                }
            },
            error: function(xhr, status, error) {
                var myModal = new bootstrap.Modal($('#errorModal'));
                myModal.show();
            },
        });
    });
});

function mostrarSenha(){
    var inputPass = document.getElementById("senha")
    var BtnMostrarSenha = document.getElementById("ver_senha")

    if(inputPass.type === "password"){
        inputPass.setAttribute('type', 'text')
        BtnMostrarSenha.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
    }
    else{
        inputPass.setAttribute('type', 'password')
        BtnMostrarSenha.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
    }
}