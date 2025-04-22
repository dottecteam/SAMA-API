$(document).ready(function () {
    const ModalError = new bootstrap.Modal($("#modal-error"))
    const ModalSuccess = new bootstrap.Modal($("#modal-success"))
    const ModalConfirm = new bootstrap.Modal($("#modal-confirm"))
    const ModalLoading = new bootstrap.Modal($("#modal-loading"), {
        backdrop: "static",
        keyboard: false,
    })

    $(".btn-delete-certificate").click(function () {
        var id = $(this).data('id');
        ModalConfirm.show()
        $("#btn-confirm").attr('data-id', id);
    });

    $("#btn-confirm").click(function () {
        var id = $(this).data('id');
        let formdata= new FormData();
        formdata.append('id',id)
        ModalLoading.show();
        $.ajax({
            type: "POST",
            url: "/atestado/deletar",
            data: formdata,
            processData: false,
            contentType: false,
            success: function (response) {
                setTimeout(function () {
                    ModalLoading.hide();
                    if (response.status) {
                        ModalSuccess.show();
                      } else {
                        $("#error-message").html(response.message);
                        ModalError.show();
                      }
                }, 500);
            },
            error: function (xhr, status, error) {
                
                setTimeout(function () {
                    ModalLoading.hide();
                    var response = JSON.parse(xhr.responseText);
                    var errorMessage = response.message;
                    $("#error-message").html(errorMessage);
                    ModalError.show();
                }, 500);
            }
        });
    });
});