import { getJSON } from './getData.js';

export default function init() {
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
                    data.addColumn('number', 'Casos positivos en Euskadi (Test PCR)');
                    data.addColumn('number', 'Casos positivos Álava (Test PCR)');
                    data.addColumn('number', 'Casos positivos Bizkaia (Test PCR)');
                    data.addColumn('number', 'Casos positivos Gipuzkoa (Test PCR)');
                    /*
                    for (let i = 0; i < dataJson.byDate.length; i++) {
                        console.log(dataJson.byDate.pcrPositiveCount[i]);
                        //data.addRow([new Date(dataJson.byDate[date]), dataJson.byDate[pcrPositiveCount], dataJson.byDate[pcrPositiveCountAraba], dataJson.byDate[pcrPositiveCountBizkaia], dataJson.byDate[pcrPositiveCountGipuzkoa]]);
                    }
                    */

                    for (let element of dataJson.byDate) {
                        if (element.date > '2020-05-15T22:00:00Z') {
                            data.addRow([new Date(element.date), element.pcrPositiveCount, element.pcrPositiveCountAraba, element.pcrPositiveCountBizkaia, element.pcrPositiveCountGipuzkoa]);
                        }
                    }

                    var options = {
                        chart: {
                            title: 'Casos positivos en Euskadi y por territorio de test PCRs',
                            //subtitle: 'Casos positivos nuevos en Euskadi de test PCRs'
                        },
                        width: 900,
                        height: 500
                    };
                    var chart = new google.charts.Line(document.getElementById('linechart_material4'));
                    chart.draw(data, google.charts.Line.convertOptions(options));
                }
                google.charts.load('current', { 'packages': ['table'] });
                google.charts.setOnLoadCallback(drawTable);
                function drawTable() {
                    var data = new google.visualization.DataTable();
                    data.addColumn('date', 'Fecha');
                    data.addColumn('number', 'Positivos Euskadi (PCR)');
                    data.addColumn('number', 'Positivos Álava (PCR)');
                    data.addColumn('number', 'Positivos Bizkaia (PCR)');
                    data.addColumn('number', 'Positivos Gipuzkoa (PCR)');

                    for (let element of dataJson.byDate) {
                        if (element.date > '2020-05-15T22:00:00Z') {
                            data.addRow([new Date(element.date), element.pcrPositiveCount, element.pcrPositiveCountAraba, element.pcrPositiveCountBizkaia, element.pcrPositiveCountGipuzkoa]);
                        }
                    }
                    var table = new google.visualization.Table(document.getElementById('table_div5'));
                    table.draw(data, { showRowNumber: true, sortColumn: 0, sortAscending: false, width: '100%', height: '100%' });
                }
            }
        });
        /*
        function initMap() {
            // The location of Uluru
            var uluru = { lat: -25.344, lng: 131.036 };
            // The map, centered at Uluru
            var map = new google.maps.Map(
                document.getElementById('map'), { zoom: 4, center: uluru });
            // The marker, positioned at Uluru
            var marker = new google.maps.Marker({ position: uluru, map: map });
        }
        */
        var source = new ol.source.Vector({
            url: "./municpios_epsg3857.json",
            format: new ol.format.GeoJSON()
        })
        // Los datos en la variable
        var geojsonObject = {
            'type': 'FeatureCollection',
            'crs': {
                'type': 'name',
                'properties': {
                    'name': 'EPSG:3857'
                }
            },
            'features': [{
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [0, 0]
                }
            },
            ]
        };

        var source = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
        });
        var vectorLayer = new ol.layer.Vector({
            source: source
        })

    };

}