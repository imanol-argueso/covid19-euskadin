/*import { DATAFILES } from './config';*/
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

function dashboardHospital(jsonData, jsonDataId) {
    let today = jsonData.byDate[jsonData.byDate.length - 1].totals[jsonDataId];
    let yesterday = jsonData.byDate[jsonData.byDate.length - 2].totals[jsonDataId];
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
getJSON(DATAFILES.DECEASEDPEOPLECOUNT, function (err, dataJson) {
    if (err != null) {
        alert('Something went wrong: ' + err);
    } else {
        document.getElementById("actualizadoFallecidos").innerHTML += updated(dataJson.byDate[dataJson.byDate.length - 1].date);
        document.getElementById("fallecidos").innerHTML = dashboard(dataJson, 'deceasedCount');
    }
});
getJSON(DATAFILES.BYHOSPITAL, function (err, dataJson) {
    if (err != null) {
        alert('Something went wrong: ' + err);
    } else {
        document.getElementById("actualizadoicuPeopleCount").innerHTML += updated(dataJson.byDate[dataJson.byDate.length - 1].date);
        document.getElementById("actualizadohospitalReleasedCount").innerHTML += updated(dataJson.byDate[dataJson.byDate.length - 1].date);
        document.getElementById("hospitalizaciones").innerHTML = dashboardHospital(dataJson, 'floorPeopleCount');
        document.getElementById("hospitalizadosUci").innerHTML = dashboardHospital(dataJson, 'icuPeopleCount');

        google.charts.load('current', { 'packages': ['line'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = new google.visualization.DataTable();
            data.addColumn('date', '');
            if (window.location.href.indexOf("/eu/") > -1) {
                data.addColumn('number', 'ZIUn ingresatutakoak');
            } else {
                data.addColumn('number', 'Ingresados en UCI');
            }
            for (let element of dataJson.byDate) {
                //if (element.date > '2020-03-07T22:00:00Z') {
                data.addRow([new Date(element.date), element.totals.icuPeopleCount]);
                //}
            }
            var options = {
                legend: { position: 'none' },
                hAxis: { format: 'M/d/yy' },
                colors: ['#6c757d'],
                curveType: 'function',
                width: 297,
                height: 197
            };
            var chart = new google.charts.Line(document.getElementById('linechart_material_mini5'));
            chart.draw(data, google.charts.Line.convertOptions(options));
        }

        google.charts.setOnLoadCallback(drawChart2);

        function drawChart2() {

            var data = new google.visualization.DataTable();
            data.addColumn('date', '');
            if (window.location.href.indexOf("/eu/") > -1) {
                data.addColumn('number', 'Plantan ingresatutakoak');
            } else {
                data.addColumn('number', 'Ingresados en planta con PCR positivo');
            }
            for (let element of dataJson.byDate) {
                //if (element.date > '2020-03-07T22:00:00Z') {
                data.addRow([new Date(element.date), element.totals.floorPeopleCount]);
                //}
            }
            var options = {
                legend: { position: 'none' },
                hAxis: { format: 'M/d/yy' },
                colors: ['#6c757d'],
                curveType: 'function',
                width: 297,
                height: 197
            };
            var chart2 = new google.charts.Line(document.getElementById('linechart_material_mini6'));
            chart2.draw(data, google.charts.Line.convertOptions(options));
        }

    }
});
window.onload = function () {
    getJSON(DATAFILES.EPIDEMICSTATUS, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            document.getElementById("fechaActualizacion").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date) + " (23:00)";
            document.getElementById("positivos").innerHTML = dashboard(dataJson, 'pcrPositiveCount');
            document.getElementById("actualizadoPositivos").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
            document.getElementById("actualizadoR0").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
            document.getElementById("r0").innerHTML = dashboard(dataJson, 'r0');
            document.getElementById("tests").innerHTML = dashboard(dataJson, 'pcrTestCount');
            document.getElementById("actualizadoPcrTestCount").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
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

            google.charts.setOnLoadCallback(drawChart2);

            function drawChart2() {

                var data = new google.visualization.DataTable();
                data.addColumn('date', '');
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('number', 'Test PCR realizados en total');
                } else {
                    data.addColumn('number', 'Guztira egindako PCR testk');
                }
                for (let element of dataJson.byDate) {
                    //if (element.date > '2020-03-07T22:00:00Z') {
                    data.addRow([new Date(element.date), element.pcrTestCount]);
                    //}
                }
                var options = {
                    legend: { position: 'none' },
                    hAxis: { format: 'M/d/yy' },
                    colors: ['#6c757d'],
                    curveType: 'function',
                    width: 297,
                    height: 197
                };
                var chart2 = new google.charts.Line(document.getElementById('linechart_material_mini4'));
                chart2.draw(data, google.charts.Line.convertOptions(options));
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
            var last14municipality = [];
            //var y = 0;
            for (let element of dataJson.newPositivesByMunicipalityByDate.positiveCountByMunicipalityByDate) {
                //y = y + 1;
                var lastpositives = 0;
                for (i = element.values.length - 14; i < element.values.length; i++) {
                    lastpositives += element.values[i];
                }
                last14municipality.push({ municipalityName: element.dimension.officialName, municipalityCode: '' + element.dimension.countyId + element.dimension.oid + '', positives: lastpositives });
            }
            //console.log(last14municipality);
            var popupInfo;
            var popupNoData;
            var title;
            var titleParagraph;
            if (window.location.href.indexOf("/eu/") > -1) {
                popupInfo = ' positibo azken 14 egunotan';
                popupNoData = 'Ez dago positiborik.';
                title = 'Positiboak';
                titleParagraph = 'Azken 14 egunotan positiboak izandako Euskadiko udalerriak.';
            } else {
                popupInfo = ' positivos en los últimos 14 días';
                popupNoData = 'No hay positivos.';
                title = 'Positivos';
                titleParagraph = 'Municipios que han tenido positivos en los últimos 14 días.';
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
                return d > 110 ? '#800026' :
                    d > 90 ? '#BD0026' :
                        d > 70 ? '#E31A1C' :
                            d > 50 ? '#FC4E2A' :
                                d > 30 ? '#FD8D3C' :
                                    d > 20 ? '#FEB24C' :
                                        d > 10 ? '#FED976' :
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
                    grades = [0, 10, 20, 30, 50, 70, 90, 110],
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
                        let positivos = last14municipality.filter(element => element.municipalityCode === feature.properties.EUSTAT);
                        if (positivos.length !== 0) {
                            layer.bindPopup(feature.properties.NOMBRE_EUS + ': ' + positivos[0].positives + popupInfo);
                            layer.setStyle(style(positivos[0].positives));
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
            document.getElementById("fechaActualizacionMapa").innerHTML += updated(dataJson.newPositivesByMunicipalityByDate.positiveCountByMunicipalityByDate[0].byDate[dataJson.newPositivesByMunicipalityByDate.positiveCountByMunicipalityByDate[0].byDate.length - 1].date); + '.';
        }
    });

}