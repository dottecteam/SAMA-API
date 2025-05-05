// Modals
const ModalError = new bootstrap.Modal($("#modal-error"));
const ModalSuccess = new bootstrap.Modal($("#modal-success"));
const modalConfirmPassword = new bootstrap.Modal($("#modal-confirm-change"));
const ModalUpdateInfo = new bootstrap.Modal($("#modal-update-info"));
const ModalLoading = new bootstrap.Modal(
    $("#modal-loading"),
    {
      backdrop: "static",
      keyboard: false,
    }
);
const ModalConfirmacao = new bootstrap.Modal($("#modal-confirmation-exclude"), {
    backdrop: "static",
    keyboard: false,
});

// Change tab, Nav buttons
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.container-info');
    const sectionIds = ['personal-info', 'update-info', 'security'];

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
$('#btn-update-info').on('click', function(){
    ModalUpdateInfo.show();
});

let course = $('#course').val();
let semester = $('#semester').val();
$('#select-course-personal-info-form').val(course);
$('#semester-personal-info-form').val(semester);

// Confirms whether there is a change or not to active the 'confirm' button on changing personal data
let originalValues = {};
$('#btn-change-info-card').on('click', function() {
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
        success: function(response) {
            if (response.status != false) {
                $('#name-nav-header').text(new_name);
                $('#li-name').text(`Nome: ${new_name}`);
                $('#li-course').text(`Curso: ${new_course}`);
                $('#li-semester').text(`Semestre: ${new_semester}°`);
                $('#modal-success .modal-body #success-message').html(response.message);
                modalConfirmPassword.hide();
                ModalSuccess.show();
                $('#btn-change-info').addClass('disabled');
            } else {
                $('#modal-error .modal-body #error-message').html(response.message);
                modalConfirmPassword.hide();
                ModalError.show();
            }
        }
    });
};

// Change personal data event
$('#change-personal-info-form').submit(function(event) {
    event.preventDefault();
    $('#password-confirmation-form').off('submit');
    modalConfirmPassword.show();
    ModalUpdateInfo.hide();
    $('#password-confirmation-form').submit(function(event) {
        event.preventDefault();
        modalConfirmPassword.hide();
        change_info();
        $('#password-confirmation-form')[0].reset();
    })
});


// Delete account function: confirm the code sent to email
function deleteAccount(email){
    $("#form-confirmation-delete").on("submit", function (event) {
        event.preventDefault();
        let code = $("#input-code-form").val();
        
        ModalConfirmacao.hide();
        $.ajax({
            url: '/usuarios/deletar_conta',
            type: 'POST',
            data: JSON.stringify({email: email, code: code}),
            contentType: 'application/json',

            success: function(response) {
                if (response.status) {
                        $('#modal-success .modal-body #success-message').html(response.message);
                        ModalSuccess.show();
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                } else {
                    $('#modal-error .modal-body #error-message').html(response.message);
                    ModalError.show();
                }
            },
            error: function (response) {
                ModalLoading.hide();
                setTimeout(function () {
                $('#modal-error .modal-body #error-message').html(response.message);
                ModalError.show();
                }, 1000);
            }
        });
    });
};

// Delete account event: sends a code to email
$('#btn-delete-account').on('click', function(){
    var email = $('#email').val(); 

    $('#password-confirmation-form').off('submit');
    modalConfirmPassword.show();
    $('#password-confirmation-form').submit(function(event) {
        event.preventDefault();
        modalConfirmPassword.hide();
        ModalLoading.show();
        var password = $('#info-password').val();
        $.ajax({
            url: "/usuarios/deletar_conta/validar",
            type: 'POST',
            data: JSON.stringify({email: email, password: password}),
            contentType: 'application/json', 
            success: function (response) {
                ModalLoading.hide();
                if (response.status) {
                ModalConfirmacao.show();
                deleteAccount(email);
                } else {
                    ModalLoading.hide();
                    $('#modal-error .modal-body #error-message').html(response.message);
                    ModalError.show();
                }
            },
            error: function (response) {
                setTimeout(function () {
                    ModalLoading.hide();
                    $('#modal-error .modal-body #error-message').html(response.message);
                    ModalError.show();
                }, 1000);
            },
        });
    })
    ModalConfirmacao.hide();
});

// Change password event
$('#change-password-form').submit(function(event) {
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
        success: function(response) {
            if (response.success != false) {
                $('#modal-success .modal-body #success-message').html(response.message);
                ModalSuccess.show();
                $('#change-password-form')[0].reset();
            } else {
                $('#modal-error .modal-body #error-message').html(response.message);
                ModalError.show();
            }
        }
    });
});