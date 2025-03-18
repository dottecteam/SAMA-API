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
                    window.location.href = "/";
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