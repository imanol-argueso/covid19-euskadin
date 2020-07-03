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

    getJSON(DATAFILES.BYMUNICIPALITY, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawSeriesChart);

            function drawSeriesChart() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('string', 'Udalerria');
                    data.addColumn('number', 'Positiboen tasa');
                    data.addColumn('number', 'Hilgarritasuna');
                    data.addColumn('number', 'Biztanleak');
                    var options = {
                        title: '20.000 biztanle baino gehiago dituzten udalerrien positibo (100.000 biztanleko tasa) eta hilgarritasunaren arteko korrelazioa.',
                        hAxis: { title: 'Positiboak (100.000 biztanleko tasa)' },
                        vAxis: { title: 'Hilgarritasuna' },
                        bubble: { textStyle: { fontSize: 11 } }
                    };
                } else {
                    data.addColumn('string', 'Municipio');
                    data.addColumn('number', 'Tasa de positivos');
                    data.addColumn('number', 'Letalidad');
                    data.addColumn('number', 'Poblacion');
                    var options = {
                        title: 'Correlación entre positivos (tasa por 100.000 hab.) y la letalidad en los municipios de más de 20.000 habitantes de Euskadi.',
                        hAxis: { title: 'Positivos (tasa por 100.000 hab.)' },
                        vAxis: { title: 'Letalidad' },
                        bubble: { textStyle: { fontSize: 11 } }
                    };
                }
                for (let element of dataJson.byDateByMunicipality[0].items) {
                    if (element.population > 20000) {
                        data.addRow([element.geoMunicipality.officialName, element.positiveBy100ThousandPeopleRate, element.mortalityRate, element.population]);
                    }
                }
                var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div2'));
                chart.draw(data, options);
            }

            let map = L.map('map')
            let geojson_url = "https://covid19-euskadin.herokuapp.com/maps/municipios_latlon.json";
            let addGeoLayer = (data) => {
                let geojsonLayer = L.geoJson(data, {
                    onEachFeature: function (feature, layer) {
                        layer.bindPopup(feature.properties['EUSTAT'])
                        //layer.setIcon(treeMarker);
                    }
                }).addTo(map)
                map.fitBounds(geojsonLayer.getBounds())
            }
            fetch(
                geojson_url
            ).then(
                res => res.json()
            ).then(
                data => addGeoLayer(data)
            )


            /*
            //let map = L.map('map').setView([40.7277831, -74.0080852], 13);
            L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &mdash; Data from <a href="https://datosabiertos.jcyl.es/">JCyL OpenData</a>',
                subdomains: 'abcd',
                minZoom: 1,
                maxZoom: 16,
                ext: 'png'
            }).addTo(map)
 
            let treeMarker = L.ExtraMarkers.icon({
                icon: 'fa-leaf',
                markerColor: 'green',
                shape: 'square',
                prefix: 'fa'
            })
 
            let geojson_url = "https://covid19-euskadin.herokuapp.com/maps/municipios_latlon.json"
            let addGeoLayer = (data) => {
                let geojsonLayer = L.geoJson(data, {
                    onEachFeature: function (feature, layer) {
                        layer.bindPopup(feature.properties['arbol_nombre'])
                        //layer.setIcon(treeMarker);
                    }
                }).addTo(map)
                map.fitBounds(geojsonLayer.getBounds())
            }
 
            fetch(
                geojson_url
            ).then(
                res => res.json()
            ).then(
                data => addGeoLayer(data)
            )
*/


            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);
            function drawTable() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('string', 'Udalerria');
                    data.addColumn('number', 'Populazioa');
                    data.addColumn('number', 'Positiboak');
                    data.addColumn('number', 'Positiboen tasa 100.000 biz.');
                    data.addColumn('number', 'Hildakoak');
                    data.addColumn('number', 'Hilgarritasuna');
                } else {
                    data.addColumn('string', 'Municipio');
                    data.addColumn('number', 'Poblacion');
                    data.addColumn('number', 'Positivos');
                    data.addColumn('number', 'Tasa de positivos 100.000 hab.');
                    data.addColumn('number', 'Fallecidos');
                    data.addColumn('number', 'Letalidad');
                }
                for (let element of dataJson.byDateByMunicipality[0].items) {

                    data.addRow([element.geoMunicipality.officialName, element.population, element.totalPositiveCount, element.positiveBy100ThousandPeopleRate, element.totalDeceasedCount, element.mortalityRate]);
                }
                var table = new google.visualization.Table(document.getElementById('table_div9'));
                table.draw(data, { showRowNumber: true, sortColumn: 2, sortAscending: false, width: '100%', height: 'auto' });
            }


        }
    });
}