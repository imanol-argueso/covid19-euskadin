//import { DATAFILES } from './config';
//import { getJSON } from './getData.js';
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

    getJSON(DATAFILES.BYAGE, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawSeriesChart);

            function drawSeriesChart() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'ID');
                data.addColumn('number', 'Positivos');
                data.addColumn('number', 'Fallecidos');
                data.addColumn('number', 'Poblacion');
                for (let element of dataJson.byAgeRange) {
                    if (element.ageRange !== 'No consta') {
                        data.addRow([element.ageRange, element.positiveCount, element.deceasedCount, element.population]);
                    }
                }
                var options = {
                    title: 'Correlación entre el número de positivos y el de fallecidos por rango de edad.',
                    hAxis: { title: 'Positivos' },
                    vAxis: { title: 'Fallecidos' },
                    bubble: { textStyle: { fontSize: 11 } }
                };

                var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
                chart.draw(data, options);
            }
            google.charts.load('current', { 'packages': ['bar'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Fecha');
                data.addColumn('number', 'Positivos');
                data.addColumn('number', 'Fallecidos');
                for (let element of dataJson.byAgeRange) {
                    if (element.ageRange !== 'No consta') {
                        data.addRow([element.ageRange + ' años', element.positiveCount, element.deceasedCount]);
                    }
                }
                var options = {
                    chart: {
                        title: 'Número de positivos y de fallecidos por rango de edad',
                        subtitle: 'Se muestran los mismos datos representados en otro gráfico.',
                    },
                    bars: 'horizontal' // Required for Material Bar Charts.
                };

                var chart = new google.charts.Bar(document.getElementById('barchart_material6'));

                chart.draw(data, google.charts.Bar.convertOptions(options));
            }


            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);
            function drawTable() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Rango de edad');
                data.addColumn('number', 'Poblacion');
                data.addColumn('number', 'Total de positivos');
                data.addColumn('number', '% de positivos sobre el total de casos');
                data.addColumn('number', 'Total fallecidos');
                data.addColumn('number', 'Letalidad');


                for (let element of dataJson.byAgeRange) {
                    if (element.ageRange !== 'No consta') {
                        data.addRow([element.ageRange, element.population, element.positiveCount, element.positiveByPopulationPercentage, element.deceasedCount, element.lethalityRate,]);
                    }
                }
                var table = new google.visualization.Table(document.getElementById('table_div4'));
                table.draw(data, { showRowNumber: true, width: '100%', height: 'auto' });
            }
        }
    });
}