import { getJSON } from '../getData.js';

window.onload = function () {
    //getJSON('https://opendata.euskadi.eus/contenidos/ds_recursos_turisticos/alojamiento_de_euskadi/opendata/alojamientos.json', function (err, data) {
    //getJSON('https://opendata.euskadi.eus/contenidos/ds_informes_estudios/calidad_aire_2020/es_def/adjuntos/datos_horarios/AGURAIN.json', function (err, data) {
    getJSON('https://opendata.euskadi.eus/contenidos/ds_informes_estudios/covid_19_2020/opendata/generated/covid19-pcr.json', function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            //alert('Your Json result is:  ' + JSON.stringify(data));
            //result.innerText = data.result;
            //result.innerText = JSON.stringify(data);
            google.charts.load('current', { 'packages': ['line'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Fecha');
                data.addColumn('number', 'Euskadi: Número de casos positivos');

                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.positiveCount]);
                }
                var options = {
                    chart: {
                        title: 'Casos positivos nuevos en Euskadi',
                        subtitle: 'Casos positivos nuevos en Euskadi de test PCRs',
                    },
                    hAxis: { format: 'M/d/yy' },
                    width: 900,
                    height: 500
                };
                var chart = new google.charts.Line(document.getElementById('linechart_material'));
                chart.draw(data, google.charts.Line.convertOptions(options));

                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Fecha');
                data.addColumn('number', 'Euskadi: Incidencia acumulada 14 días x 100.000 hab. (test PCRs)');
                data.addColumn('number', 'Araba: Incidencia acumulada 14 días x 100.000 hab. (test PCRs)');
                data.addColumn('number', 'Bizkaia: Incidencia acumulada 14 días x 100.000 hab. (test PCRs)');
                data.addColumn('number', 'Gipuzkoa: Incidencia acumulada 14 días x 100.000 hab. (test PCRs)');

                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.aggregatedIncidence, element.aggregatedIncidenceAR, element.aggregatedIncidenceBIZ, element.aggregatedIncidenceGI]);
                }
                var options = {
                    chart: {
                        title: 'Casos positivos: incidencia x 100.000 hab.',
                        subtitle: 'Incidencia acumulada 14 días x 100.000 hab. (test PCRs)',
                    },
                    hAxis: { format: 'M/d/yy' },
                    width: 900,
                    height: 500
                };
                var chart = new google.charts.Line(document.getElementById('linechart_material0'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            }

            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);
            function drawTable() {
                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Fecha');
                data.addColumn('number', 'Casos positivos');
                data.addColumn('number', 'Euskadi: Positivos x 100.000 hab.');
                data.addColumn('number', 'Araba');
                data.addColumn('number', 'Bizkaia');
                data.addColumn('number', 'Gizpuzkoa');
                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.positiveCount, element.aggregatedIncidence, element.aggregatedIncidenceAR, element.aggregatedIncidenceBIZ, element.aggregatedIncidenceGI]);
                }
                var table = new google.visualization.Table(document.getElementById('table_div'));
                table.draw(data, { showRowNumber: true, sortColumn: 0, sortAscending: false, width: '100%', height: '100%' });

            }
        }
    });
}