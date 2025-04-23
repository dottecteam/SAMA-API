$(document).ready(function () {
    //Modais
    const ModalError = new bootstrap.Modal($("#modal-error"))
    const ModalSuccess = new bootstrap.Modal($("#modal-success"))
    const ModalData = new bootstrap.Modal($("#modal-data"))
    const ModalPDF = new bootstrap.Modal($("#modal-pdf"))
    const ModalConfirm = new bootstrap.Modal($("#modal-confirm"))
    const ModalLoading = new bootstrap.Modal($("#modal-loading"), {
        backdrop: "static",
        keyboard: false,
    })

    //Carregar o pdf do atestado
    $("#btn-view-pdf").click(function () {
        let pdf = $(this).data("pdf");
        let path = '/uploads/atestados/' + pdf;
        $("#modal-pdf .modal-body").html(`<iframe src="${path}" width="100%" height="400px"></iframe>`);
        ModalPDF.show();
    });

    //Atualizar o status
    function updateStatus(status, id) {
        $.ajax({
            url: "/atestado/consulta/status",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ status: status, id: id }),
            success: function (data) {
                $("#alert-success").fadeIn();
                updateTable();
                setTimeout(function () {
                    $("#alert-success").fadeOut();
                }, 3000);
                $("#btns-status").fadeOut();
            }
        })
    };

    //Ativar os botões
    function activeButtons(id, status) {
        $("#btns-status").show();
        $("#btn-aprove").show();
        $("#btn-reject").show();
        if (status === "Aprovado") {
            $("#btn-aprove").hide();
        };
        if (status === "Rejeitado") {
            $("#btn-reject").hide();
        };
        $("#btn-aprove").click(function () {
            ModalConfirm.show();
            $("#btn-confirm").click(function () {
                updateStatus('Aprovado', id);
            });
        });
        $("#btn-reject").click(function () {
            ModalConfirm.show();
            $("#btn-confirm").click(function () {
                updateStatus('Rejeitado', id);
            });
        });
    }


    // Delegação de eventos para cliques nas linhas da tabela
    $("#table-query-body").on('click', '.table-query-tr', function () {
        let data = $(this).data("id");
        let status = $(this).data("status");
        activeButtons(data, status);
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
                ModalData.show();
            },
            error: function (xhr, status, error) {
                var response = JSON.parse(xhr.responseText);
                var errorMessage = response.message;
                $("#error-message").html(errorMessage);
                ModalError.show();
            }
        });
    });


});


// function activeEvents() {
//     // Delegação de eventos para cliques nas linhas da tabela
//     $("#table-query-body").on('click', '.table-query-tr', function () {
//         let data = $(this).data("id");
//         let status = $(this).data("status");
//         activeButtons(data, status);
//         $.ajax({
//             url: "/atestado/consulta/id",
//             type: "POST",
//             contentType: 'application/json',
//             data: JSON.stringify({ id: data }),
//             success: function (response) {
//                 $("#data-name").html(response.name);
//                 $("#data-email").html(response.email);
//                 $("#data-dateIn").html(response.dateIn);
//                 $("#data-dateFin").html(response.dateFin);
//                 $("#data-cid").html(response.cid);
//                 $("#data-course").html(response.course);
//                 $("#data-semester").html(response.semester + "º");
//                 $("#data-period").html(response.period);
//                 $("#btn-view-pdf").data("pdf", response.pdf);
//                 ModalData.show();
//             },
//             error: function (xhr, status, error) {
//                 var response = JSON.parse(xhr.responseText);
//                 var errorMessage = response.message;
//                 $("#error-message").html(errorMessage);
//                 ModalError.show();
//             }
//         });
//     });
// }
// function deactiveEvents() {
//     $(".table-query-tr").off('click');
// }

function updateTable() {
    $.ajax({
        url: "/atestado/consulta/tabela",
        type: "POST",
        contentType: 'application/json',
        success: function (response) {
            if (response.status) {
                $("#table-query-body").html(response.table);
                // deactiveEvents();
                // activeEvents();
            }
            else {
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