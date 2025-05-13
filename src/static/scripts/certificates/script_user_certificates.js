$(document).ready(function () {
    activeEvents();
});

function activeEvents() {
    $(".btn-delete-certificate").click(function () {
        let id = $(this).data('id');
        $("#modal-confirm").modal('show');
        $("#data-id").val(id);
    });

    $("#btn-confirm").click(function () {
        let id = $("#data-id").val();
        let formdata = new FormData();
        formdata.append('id', id)
        $("#modal-confirm").modal('hide');
        $.ajax({
            type: "POST",
            url: "/atestado/deletar",
            data: formdata,
            processData: false,
            contentType: false,
            success: function (response) {

                if (response.status) {
                    updateTable();
                } else {
                    $("#error-message").html(response.message);
                    $("#modal-error").modal('show');
                }

            },
            error: function (xhr, status, error) {


                ModalLoading.hide();
                var response = JSON.parse(xhr.responseText);
                var errorMessage = response.message;
                $("#error-message").html(errorMessage);
                $("#modal-error").modal('show');

            }
        });
    });
}

function deactiveEvents() {
    $(".btn-delete-certificate").off('click');
    $("#btn-confirm").off('click');
}

function updateTable() {
    $.ajax({
        url: "/usuarios/atestados/tabela",
        type: "POST",
        contentType: 'application/json',
        success: function (response) {
            if (response.status) {
                $("#table-certificates-body").html(response.table);
                deactiveEvents();
                activeEvents();
            } else {
                $("#error-message").html(response.message);
                $("#modal-error").modal('show');
            }
        },
        error: function (xhr, status, error) {
            var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
            var errorMessage = response.message;
            $("#error-message").html(errorMessage);
            $("#modal-error").modal('show');
        }
    });
}