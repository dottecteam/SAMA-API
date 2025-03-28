$(document).ready(function () {
    const ModalError = new bootstrap.Modal(document.getElementById("errorModal"))
    const ModalSuccess = new bootstrap.Modal(document.getElementById("successModal"))
    const ModalData = new bootstrap.Modal(document.getElementById("modalDados"))
    const ModalPDF = new bootstrap.Modal(document.getElementById("pdfModal"))
    const ModalLoading = new bootstrap.Modal(document.getElementById("loadingModal"), {
        backdrop: "static",
        keyboard: false,
    })

    $("#btn-view-pdf").click(function () {
        let pdf = $(this).data("pdf");
        let path = '/uploads/atestados/' + pdf;
        $("#pdfModal .modal-body").html(`<iframe src="${path}" width="100%" height="400px"></iframe>`);
        ModalPDF.show();
    });

    $(".table-query-tr").click(function () {
        let data = $(this).data("id");
        $.ajax({
            url: "/atestado/consulta/secretaria/id",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({ id: data }),
            success: function (response) {
                $("#data-nome").html(response.nome);
                $("#data-cpf").html(response.cpf);
                $("#data-email").html(response.email);
                $("#data-dataIn").html(response.dataIn);
                $("#data-dataFin").html(response.dataFin);
                $("#data-cid").html(response.cid);
                $("#data-curso").html(response.curso);
                $("#data-semestre").html(response.semestre+"º");
                $("#data-periodo").html(response.periodo);
                $("#btn-view-pdf").data("pdf", response.pdf);
                
                console.log(response);
                ModalData.show();
            },
            error: function (xhr, status, error) {
                var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
                var errorMessage = response.mensagem;
                $("#error-message").html(errorMessage);
                ModalError.show();
            }
        });
    });
});