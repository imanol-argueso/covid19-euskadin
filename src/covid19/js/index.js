import { DATAFILES } from './config';
import { getJSON } from './getData.js';
import { format, dashboard } from './dashboard.js';

export function init() {

    getJSON(DATAFILES.EPIDEMICSTATUS, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            document.getElementById("tests").innerHTML = dashboard(dataJson, 'pcrTestCount');
            document.getElementById("testsRapidos").innerHTML = dashboard(dataJson, 'serologyTestCount');
            document.getElementById("personasUnicasPcr").innerHTML = dashboard(dataJson, 'pcrUniquePersonCount');
            document.getElementById("hospitalizaciones").innerHTML = dashboard(dataJson, 'newHospitalAdmissionsWithPCRCount');
            document.getElementById("hospitalizadosUci").innerHTML = dashboard(dataJson, 'icuPeopleCount');
            document.getElementById("altasHospitalarias").innerHTML = dashboard(dataJson, 'hospitalReleasedCount');

            document.getElementById("positivos").innerHTML = dashboard(dataJson, 'totalPositiveCount');
            let lastdatePositivos = new Date(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
            let formattedlastdatePositivos = lastdatePositivos.getDate() + "-" + (lastdatePositivos.getMonth() + 1) + "-" + lastdatePositivos.getFullYear();
            document.getElementById("actualizadoPositivos").innerHTML = 'Actualizado: ' + formattedlastdatePositivos;

            document.getElementById("fallecidos").innerHTML = dashboard(dataJson, 'deceasedCount');
            let lastdateFallecidos = new Date(dataJson.deceasedCountByDate[dataJson.deceasedCountByDate.length - 1].date);
            let formattedLastdateFallecidos = lastdateFallecidos.getDate() + "-" + (lastdateFallecidos.getMonth() + 1) + "-" + lastdateFallecidos.getFullYear();
            document.getElementById("actualizadoFallecidos").innerHTML = 'Actualizado: ' + formattedLastdateFallecidos;

            document.getElementById("r0").innerHTML = dashboard(dataJson, 'r0');
            let lastdateR0 = new Date(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
            let formattedlastdateR0 = lastdateR0.getDate() + "-" + (lastdateR0.getMonth() + 1) + "-" + lastdateR0.getFullYear();
            document.getElementById("actualizadoR0").innerHTML = 'Actualizado: ' + formattedlastdateR0;

            document.getElementById("hospitalizaciones").innerHTML = dashboard(dataJson, 'newHospitalAdmissionsWithPCRCount');

            google.charts.load('current', { 'packages': ['line'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {

                var data = new google.visualization.DataTable();
                data.addColumn('date', '');
                data.addColumn('number', 'Número de Reproducción (r0)');
                for (let element of dataJson.byDate) {
                    if (element.date > '2020-03-07T22:00:00Z') {
                        data.addRow([new Date(element.date), element.r0]);
                    }
                }
                var options = {
                    legend: { position: 'none' },
                    hAxis: { format: 'M/d/yy' },
                    colors: ['#6c757d'],
                    width: 297,
                    height: 197
                };
                var chart = new google.charts.Line(document.getElementById('linechart_material_mini3'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            }
        }
    });
    getJSON(DATAFILES.PCR, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            google.charts.load('current', { 'packages': ['line'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                data.addColumn('date', '');
                data.addColumn('number', 'Euskadi: Número de casos positivos');

                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.positiveCount]);
                }
                var options = {
                    legend: { position: 'none' },
                    hAxis: { format: 'M/d/yy' },
                    colors: ['#6c757d'],
                    width: 297,
                    height: 197
                };
                var chart = new google.charts.Line(document.getElementById('linechart_material_mini1'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            }
        }
    });
    getJSON(DATAFILES.DECEASEDPEOPLECOUNT, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            google.charts.load('current', { 'packages': ['line'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                data.addColumn('date', '');
                data.addColumn('number', 'Número de fallecidos');
                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.deceasedCount]);
                }
                var options = {
                    legend: { position: 'none' },
                    hAxis: { format: 'M/d/yy' },
                    colors: ['#6c757d'],
                    width: 297,
                    height: 197
                };
                var chart = new google.charts.Line(document.getElementById('linechart_material_mini2'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            }
        }
    });
}
