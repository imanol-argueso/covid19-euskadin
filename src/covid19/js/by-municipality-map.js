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
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                subdomains: 'abcd',
                minZoom: 1,
                maxZoom: 16,
                ext: 'png'
            }).addTo(map)
            let geojson_url = "../maps/municipios_latlon.json";
            let addGeoLayer = (data) => {
                let geojsonLayer = L.geoJson(data, {
                    onEachFeature: function (feature, layer) {
                        let objetoAFiltrar = dataJson.byDateByMunicipality[0].items;
                        let positivos = objetoAFiltrar.filter(element => '' + element.geoMunicipality.countyId + element.geoMunicipality.oid === '' + feature.properties.EUSTAT);
                        if (positivos.length !== 0 && positivos[0].positiveBy100ThousandPeopleRate < 300) {
                            layer.bindPopup(feature.properties.NOMBRE_EUS + ': ' + positivos[0].positiveBy100ThousandPeopleRate + ' positivos por 100.000 hab.');
                            layer.setStyle({
                                weight: 1,
                                color: '#FFEDA0',
                                dashArray: '3',
                                fillOpacity: 0.7,
                            });
                        } else if (positivos.length !== 0 && positivos[0].positiveBy100ThousandPeopleRate >= 300 && positivos[0].positiveBy100ThousandPeopleRate < 500) {
                            layer.bindPopup(feature.properties.NOMBRE_EUS + ': ' + positivos[0].positiveBy100ThousandPeopleRate + ' positivos por 100.000 hab.');
                            layer.setStyle({
                                weight: 1,
                                color: '#FED976',
                                dashArray: '3',
                                fillOpacity: 0.7
                            });

                        }

                        else if (positivos.length !== 0 && positivos[0].positiveBy100ThousandPeopleRate >= 500 && positivos[0].positiveBy100ThousandPeopleRate < 700) {
                            layer.bindPopup(feature.properties.NOMBRE_EUS + ': ' + positivos[0].positiveBy100ThousandPeopleRate + ' positivos por 100.000 hab.');
                            layer.setStyle({
                                weight: 1,
                                color: '#FEB24C',
                                dashArray: '3',
                                fillOpacity: 0.7
                            });

                        } else if (positivos.length !== 0 && positivos[0].positiveBy100ThousandPeopleRate >= 700 && positivos[0].positiveBy100ThousandPeopleRate < 900) {
                            layer.bindPopup(feature.properties.NOMBRE_EUS + ': ' + positivos[0].positiveBy100ThousandPeopleRate + ' positivos por 100.000 hab.');
                            layer.setStyle({
                                weight: 1,
                                color: '#FD8D3C',
                                dashArray: '3',
                                fillOpacity: 0.7
                            });
                        } else if (positivos.length !== 0 && positivos[0].positiveBy100ThousandPeopleRate >= 900 && positivos[0].positiveBy100ThousandPeopleRate < 1100) {
                            layer.bindPopup(feature.properties.NOMBRE_EUS + ': ' + positivos[0].positiveBy100ThousandPeopleRate + ' positivos por 100.000 hab.');
                            layer.setStyle({
                                weight: 1,
                                color: '#FC4E2A',
                                dashArray: '0',
                                fillOpacity: 0.7
                            });

                        } else if (positivos.length !== 0 && positivos[0].positiveBy100ThousandPeopleRate >= 1100 && positivos[0].positiveBy100ThousandPeopleRate < 1400) {
                            layer.bindPopup(feature.properties.NOMBRE_EUS + ': ' + positivos[0].positiveBy100ThousandPeopleRate + ' positivos por 100.000 hab.');
                            layer.setStyle({
                                weight: 1,
                                color: '#E31A1C',
                                dashArray: '0',
                                fillOpacity: 0.7
                            });

                        } else if (positivos.length !== 0 && positivos[0].positiveBy100ThousandPeopleRate >= 1400 && positivos[0].positiveBy100ThousandPeopleRate < 1700) {
                            layer.bindPopup(feature.properties.NOMBRE_EUS + ': ' + positivos[0].positiveBy100ThousandPeopleRate + ' positivos por 100.000 hab.');
                            layer.setStyle({
                                weight: 1,
                                color: '#BD0026',
                                dashArray: '3',
                                fillOpacity: 0.7
                            });

                        } else if (positivos.length !== 0 && positivos[0].positiveBy100ThousandPeopleRate >= 1700) {
                            layer.bindPopup(feature.properties.NOMBRE_EUS + ': ' + positivos[0].positiveBy100ThousandPeopleRate + ' positivos por 100.000 hab.');
                            layer.setStyle({
                                weight: 1,
                                color: '#800026',
                                dashArray: '3',
                                fillOpacity: 0.7,
                                border: 0

                            });

                        } else if (positivos.length == 0) {
                            layer.bindPopup('No hay datos');
                            layer.setStyle({
                                weight: 1,
                                color: 'blue',
                                dashArray: '3',
                                fillOpacity: 0.3,
                                border: 0

                            });

                        }

                    },
                }).addTo(map)
                map.fitBounds(geojsonLayer.getBounds())
            }
            /*
            var legend = L.control({ position: 'bottomright' });

            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0, 10, 20, 50, 100, 200, 500, 1000],
                    labels = [];

                // loop through our density intervals and generate a label with a colored square for each interval

                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                }

                return div;
            };

            legend.addTo(map);
            */

            fetch(
                geojson_url
            ).then(
                res => res.json()
            ).then(
                data => addGeoLayer(data)
            )

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