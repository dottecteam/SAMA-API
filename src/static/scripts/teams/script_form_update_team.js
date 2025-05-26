document.getElementById('addDeveloper').addEventListener('click', () => {
    const container = document.getElementById('developersContainer');
    const devHTML = `
        <div class="row mb-2 developer-item">
        <label for="dev_email" class="form-label" style="font-weight: bold;">Desenvolvedor</label>
            <div class="col">
                <input type="email" name="dev_email" class="form-control" placeholder="Email">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-danger remove-dev">Remover</button>
            </div>
        </div>`;
    container.insertAdjacentHTML('beforeend', devHTML);
});


document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('remove-dev')) {
        e.target.closest('.developer-item').remove();
    }
});

function previewLogo(event) {
    const input = event.target;
    const preview = document.getElementById('logoPreview');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById('editTeamForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = document.getElementById('editTeamForm');
    const formData = new FormData();

    // Adiciona dados ao FormData
    formData.append('teamName', form.teamName.value);
    formData.append('EmMaster', form.EmMaster.value);
    formData.append('EmPOwner', form.EmPOwner.value);

    const teamLogo = form.teamLogo.files[0];
    if (teamLogo) {
        formData.append('teamLogo', teamLogo);
    }

    // Vários dev_email
    document.querySelectorAll('[name="dev_email"]').forEach((input, index) => {
        formData.append('dev_email', input.value);
    });

    try {
        const response = await fetch('/equipes/atualizar', {
            method: 'POST',
            body: formData // <-- sem headers!
        });

        const result = await response.json();

        if (result.status) {
            location.reload();
        } else {
            $('#editTeamModal').modal('hide');
            $('#error-message').html(result.message);
            $('#modal-error').modal('show');
        }
    } catch (error) {
        $('#editTeamModal').modal('hide');
        console.error("Erro na requisição:", error);
        $('#modal-error').modal('show');
    }
});

$('#delete-team').click(function () {
    $('#editTeamModal').modal('hide');
    $('#modal-confirm').modal('show');
});

$("#btn-confirm").on("click", function(){
    $.ajax({
        type: 'POST',
        url: '/equipes/perfil/excluir',
        success: function(response) {
        if (response.status) {
            $('#modal-confirm').modal('hide');
            window.location.href = "/";
        } else {
            $('#modal-confirm').modal('hide');
            $("#modal-error").modal('show');
            $('#error-message').html(response.message);
        }},
        error: function (xhr, status, error) {
            $('#modal-confirm').modal('hide');
            $("#modal-error").modal('show');
            var response = JSON.parse(xhr.responseText);
            var errorMessage = response.message;
            $('#error-message').html(errorMessage);
        },

        })
})