import { DATAFILES } from './config';
import { getJSON } from './getData.js';
window.onload = function () {
    getJSON(DATAFILES.EPIDEMICSTATUS, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {

            google.charts.load('current', { 'packages': ['line'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Fecha');
                data.addColumn('number', 'Test PCR totales');
                data.addColumn('number', ' Test rápidos totales');
                data.addColumn('number', ' Personas únicas con PCR');

                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.pcrTestCount, element.serologyTestCount, element.pcrUniquePersonCount]);
                }
                var options = {
                    chart: {
                        title: 'Test realizados en Euskadi',
                        subtitle: 'Test PCR y test rápidos realizados en Euskadi. Pruebas y personas únicas.',
                    },
                    width: 900,
                    height: 500
                };
                var chart = new google.charts.Line(document.getElementById('linechart_material7'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            }
            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);
            function drawTable() {
                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Fecha');
                data.addColumn('number', 'Test PCR totales');
                data.addColumn('number', ' Test rápidos totales');
                data.addColumn('number', ' Personas únicas con PCR');
                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.pcrTestCount, element.serologyTestCount, element.pcrUniquePersonCount]);
                }
                var table = new google.visualization.Table(document.getElementById('table_div7'));
                table.draw(data, { showRowNumber: true, sortColumn: 0, sortAscending: false, width: '100%', height: '100%' });

            }

        }
    });
}