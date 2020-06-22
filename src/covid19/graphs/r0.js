import { getJSON } from '../getData.js';

window.onload = function () {
    getJSON('https://opendata.euskadi.eus/contenidos/ds_informes_estudios/covid_19_2020/opendata/generated/covid19-epidemic-status.json', function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            google.charts.load('current', { 'packages': ['line'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Fecha');
                data.addColumn('number', 'Número de Reproducción (r0)');
                for (let element of dataJson.byDate) {
                    if (element.date > '2020-03-07T22:00:00Z') {
                        data.addRow([new Date(element.date), element.r0]);
                    }
                }
                var options = {
                    chart: {
                        title: 'Número de reproducción en Euskadi',
                        subtitle: 'R0 de una enfermedad es el número de casos, en promedio, que van a ser causados por una persona infectada durante el período de contagio.'
                    },
                    width: 900,
                    height: 500
                };
                var chart = new google.charts.Line(document.getElementById('linechart_material3'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            }
            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);
            function drawTable() {
                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Fecha');
                data.addColumn('number', 'Número de reproducción');

                for (let element of dataJson.byDate) {
                    if (element.date > '2020-03-07T22:00:00Z') {
                        data.addRow([new Date(element.date), element.r0]);
                    }
                }
                var table = new google.visualization.Table(document.getElementById('table_div3'));
                table.draw(data, { showRowNumber: true, sortColumn: 0, sortAscending: false, width: '100%', height: '100%' });
            }
        }
    });
}