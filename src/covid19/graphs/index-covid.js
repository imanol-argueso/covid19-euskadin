import { getJSON } from '../getData.js';
window.onload = function () {


    getJSON('https://opendata.euskadi.eus/contenidos/ds_informes_estudios/covid_19_2020/opendata/generated/covid19-epidemic-status.json', function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            function format(n) {
                return (n >= 0 ? '+' : '') + n;
            }

            function dashboard(jsonDataId) {
                let today = dataJson.byDate[dataJson.byDate.length - 1][jsonDataId];
                console.log(today);
                let yesterday = dataJson.byDate[dataJson.byDate.length - 2][jsonDataId];
                let increment = (today - yesterday);
                if (Math.floor(increment) !== increment) {
                    increment = increment.toFixed(2);
                };
                console.log((today) + ' (' + format(increment) + ')');
                return (today) + ' (' + format(increment) + ')';
            }
            document.getElementById("tests").innerHTML = dashboard('pcrTestCount');
            document.getElementById("testsRapidos").innerHTML = dashboard('serologyTestCount');
            document.getElementById("personasUnicasPcr").innerHTML = dashboard('pcrUniquePersonCount');
            document.getElementById("hospitalizaciones").innerHTML = dashboard('newHospitalAdmissionsWithPCRCount');
            document.getElementById("hospitalizadosUci").innerHTML = dashboard('icuPeopleCount');
            document.getElementById("altasHospitalarias").innerHTML = dashboard('hospitalReleasedCount');


            document.getElementById("positivos").innerHTML = dashboard('totalPositiveCount');
            let lastdatePositivos = new Date(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
            let formattedlastdatePositivos = lastdatePositivos.getDate() + "-" + (lastdatePositivos.getMonth() + 1) + "-" + lastdatePositivos.getFullYear();
            document.getElementById("actualizadoPositivos").innerHTML = 'Actualizado: ' + formattedlastdatePositivos;

            document.getElementById("fallecidos").innerHTML = dashboard('deceasedCount');
            let lastdateFallecidos = new Date(dataJson.deceasedCountByDate[dataJson.deceasedCountByDate.length - 1].date);
            let formattedLastdateFallecidos = lastdateFallecidos.getDate() + "-" + (lastdateFallecidos.getMonth() + 1) + "-" + lastdateFallecidos.getFullYear();
            document.getElementById("actualizadoFallecidos").innerHTML = 'Actualizado: ' + formattedLastdateFallecidos;

            document.getElementById("r0").innerHTML = dashboard('r0');
            let lastdateR0 = new Date(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
            let formattedlastdateR0 = lastdateR0.getDate() + "-" + (lastdateR0.getMonth() + 1) + "-" + lastdateR0.getFullYear();
            document.getElementById("actualizadoR0").innerHTML = 'Actualizado: ' + formattedlastdateR0;

            document.getElementById("hospitalizaciones").innerHTML = dashboard('newHospitalAdmissionsWithPCRCount');


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
                var chart = new google.charts.Line(document.getElementById('linechart_material3'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            }
        }
    });
    getJSON('https://opendata.euskadi.eus/contenidos/ds_informes_estudios/covid_19_2020/opendata/generated/covid19-pcr.json', function (err, dataJson) {
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
                var chart = new google.charts.Line(document.getElementById('linechart_material'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            }
        }
    });
    getJSON('https://opendata.euskadi.eus/contenidos/ds_informes_estudios/covid_19_2020/opendata/generated/covid19-deceasedPeopleCount.json', function (err, dataJson) {
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
                var chart = new google.charts.Line(document.getElementById('linechart_material2'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            }
        }
    });
}
