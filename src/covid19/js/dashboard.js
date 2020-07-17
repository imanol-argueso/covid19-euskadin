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
function updated(jsonData) {
    let lastdate = new Date(jsonData);
    let formattedlastdate = lastdate.getDate() + "/" + (lastdate.getMonth() + 1) + "/" + lastdate.getFullYear();
    return formattedlastdate;
}
window.onload = function () {
    getJSON(DATAFILES.EPIDEMICSTATUS, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            document.getElementById("fechaActualizacion").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
            document.getElementById("positivos").innerHTML = dashboard(dataJson, 'pcrPositiveCount');
            document.getElementById("actualizadoPositivos").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
            document.getElementById("fallecidos").innerHTML = dashboard(dataJson, 'deceasedCount');
            document.getElementById("actualizadoR0").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
            document.getElementById("r0").innerHTML = dashboard(dataJson, 'r0');
            document.getElementById("actualizadoFallecidos").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
            document.getElementById("tests").innerHTML = dashboard(dataJson, 'pcrTestCount');
            document.getElementById("hospitalizaciones").innerHTML = dashboard(dataJson, 'newHospitalAdmissionsWithPCRCount');
            document.getElementById("hospitalizadosUci").innerHTML = dashboard(dataJson, 'icuPeopleCount');
            document.getElementById("positivosAraba").innerHTML = dashboard(dataJson, 'pcrPositiveCountAraba');
            document.getElementById("positivosBizkaia").innerHTML = dashboard(dataJson, 'pcrPositiveCountBizkaia');
            document.getElementById("positivosGipuzkoa").innerHTML = dashboard(dataJson, 'pcrPositiveCountGipuzkoa');

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
                    curveType: 'function',
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
                    curveType: 'function',
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
                    curveType: 'function',
                    width: 297,
                    height: 197
                };
                var chart = new google.charts.Line(document.getElementById('linechart_material_mini2'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            }
        }
    });


    getJSON(DATAFILES.BYMUNICIPALITY, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            var popupInfo;
            var popupNoData;
            var title;
            var titleParagraph;
            if (window.location.href.indexOf("/eu/") > -1) {
                popupInfo = ' positibo 100.000 biztanleko';
                popupNoData = 'Ez dago positiborik.';
                title = 'Positiboak';
                titleParagraph = 'Euskadiko udalerriek duten 100.000 biztanleko positiboen tasa.';
            } else {
                popupInfo = ' positivos por 100.000 hab.';
                popupNoData = 'No hay positivos.';
                title = 'Positivos';
                titleParagraph = 'Tasa de positivos por 100.000 habitantes en cada municipio.';
            }


            let map2 = L.map('map2')
            L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map2)
            let geojson_url2;
            if (window.location.href.indexOf("/eu/") > -1) {
                geojson_url2 = "../maps/municipios_latlon.json";
            } else {
                geojson_url2 = "./maps/municipios_latlon.json";
            }
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
            var legend2 = L.control({ position: 'bottomright' });

            legend2.onAdd = function (map2) {

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
            legend2.addTo(map2);
            var geojsonLayer2;
            let addGeoLayer2 = (data) => {


                geojsonLayer2 = L.geoJson(data, {
                    onEachFeature: function (feature, layer) {
                        let objetoAFiltrar = dataJson.byDateByMunicipality[0].items;
                        let positivos = objetoAFiltrar.filter(element => '' + element.geoMunicipality.countyId + element.geoMunicipality.oid === '' + feature.properties.EUSTAT);

                        if (positivos.length !== 0) {
                            layer.bindPopup(feature.properties.NOMBRE_EUS + ': ' + positivos[0].positiveBy100ThousandPeopleRate + popupInfo);
                            layer.setStyle(style(positivos[0].positiveBy100ThousandPeopleRate));
                        } else {
                            layer.bindPopup(popupNoData);
                            layer.setStyle(style(0));
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
                this._div.innerHTML = '<h4>' + title + '</h4><p class="info_p">' + titleParagraph + '</p>';
            };
            info2.addTo(map2);
            fetch(
                geojson_url2
            ).then(
                res => res.json()
            ).then(
                data => addGeoLayer2(data)
            )
            document.getElementById("fechaActualizacionMapa").innerHTML += updated(dataJson.byDateByMunicipality[0].date); + '.';
        }
    });

}