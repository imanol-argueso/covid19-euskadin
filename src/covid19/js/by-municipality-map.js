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
function updated(jsonData) {
    let lastdate = new Date(jsonData);
    let formattedlastdate = lastdate.getDate() + "/" + (lastdate.getMonth() + 1) + "/" + lastdate.getFullYear();
    return formattedlastdate;
}
window.onload = function () {

    getJSON(DATAFILES.BYMUNICIPALITY, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {

            document.getElementById("fechaActualizacion").innerHTML += updated(dataJson.byDateByMunicipality[0].date);

            var popupInfo;
            var popupNoData;
            var title;
            var titleParagraph;
            if (window.location.href.indexOf("/eu/") > -1) {
                popupInfo = ' positibo 100.000 biztanleko';
                popupNoData = 'Ez dago positiborik.';
                title = 'Positiboak';
                titleParagraph = 'Euskadiko udalerrietan duten 100.000 biztanleko positiboen tasa.';
            } else {
                popupInfo = ' positivos por 100.000 hab.';
                popupNoData = 'No hay positivos.';
                title = 'Positivos';
                titleParagraph = 'Tasa de positivos por 100.000 habitantes en cada municipio.';
            }

            let map = L.map('map')
            L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map)
            let geojson_url = "../maps/municipios_latlon.json";
            function getColor(d) {
                return d > 1700 ? '#800026' :
                    d > 1400 ? '#BD0026' :
                        d > 1100 ? '#E31A1C' :
                            d > 900 ? '#FC4E2A' :
                                d > 700 ? '#FD8D3C' :
                                    d > 500 ? '#FEB24C' :
                                        d > 300 ? '#FED976' :
                                            d > 0 ? '#FFEDA0' :
                                                'white'
            }
            function style(dataValue) {
                return {
                    fillColor: getColor(dataValue),
                    weight: 1,
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            }
            //Leyenda con los rangos
            var legend = L.control({ position: 'bottomright' });

            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0, 300, 500, 700, 900, 1100, 1400, 1700],
                    labels = [];
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                }

                return div;
            };
            legend.addTo(map);
            var geojsonLayer;
            let addGeoLayer = (data) => {
                geojsonLayer = L.geoJson(data, {
                    onEachFeature: function (feature, layer) {
                        let objetoAFiltrar = dataJson.byDateByMunicipality[0].items;
                        let positivos = objetoAFiltrar.filter(element => '' + element.geoMunicipality.countyId.id + element.geoMunicipality.oid.id === '' + feature.properties.EUSTAT);

                        if (positivos.length !== 0) {
                            layer.bindPopup(feature.properties.NOMBRE_EUS + ': ' + positivos[0].positiveBy100ThousandPeopleRate + popupInfo);
                            layer.setStyle(style(positivos[0].positiveBy100ThousandPeopleRate));
                        } else {
                            layer.bindPopup(popupNoData);
                            layer.setStyle(style(0));
                        }
                    },
                }).addTo(map)
                map.fitBounds(geojsonLayer.getBounds())
            }

            //Añadimos la capa de info
            var info = L.control();

            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info');
                this.update();
                return this._div;
            };

            info.update = function () {
                this._div.innerHTML = '<h4>' + title + '</h4><p class="info_p">' + titleParagraph + '</p>';
            };
            info.addTo(map);
            fetch(
                geojson_url
            ).then(
                res => res.json()
            ).then(
                data => addGeoLayer(data)
            )

            var popupInfo2;
            var popupNoData2;
            var title2;
            var titleParagraph2;
            if (window.location.href.indexOf("/eu/") > -1) {
                popupInfo2 = '(%)-eko hilgarritasuna';
                popupNoData2 = 'Ez dago daturik.';
                title2 = 'Hilgarritasuna';
                titleParagraph2 = 'Pandemiaren hasieratik Euskadiko udalerrietan izandako hilgarritasuna.';
            } else {
                popupInfo2 = '% de letalidad';
                popupNoData2 = 'No hay datos.';
                title2 = 'Letalidad';
                titleParagraph2 = 'Letalidad en los municipios de Euskadi desde el inicio de la pandemia.';
            }

            let map2 = L.map('map2')
            L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map2)
            //let geojson_url2 = "./maps/municipios_latlon.json";
            function getColor2(d) {
                return d > 40 ? '#800026' :
                    d > 30 ? '#BD0026' :
                        d > 20 ? '#E31A1C' :
                            d > 16 ? '#FC4E2A' :
                                d > 12 ? '#FD8D3C' :
                                    d > 8 ? '#FEB24C' :
                                        d > 4 ? '#FED976' :
                                            d > 0 ? '#FFEDA0' :
                                                'white'
            }
            function style2(dataValue) {
                return {
                    fillColor: getColor2(dataValue),
                    weight: 1,
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            }
            //Leyenda con los rangos
            var legend2 = L.control({ position: 'bottomright' });

            legend2.onAdd = function (map2) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0, 4, 8, 12, 16, 20, 30, 40],
                    labels = [];
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColor2(grades[i] + 1) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? '%&ndash;' + grades[i + 1] + '%<br>' : '% +');
                }

                return div;
            };
            legend2.addTo(map2);
            var geojsonLayer2;
            let addGeoLayer2 = (data) => {
                geojsonLayer2 = L.geoJson(data, {
                    onEachFeature: function (feature, layer) {
                        let objetoAFiltrar = dataJson.byDateByMunicipality[0].items;
                        let positivos = objetoAFiltrar.filter(element => '' + element.geoMunicipality.countyId.id + element.geoMunicipality.oid.id === '' + feature.properties.EUSTAT);

                        if (positivos.length !== 0) {
                            layer.bindPopup(feature.properties.NOMBRE_EUS + ': ' + positivos[0].mortalityRate + popupInfo2);
                            layer.setStyle(style2(positivos[0].mortalityRate));
                        } else {
                            layer.bindPopup(popupNoData2);
                            layer.setStyle(style2(0));
                        }
                    },
                }).addTo(map2)
                map2.fitBounds(geojsonLayer2.getBounds())
            }

            //Añadimos la capa de info
            var info2 = L.control();

            info2.onAdd = function (map2) {
                this._div = L.DomUtil.create('div', 'info');
                this.update();
                return this._div;
            };

            info2.update = function () {
                this._div.innerHTML = '<h4>' + title2 + '</h4><p class="info_p">' + titleParagraph2 + '</p>';
            };
            info2.addTo(map2);
            fetch(
                geojson_url
            ).then(
                res => res.json()
            ).then(
                data => addGeoLayer2(data)
            )




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