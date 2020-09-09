//import { DATAFILES } from './config';
//const DATAFILES = require('./config');
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
//const getJSON = require('./getData');
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
function updated(jsonData) {
    let lastdate = new Date(jsonData);
    let formattedlastdate = lastdate.getDate() + "/" + (lastdate.getMonth() + 1) + "/" + lastdate.getFullYear();
    return formattedlastdate;
}

window.onload = function () {
    getJSON(DATAFILES.PCR, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            document.getElementById("fechaActualizacion").innerHTML += updated(dataJson.byDate[dataJson.byDate.length - 1].date);

            google.charts.load('current', { 'packages': ['line'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('date', 'Data');
                    data.addColumn('number', 'Euskadi: Kasu positiboen kopurua');
                    var options = {
                        chart: {
                            title: 'Kasu positibo berriak Euskadin',
                            subtitle: 'PCR testetan izandako kasu positibo berriak Euskadin',
                        },
                        hAxis: { format: 'yy/M/d' },
                        width: 900,
                        height: 500
                    };
                } else {
                    data.addColumn('date', 'Fecha');
                    data.addColumn('number', 'Euskadi: Número de casos positivos');
                    var options = {
                        chart: {
                            title: 'Casos positivos nuevos en Euskadi',
                            subtitle: 'Casos positivos nuevos en Euskadi de test PCRs',
                        },
                        hAxis: { format: 'M/d/yy' },
                        width: 900,
                        height: 500
                    };
                }
                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.positiveCount]);
                }

                var chart = new google.charts.Line(document.getElementById('linechart_material'));
                chart.draw(data, google.charts.Line.convertOptions(options));

                /*

                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('date', 'Data');
                    data.addColumn('number', 'Euskadi: Kasu positiboen tasa egindako PCR proben arabera');
                    var options = {
                        chart: {
                            title: 'Kasu positiboen tasa egindako PCR proben arabera',
                            subtitle: 'Kasu positiboak zati egindako PCR testak',
                        },
                        hAxis: { format: 'yy/M/d' },
                        width: 900,
                        height: 500
                    };
                } else {
                    data.addColumn('date', 'Fecha');
                    data.addColumn('number', 'Euskadi: Tasa de positivos en función de los test PCR realizados');
                    var options = {
                        chart: {
                            title: 'Tasa de positivos en función de los test PCR realizados',
                            subtitle: 'Casos positivos entre las pruebas PCR realizadas',
                        },
                        hAxis: { format: 'M/d/yy' },
                        width: 900,
                        height: 500
                    };
                }
                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.positiveCount]);
                }
                var chart = new google.charts.Line(document.getElementById('linechart_material1'));
                chart.draw(data, google.charts.Line.convertOptions(options));

                */








                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('date', 'Data');
                    data.addColumn('number', 'Euskadi: 14 egunetan metatutako intzidentzia 100.000 biztanleko (PCR testak)');
                    data.addColumn('number', 'Araba: 14 egunetan metatutako intzidentzia 100.000 biztanleko (PCR testak)');
                    data.addColumn('number', 'Bizkaia: 14 egunetan metatutako intzidentzia 100.000 biztanleko (PCR testak)');
                    data.addColumn('number', 'Gipuzkoa: 14 egunetan metatutako intzidentzia 100.000 biztanleko (PCR testak)');
                    var options = {
                        chart: {
                            title: 'Kasu positiboak: 100.000 biztanleko intzidentzia',
                            subtitle: '14 egunetan metatutako intzidentzia 100.000 biztanleko (PCR testak)',
                        },
                        hAxis: { format: 'yy/M/d' },
                        width: 900,
                        height: 500
                    };
                } else {
                    data.addColumn('date', 'Fecha');
                    data.addColumn('number', 'Euskadi: Incidencia acumulada 14 días x 100.000 hab. (test PCRs)');
                    data.addColumn('number', 'Araba: Incidencia acumulada 14 días x 100.000 hab. (test PCRs)');
                    data.addColumn('number', 'Bizkaia: Incidencia acumulada 14 días x 100.000 hab. (test PCRs)');
                    data.addColumn('number', 'Gipuzkoa: Incidencia acumulada 14 días x 100.000 hab. (test PCRs)');
                    var options = {
                        chart: {
                            title: 'Casos positivos: incidencia x 100.000 hab.',
                            subtitle: 'Incidencia acumulada 14 días x 100.000 hab. (test PCRs)',
                        },
                        hAxis: { format: 'M/d/yy' },
                        width: 900,
                        height: 500
                    };
                }

                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.aggregatedIncidence, element.aggregatedIncidenceAR, element.aggregatedIncidenceBIZ, element.aggregatedIncidenceGI]);
                }
                var chart = new google.charts.Line(document.getElementById('linechart_material0'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            }

            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);
            function drawTable() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('date', 'Data');
                    data.addColumn('number', 'Positiboak (PCR)');
                    data.addColumn('number', 'Euskadi: positiboak 100.000 biztanleko');
                    data.addColumn('number', 'Araba');
                    data.addColumn('number', 'Bizkaia');
                    data.addColumn('number', 'Gizpuzkoa');
                    var monthYearFormatter = new google.visualization.DateFormat({
                        pattern: "yyy-MM-dd"
                    });
                } else {
                    data.addColumn('date', 'Fecha');
                    data.addColumn('number', 'Positivos (PCR)');
                    data.addColumn('number', 'Euskadi: Positivos x 100.000 hab.');
                    data.addColumn('number', 'Araba');
                    data.addColumn('number', 'Bizkaia');
                    data.addColumn('number', 'Gizpuzkoa');
                    var monthYearFormatter = new google.visualization.DateFormat({
                        pattern: "dd-MM-yyy"
                    });
                }

                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.positiveCount, element.aggregatedIncidence, element.aggregatedIncidenceAR, element.aggregatedIncidenceBIZ, element.aggregatedIncidenceGI]);
                }
                monthYearFormatter.format(data, 0);
                var table = new google.visualization.Table(document.getElementById('table_div'));
                table.draw(data, { showRowNumber: true, sortColumn: 0, sortAscending: false, width: '100%', height: '100%' });

            }
        }
    });
}