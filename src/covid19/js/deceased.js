import { DATAFILES } from './config';
import { getJSON } from './getData.js';

window.onload = function () {
    getJSON(DATAFILES.DECEASEDPEOPLECOUNT, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            google.charts.load('current', { 'packages': ['line'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Fecha');
                data.addColumn('number', 'Número de fallecidos');
                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.deceasedCount]);
                }
                var options = {
                    chart: {
                        title: 'Número de fallecidos en Euskadi',
                        //subtitle: 'Casos positivos nuevos en Euskadi de test PCRs'
                    },
                    hAxis: { format: 'M/d/yy' },
                    width: 900,
                    height: 500
                };
                var chart = new google.charts.Line(document.getElementById('linechart_material2'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            }
            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);
            function drawTable() {
                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Fecha');
                data.addColumn('number', 'Fallecidos');

                for (let element of dataJson.byDate) {
                    data.addRow([new Date(element.date), element.deceasedCount]);
                }
                var table = new google.visualization.Table(document.getElementById('table_div2'));
                table.draw(data, { showRowNumber: true, sortColumn: 0, sortAscending: false, width: '100%', height: '100%' });
            }

        }
    });
}