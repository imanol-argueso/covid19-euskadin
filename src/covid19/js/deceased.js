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
window.onload = function () {
    getJSON(DATAFILES.DECEASEDPEOPLECOUNT, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            google.charts.load('current', { 'packages': ['line'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('date', 'Data');
                    data.addColumn('number', 'Hildakoen kopurua');
                    var options = {
                        chart: {
                            title: 'Euskadin izandako hildaken kopurua',
                        },
                        hAxis: { format: 'M/d/yy' },
                        width: 900,
                        height: 500
                    };

                } else {
                    data.addColumn('date', 'Fecha');
                    data.addColumn('number', 'Número de Fallecidos');
                    var options = {
                        chart: {
                            title: 'Número de fallecidos en Euskadi',
                            //subtitle: 'Casos positivos nuevos en Euskadi de test PCRs'
                        },
                        hAxis: { format: 'M/d/yy' },
                        width: 900,
                        height: 500
                    };
                }
                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.deceasedCount]);
                }

                var chart = new google.charts.Line(document.getElementById('linechart_material2'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            }
            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);

            function drawTable() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('date', 'Data');
                    data.addColumn('number', 'Hildakoak');
                    var monthYearFormatter = new google.visualization.DateFormat({
                        pattern: "yyy-MM-dd"
                    });
                } else {
                    data.addColumn('date', 'Fecha');
                    data.addColumn('number', 'Fallecidos');
                    var monthYearFormatter = new google.visualization.DateFormat({
                        pattern: "dd-MM-yyy"
                    });
                }
                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.deceasedCount]);
                }
                monthYearFormatter.format(data, 0);
                var table = new google.visualization.Table(document.getElementById('table_div2'));
                table.draw(data, { showRowNumber: true, sortColumn: 0, sortAscending: false, width: '100%', height: '100%' });
            }
        }
    });
}