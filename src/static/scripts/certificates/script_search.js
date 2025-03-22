$(document).ready(function() {
    $(".btn-view-pdf").click(function() {
        let pdf = $(this).data("pdf");
        let path = '/uploads/atestados/' + pdf;
        let modal = new bootstrap.Modal($("#pdfModal"));
        $("#pdfModal .modal-body").html(`<iframe src="${path}" width="100%" height="500px"></iframe>`);
        modal.show();
    });
});