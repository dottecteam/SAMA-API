//Modais
const ModalError = new bootstrap.Modal($("#modal-error"));
const ModalSuccess = new bootstrap.Modal($("#modal-success"));
const ModalData = new bootstrap.Modal($("#modal-data"));
const ModalPDF = new bootstrap.Modal($("#modal-pdf"));
const ModalConfirm = new bootstrap.Modal($("#modal-confirm"));
const ModalLoading = new bootstrap.Modal($("#modal-loading"), {
    backdrop: "static",
    keyboard: false,
});

$(document).ready(function () {
    activeEvents();
});

function activeEvents() {
    // Carregar o pdf do atestado
    $("#btn-view-pdf").click(function () {
        let pdf = $(this).data("pdf");
        let path = '/uploads/atestados/' + pdf;
        $("#modal-pdf .modal-body").html(`<iframe src="${path}" width="100%" height="400px"></iframe>`);
        ModalPDF.show();
    });

    // Evento delegado para a tabela
    $("#table-query-body").on('click', '.table-query-tr', function () {
        let data = $(this).data("id");
        let status = $(this).data("status");

        $.ajax({
            url: "/atestado/consulta/id",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({ id: data }),
            success: function (response) {
                $("#data-name").html(response.name);
                $("#data-email").html(response.email);
                $("#data-dateIn").html(response.dateIn);
                $("#data-dateFin").html(response.dateFin);
                $("#data-cid").html(response.cid);
                $("#data-course").html(response.course);
                $("#data-semester").html(response.semester + "º");
                $("#data-period").html(response.period);
                $("#btn-view-pdf").data("pdf", response.pdf);
                $("#data-id").val(response.id);

                // Active buttons
                $("#btns-status").show();
                $("#btn-aprove").show();
                $("#btn-reject").show();
                if (status === "Aprovado") {
                    $("#btn-aprove").hide();
                };
                if (status === "Rejeitado") {
                    $("#btn-reject").hide();
                };

                ModalData.show();
            },
            error: function (xhr, status, error) {
                var response = JSON.parse(xhr.responseText);
                var errorMessage = response.message;
                console.error('Error loading data:', errorMessage);
                $("#error-message").html(errorMessage);
                ModalError.show();
            }
        });
    });

    // Aprovar
    $("#btn-aprove").click(function () {
        $('#data-status').val('Aprovado');
        ModalConfirm.show();
    });

    // Rejeitar
    $("#btn-reject").click(function () {
        $('#data-status').val('Rejeitado');
        ModalConfirm.show();
    });

    // Confirmar aprovação ou rejeição
    $("#btn-confirm").click(function () {
        let status = $('#data-status').val();
        let id = $('#data-id').val();

        $.ajax({
            url: "/atestado/consulta/status",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ status: status, id: id }),
            success: function (data) {
                updateTable();
                $("#btns-status").fadeOut();
            },
            error: function (xhr, status, error) {
                console.error('Error updating status:', error);
            }
        });
    });
}

function deactiveEvents() {
    // Remover eventos antigos
    $("#table-query-body").off('click', '.table-query-tr');
    $("#btn-confirm").off('click');
    $("#btn-view-pdf").off('click');
    $("#btn-reject").off('click');
    $("#btn-aprove").off('click');
}

function updateTable() {
    $.ajax({
        url: "/atestado/consulta/tabela",
        type: "POST",
        contentType: 'application/json',
        success: function (response) {
            if (response.status) {
                $("#table-query-body").html(response.table);
                ModalData.hide();

                // Desativa eventos antigos e ativa novamente
                deactiveEvents();
                activeEvents();
            } else {
                $("#error-message").html(response.message);
                ModalError.show();
            }
        },
        error: function (xhr, status, error) {
            var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
            var errorMessage = response.message;
            $("#error-message").html(errorMessage);
            ModalError.show();
        }
    });
}
