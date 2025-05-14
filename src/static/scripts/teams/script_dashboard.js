$(document).ready(function () {
    const ctx = document.getElementById('line-chart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Proatividade', 'Autonomia', 'Colaboração', 'Entrega'],
            datasets: [
                {
                    label: 'Atual',
                    data: [1.5, 1.7, 2.0, 3.0],
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    pointBackgroundColor: '#0d6efd',
                    borderWidth: 2,
                    tension: 0, // Linha reta
                    pointRadius: 6
                },
                {
                    label: 'Anterior',
                    data: [1.2, 1.5, 2.3, 2.5],
                    borderColor: '#adb5bd',
                    backgroundColor: 'rgba(173, 181, 189, 0.1)',
                    pointBackgroundColor: '#adb5bd',
                    borderWidth: 2,
                    tension: 0,
                    borderDash: [6, 4],
                    pointRadius: 6
                }
            ]
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

    const radarCtx = document.getElementById('radar-chart').getContext('2d');
    new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ['Proatividade', 'Autonomia', 'Colaboração', 'Entrega'],
            datasets: [
                {
                    label: 'Atual',
                    data: [1.7, 1.3, 2.5, 3.0],
                    backgroundColor: 'rgba(13, 110, 253, 0.2)',
                    borderColor: '#0d6efd',
                    pointBackgroundColor: '#0d6efd'
                }
            ]
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
                    text: 'Radar de Rendimento'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
});