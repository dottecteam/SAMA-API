$(document).ready(function () {
    const ctx = document.getElementById('line-chart').getContext('2d');

    const datasets = [];

    datasets.push({
        label: 'Atual',
        data: avarage[0],
        borderColor: '#0d6efd',
        backgroundColor: 'rgba(13, 110, 253, 0.1)',
        borderWidth: 2,
    });

    if (avarage.length > 1 && avarage[1].length) {
        datasets.push({
            label: 'Anterior',
            data: avarage[1],
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
                    parseFloat(data[0]['evaluations'][email]['proatividade']),
                    parseFloat(data[0]['evaluations'][email]['autonomia']),
                    parseFloat(data[0]['evaluations'][email]['colaboracao']),
                    parseFloat(data[0]['evaluations'][email]['entrega'])
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

    $('.team-developer').click(function () {
        $('.team-developer.active').removeClass('active')
        $(this).addClass('active');

        const selectedEmail = $(this).data('email');

        if (!data[0]['evaluations'][selectedEmail]) {
            alert('Dados não encontrados para este usuário!');
            chartRadar.data.datasets[0].data = [0, 0, 0, 0]
            chartRadar.update();
            return;
        }

        chartRadar.data.datasets[0].data = [
            parseFloat(data[0]['evaluations'][selectedEmail]['proatividade']),
            parseFloat(data[0]['evaluations'][selectedEmail]['autonomia']),
            parseFloat(data[0]['evaluations'][selectedEmail]['colaboracao']),
            parseFloat(data[0]['evaluations'][selectedEmail]['entrega'])
        ];

        chartRadar.update()
    });
});