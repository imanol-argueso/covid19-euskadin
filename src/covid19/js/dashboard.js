//import { DATAFILES } from './config';
const DATA_SOURCE = 'https://opendata.euskadi.eus/contenidos/ds_informes_estudios/covid_19_2020/opendata/generated/';
DATAFILES = {
    EPIDEMICSTATUS: `${DATA_SOURCE}/covid19-epidemic-status.json`,
    PCR: `${DATA_SOURCE}/covid19-pcr.json`,
    DECEASEDPEOPLECOUNT: `${DATA_SOURCE}/covid19-deceasedPeopleCount.json`,
    BYAGE: `${DATA_SOURCE}/covid19-byage.json`,
    BYHEALTHZONE: `${DATA_SOURCE}/covid19-byhealthzone.json`,
    BYMUNICIPALITY: `${DATA_SOURCE}/covid19-bymunicipality.json`,
    BYHOSPITAL: `${DATA_SOURCE}/covid19-byhospital.json`,
};
//import { getJSON } from './getData.js';
var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
};
function format(n) {
    return (n >= 0 ? '+' : '') + n;
}
function dashboard(jsonData, jsonDataId) {
    let today = jsonData.byDate[jsonData.byDate.length - 1][jsonDataId];
    let yesterday = jsonData.byDate[jsonData.byDate.length - 2][jsonDataId];
    let increment = (today - yesterday);
    if (Math.floor(increment) !== increment) {
        increment = increment.toFixed(2);
    };
    return (today) + ' (' + format(increment) + ')';
}
window.onload = function () {
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
            document.getElementById("actualizadoPositivos").innerHTML += formattedlastdatePositivos;

            document.getElementById("fallecidos").innerHTML = dashboard(dataJson, 'deceasedCount');
            let lastdateFallecidos = new Date(dataJson.deceasedCountByDate[dataJson.deceasedCountByDate.length - 1].date);
            let formattedLastdateFallecidos = lastdateFallecidos.getDate() + "-" + (lastdateFallecidos.getMonth() + 1) + "-" + lastdateFallecidos.getFullYear();
            document.getElementById("actualizadoFallecidos").innerHTML += formattedLastdateFallecidos;

            document.getElementById("r0").innerHTML = dashboard(dataJson, 'r0');
            let lastdateR0 = new Date(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
            let formattedlastdateR0 = lastdateR0.getDate() + "-" + (lastdateR0.getMonth() + 1) + "-" + lastdateR0.getFullYear();
            document.getElementById("actualizadoR0").innerHTML += formattedlastdateR0;

            document.getElementById("hospitalizaciones").innerHTML = dashboard(dataJson, 'newHospitalAdmissionsWithPCRCount');

            google.charts.load('current', { 'packages': ['line'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {

                var data = new google.visualization.DataTable();
                data.addColumn('date', '');
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('number', 'Biderkatze zenbakia (r0)');
                } else {
                    data.addColumn('number', 'Número de Reproducción (r0)');
                }
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
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('number', 'Euskadi: Positiboen kasu kopurua');
                } else {
                    data.addColumn('number', 'Euskadi: Número de casos positivos');
                }

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
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('number', 'Hildakoen kopurua');
                } else {
                    data.addColumn('number', 'Número de fallecidos');
                }
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