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
        console.log(lastAvarage, oldAvarage, avarage[indexAvarage + 1], indexAvarage + 1);
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
        console.log(performanceDashboard);
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
});
