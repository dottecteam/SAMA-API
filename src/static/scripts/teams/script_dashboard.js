$(document).ready(function () {
    const ctx = document.getElementById('line-chart').getContext('2d');
    var indexAvarage = 0;
    var datasets = [];

    datasets.push({
        label: 'Atual',
        data: avarage[indexAvarage],
        borderColor: '#0d6efd',
        backgroundColor: 'rgba(13, 110, 253, 0.1)',
        borderWidth: 2,
    });

    if (avarage.length > 1 && avarage[indexAvarage + 1].length) {
        datasets.push({
            label: 'Anterior',
            data: avarage[indexAvarage + 1],
            borderColor: '#adb5bd',
            borderDash: [6, 4],
            backgroundColor: 'rgba(173, 181, 189, 0.1)',
            borderWidth: 2,
        });
    }

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Proatividade', 'Autonomia', 'Colaboração', 'Entrega'],
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0,
                    max: 3,
                    ticks: {
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: 'Nota'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Rendimento por Critério'
                }
            }
        }
    });

    let email = $('.team-developer.active').data('email');

    const radarCtx = document.getElementById('radar-chart').getContext('2d');
    const chartRadar = new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ['Proatividade', 'Autonomia', 'Colaboração', 'Entrega'],
            datasets: [{
                label: 'Atual',
                data: [
                    parseFloat(data[indexAvarage]['evaluations'][email]['proatividade']),
                    parseFloat(data[indexAvarage]['evaluations'][email]['autonomia']),
                    parseFloat(data[indexAvarage]['evaluations'][email]['colaboracao']),
                    parseFloat(data[indexAvarage]['evaluations'][email]['entrega'])
                ],
                backgroundColor: 'rgba(13, 110, 253, 0.2)',
                borderColor: '#0d6efd',
                pointBackgroundColor: '#0d6efd'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0,
                    max: 3,
                    ticks: {
                        stepSize: 1,
                        backdropColor: 'transparent'
                    },
                    pointLabels: {
                        font: { size: 14 }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Rendimento individual'
                },
                legend: {
                    display: false
                }
            }
        }
    });

    $('#select-evaluation').change(function () {
        indexAvarage = parseInt($(this).val());
        let datasets = [];
        datasets.push({
            label: 'Atual',
            data: avarage[indexAvarage],
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13, 110, 253, 0.1)',
            borderWidth: 2,
        });
        if (avarage.length > 1 && avarage[indexAvarage + 1]) {
            datasets.push({
                label: 'Anterior',
                data: avarage[indexAvarage + 1],
                borderColor: '#adb5bd',
                borderDash: [6, 4],
                backgroundColor: 'rgba(173, 181, 189, 0.1)',
                borderWidth: 2,
            });
        }
        chart.data.datasets = datasets;
        chart.update();

        let email = $('.team-developer.active').data('email');
        if (!data[indexAvarage]['evaluations'][email]) {
            $('#error-message').html('Nenhuma avaliação encontrada para este desenvolvedor.');
            $('#modal-error').modal('show');
            chartRadar.data.datasets[0].data = [0, 0, 0, 0];
            chartRadar.update();
            return;
        }
        chartRadar.data.datasets[0].data = [
            parseFloat(data[indexAvarage]['evaluations'][email]['proatividade']),
            parseFloat(data[indexAvarage]['evaluations'][email]['autonomia']),
            parseFloat(data[indexAvarage]['evaluations'][email]['colaboracao']),
            parseFloat(data[indexAvarage]['evaluations'][email]['entrega'])
        ];
        chartRadar.update();

        $('#proactivity').html(avarage[indexAvarage][0]);
        $('#autonomy').html(avarage[indexAvarage][1]);
        $('#collaboration').html(avarage[indexAvarage][2]);
        $('#delivery').html(avarage[indexAvarage][3]);

        let lastAvarage = (avarage[indexAvarage].reduce((a, b) => a + b, 0) / avarage[indexAvarage].length);
        let oldAvarage = (avarage[indexAvarage + 1] ? (avarage[indexAvarage + 1].reduce((a, b) => a + b, 0) / avarage[indexAvarage + 1].length) : 0);
        let performanceDashboard = ((lastAvarage - oldAvarage) / oldAvarage * 100).toFixed(1);

        if (oldAvarage === 0) {
            performanceDashboard = '-';
        }

        $('#avarage').html(
            lastAvarage.toFixed(1)
        );

        if (performanceDashboard > 0) {
            $('#performance').html(
                `<i class="bi bi-caret-up-fill"></i>${performanceDashboard}%`
            );
        }
        else if (performanceDashboard < 0) {
            $('#performance').html(
                `<i class="bi bi-caret-down-fill"></i>${Math.abs(performanceDashboard)}%`
            );
        }
        else {
            $('#performance').html(
                `${performanceDashboard}`
            );
        }
        $('#team-evaluation').val(data[indexAvarage]['time']);
    });

    $('.team-developer').click(function () {
        $('.team-developer.active').removeClass('active')
        $(this).addClass('active');

        let selectedEmail = $(this).data('email');


        if (!data[indexAvarage]['evaluations'][selectedEmail]) {
            $('#error-message').html('Nenhuma avaliação encontrada para este desenvolvedor.');
            $('#modal-error').modal('show');
            chartRadar.data.datasets[0].data = [0, 0, 0, 0]
            chartRadar.update();
            return;
        }

        chartRadar.data.datasets[0].data = [
            parseFloat(data[indexAvarage]['evaluations'][selectedEmail]['proatividade']),
            parseFloat(data[indexAvarage]['evaluations'][selectedEmail]['autonomia']),
            parseFloat(data[indexAvarage]['evaluations'][selectedEmail]['colaboracao']),
            parseFloat(data[indexAvarage]['evaluations'][selectedEmail]['entrega'])
        ];

        chartRadar.update()
    });

    $('#export-chart').click(function () {
        $('#modal-loading').modal('show');
        const mainElement = document.querySelector('main');

        // Aplica classe que força o estilo mobile
        mainElement.classList.add('mobile-export', 'mobile-export-force');

        html2canvas(mainElement).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pageWidth = pdf.internal.pageSize.getWidth();
            const imgWidth = pageWidth;
            const imgHeight = canvas.height * imgWidth / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('dashboard.pdf');

            // Remove a classe depois
            mainElement.classList.remove('mobile-export', 'mobile-export-force');
        });

        setTimeout(() => {
            $('#modal-loading').modal('hide');
        }, 1000);
    });

    $('#delete-evaluation').click(function () {
        $('#modal-confirm').modal('show');
    });

    $('#btn-confirm').click(function () {
        $('#modal-confirm').modal('hide');
        $('#modal-loading').modal('show');
        $.ajax({
            url: '/equipes/avaliacoes/deletar',
            type: 'POST',
            data: {
                evaluation_time: $('#team-evaluation').val()
            },
            success: function (response) {
                setTimeout(() => {
                    $('#modal-loading').modal('hide');
                    if (response.status) {
                        window.location.reload();
                    } else {
                        $('#error-message').html(response.message);
                        $('#modal-error').modal('show');
                    }
                }, 1000);

            },
            error: function () {
                setTimeout(() => {
                    $('#modal-loading').modal('hide');
                    $('#error-message').html('Erro ao excluir a avaliação.');
                    $('#modal-error').modal('show');
                }, 1000);

            }
        });

    });
});

