document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.container-info');
    const sectionIds = ['personal-info', 'update-info', 'security', 'teams'];

    buttons.forEach((button, index) => {
        button.addEventListener('click', function () {
            // Hide all sections
            sections.forEach(section => section.style.display = 'none');

            // Show the clicked button section
            const targetId = sectionIds[index];
            const target = document.getElementById(targetId);
            if (target) {
                target.style.display = 'block';
            }
        });
    });
});

// Show modal to change information
$('#btn-update-info').on('click', function () {
    $("#modal-update-info").modal('show');
});

let course = $('#course').val();
let semester = $('#semester').val();
$('#select-course-personal-info-form').val(course);
$('#semester-personal-info-form').val(semester);

// Confirms whether there is a change or not to active the 'confirm' button on changing personal data
let originalValues = {};
$('#btn-change-info-card').on('click', function () {
    originalValues = {
        'nome-personal-info-form': $('#nome-personal-info-form').val(),
        'select-course-personal-info-form': $('#select-course-personal-info-form').val(),
        'semester-personal-info-form': $('#semester-personal-info-form').val(),
    };
    $('#btn-change-info').addClass('disabled');

});

$(document).on('input change', '.info-changer', function () {
    const hasChanged = Object.keys(originalValues).some(id => {
        return $(`#${id}`).val() !== originalValues[id];
    });

    if (hasChanged) {
        $('#btn-change-info').removeClass('disabled');
    } else {
        $('#btn-change-info').addClass('disabled');
    }
});

// Change personal data function 
function change_info() {
    var new_name = $('#nome-personal-info-form').val();
    var email = $('#email').val();
    var new_course = $('#select-course-personal-info-form').val();
    var new_semester = $('#semester-personal-info-form').val();
    var password = $('#info-password').val();


    $.ajax({
        url: '/usuarios/alterar_info',
        type: 'POST',
        data: {
            password: password,
            email: email,
            new_name: new_name,
            new_course: new_course,
            new_semester: new_semester
        },
        success: function (response) {
            if (response.status != false) {
                $('#name-nav-header').text(new_name);
                $('#li-name').text(`Nome: ${new_name}`);
                $('#li-course').text(`Curso: ${new_course}`);
                $('#li-semester').text(`Semestre: ${new_semester}°`);
                $('#modal-success .modal-body #success-message').html(response.message);
                $("#modal-confirm-change").modal('hide');
                $("#modal-success").modal('show');
                $('#btn-change-info').addClass('disabled');
            } else {
                $('#modal-error .modal-body #error-message').html(response.message);
                $("#modal-confirm-change").modal('hide');
                $("#modal-error").modal('show');
            }
        }
    });
};

// Change personal data event
$('#change-personal-info-form').submit(function (event) {
    event.preventDefault();
    $('#password-confirmation-form').off('submit');
    $("#modal-confirm-change").modal('show');
    $("#modal-update-info").modal('hide');
    $('#password-confirmation-form').submit(function (event) {
        event.preventDefault();
        $("#modal-confirm-change").modal('hide');
        change_info();
        $('#password-confirmation-form')[0].reset();
    })
});


// Delete account function: confirm the code sent to email
function deleteAccount(email) {
    $("#form-confirmation-delete").on("submit", function (event) {
        event.preventDefault();
        let code = $("#input-code-form").val();

        $("#modal-confirmation-exclude").modal('hide');
        $.ajax({
            url: '/usuarios/deletar_conta',
            type: 'POST',
            data: JSON.stringify({ email: email, code: code }),
            contentType: 'application/json',

            success: function (response) {
                if (response.status) {
                    $('#modal-success .modal-body #success-message').html(response.message);
                    $("#modal-success").modal('show');
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                } else {
                    $('#modal-error .modal-body #error-message').html(response.message);
                    $("#modal-error").modal('show');
                }
            },
            error: function (response) {
                $("#modal-loading").modal('hide');
                setTimeout(function () {
                    $('#modal-error .modal-body #error-message').html(response.message);
                    $("#modal-error").modal('show');
                }, 1000);
            }
        });
    });
};

// Delete account event: sends a code to email
$('#btn-delete-account').on('click', function () {
    var email = $('#email').val();

    $('#password-confirmation-form').off('submit');
    $("#modal-confirm-change").modal('show');
    $('#password-confirmation-form').submit(function (event) {
        event.preventDefault();
        $("#modal-confirm-change").modal('hide');
        $("#modal-loading").modal('show');
        var password = $('#info-password').val();
        $.ajax({
            url: "/usuarios/deletar_conta/validar",
            type: 'POST',
            data: JSON.stringify({ email: email, password: password }),
            contentType: 'application/json',
            success: function (response) {
                $("#modal-loading").modal('hide');
                if (response.status) {
                    $("#modal-confirmation-exclude").modal('show');
                    deleteAccount(email);
                } else {
                    $("#modal-loading").modal('hide');
                    $('#modal-error .modal-body #error-message').html(response.message);
                    $("#modal-error").modal('show');
                }
            },
            error: function (response) {
                setTimeout(function () {
                    $("#modal-loading").modal('hide');
                    $('#modal-error .modal-body #error-message').html(response.message);
                    $("#modal-error").modal('show');
                }, 1000);
            },
        });
    })
    $("#modal-confirmation-exclude").modal('hide');
});

// Change password event
$('#change-password-form').submit(function (event) {
    event.preventDefault();
    var senha_atual = $('#senha_atual').val();
    var nova_senha = $('#nova_senha').val();
    var confirmar_senha = $('#confirmar_senha').val();

    $.ajax({
        url: '/usuarios/alterar_senha',
        type: 'POST',
        data: {
            senha_atual: senha_atual,
            nova_senha: nova_senha,
            confirmar_senha: confirmar_senha
        },
        success: function (response) {
            if (response.success != false) {
                $('#modal-success .modal-body #success-message').html(response.message);
                $("#modal-success").modal('show');
                $('#change-password-form')[0].reset();
            } else {
                $('#modal-error .modal-body #error-message').html(response.message);
                $("#modal-error").modal('show');
            }
        }
    });
});



function showPassword(passwordFieldSelector, passwordIconSelector) {
    const $passwordField = $(passwordFieldSelector);
    const $passwordIcon = $(passwordIconSelector);

    if ($passwordField.attr('type') === 'password') {
        $passwordField.attr('type', 'text');
        $passwordIcon.removeClass('bi-eye-slash').addClass('bi-eye');
    } else {
        $passwordField.attr('type', 'password');
        $passwordIcon.removeClass('bi-eye').addClass('bi-eye-slash');
    };
};