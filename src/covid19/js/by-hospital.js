//import { DATAFILES } from './config';
//const DATAFILES = require('./config');
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
//const getJSON = require('./getData');
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
    getJSON(DATAFILES.EPIDEMICSTATUS, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            document.getElementById("fechaActualizacion").innerHTML += updated(dataJson.byDate[dataJson.byDate.length - 1].date);

            google.charts.load('current', { 'packages': ['line'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('date', 'Data');
                    data.addColumn('number', 'Plantan ingresatutako pazienteak');
                    data.addColumn('number', 'ZIUn ingresatutako pazienteak');
                    var options = {
                        chart: {
                            title: 'Osakidetzako ospitaleetako egoera orokorra',
                            subtitle: 'Plantan eta ZIUn ingresatutako pazienteen bilakaera.',
                        },
                        hAxis: { format: 'yy/M/d' },
                        width: 900,
                        height: 500
                    };
                } else {
                    data.addColumn('date', 'Fecha');
                    data.addColumn('number', 'Pacientes ingresados en Planta');
                    data.addColumn('number', 'Pacientes ingresados en UCI');
                    var options = {
                        chart: {
                            title: 'Situación global en los hospitales de Osakidetza (Servicio Vasco de Salud)',
                            subtitle: 'Evolución de los pacientes ingresados en planta y UCI.',
                        },
                        hAxis: { format: 'd/M/yy' },
                        width: 900,
                        height: 500
                    };
                }

                for (let element of dataJson.byDate) {
                    if (element.date > '2020-10-03T22:00:00Z') {
                        data.addRow([new Date(element.date), element.hospitalAdmissionsWithPCRCount, element.icuPeopleCount]);
                    }
                }
                var chart = new google.charts.Line(document.getElementById('linechart_material8'));
                chart.draw(data, google.charts.Line.convertOptions(options));

            }
            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);
            function drawTable() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('date', 'Data');
                    data.addColumn('number', 'Plantan ingresatuta');
                    data.addColumn('number', 'ZIUn ingresatuta');
                    var monthYearFormatter = new google.visualization.DateFormat({
                        pattern: "yyy-MM-dd"
                    });
                } else {
                    data.addColumn('date', 'Fecha');
                    data.addColumn('number', 'Ingresados en planta');
                    data.addColumn('number', 'Ingresados en UCI');
                    var monthYearFormatter = new google.visualization.DateFormat({
                        pattern: "dd-MM-yyy"
                    });
                }

                for (let element of dataJson.byDate) {
                    if (element.date > '2020-04-25T22:00:00Z') {
                        data.addRow([new Date(element.date), element.hospitalAdmissionsWithPCRCount, element.icuPeopleCount]);
                    }
                }
                monthYearFormatter.format(data, 0);
                var table = new google.visualization.Table(document.getElementById('table_div'));
                table.draw(data, { showRowNumber: true, sortColumn: 0, sortAscending: false, width: '100%', height: '100%' });

            }
        }
    });
    getJSON(DATAFILES.BYHOSPITAL, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            document.getElementById("fechaActualizacionHospitales").innerHTML += updated(dataJson.byDate[dataJson.byDate.length - 1].date);
            /*
                        google.charts.load('current', { 'packages': ['line'] });
                        google.charts.setOnLoadCallback(drawChart);
            
                        function drawChart() {
            
                            var data = new google.visualization.DataTable();
                            if (window.location.href.indexOf("/eu/") > -1) {
                                data.addColumn('date', 'Data');
                                data.addColumn('number', 'Plantan ingresatutako pazienteak');
                                data.addColumn('number', 'ZIUn ingresatutako pazienteak');
                                data.addColumn('number', 'Osakidetzako ospitaletan hildakoak');
                                var options = {
                                    chart: {
                                        title: 'Osakidetzako ospitaleetako egoera orokorra',
                                        subtitle: 'Plantan eta ZIUn ingresatutako paziente eta hildakoen bilakaera.',
                                    },
                                    hAxis: { format: 'yy/M/d' },
                                    width: 900,
                                    height: 500
                                };
                            } else {
                                data.addColumn('date', 'Fecha');
                                data.addColumn('number', 'Pacientes ingresados en Planta');
                                data.addColumn('number', 'Pacientes ingresados en UCI');
                                data.addColumn('number', 'Fallecidos en hospitales de Osakidetza');
                                var options = {
                                    chart: {
                                        title: 'Situación global en los hospitales de Osakidetza (Servicio Vasco de Salud)',
                                        subtitle: 'Evolución de los pacientes ingresados en planta y UCI, así como de los fallecidos.',
                                    },
                                    hAxis: { format: 'd/M/yy' },
                                    width: 900,
                                    height: 500
                                };
                            }
            
                            for (let element of dataJson.byDate) {
                                data.addRow([new Date(element.date), element.totals.floorPeopleCount, element.totals.icuPeopleCount, element.totals.deceasedPeopleCount]);
                            }
                            var chart = new google.charts.Line(document.getElementById('linechart_material8'));
                            chart.draw(data, google.charts.Line.convertOptions(options));
            
                        }
            */
            google.charts.load('current', { 'packages': ['bar'] });
            google.charts.setOnLoadCallback(drawStuff);

            function drawStuff() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('string', 'Ospitaleak');
                    data.addColumn('number', 'Plantan ingresatuta');
                    data.addColumn('number', 'ZIUn ingresatuta');
                    for (let element of dataJson.byDate[dataJson.byDate.length - 1].byHospital) {
                        data.addRow([element.hospital, element.floorPeopleCount, element.icuPeopleCount]);
                    }
                    var options = {
                        width: 800,
                        chart: {
                            title: 'Osakidetzako ospitale bakoitzaren egoera',
                            subtitle: 'Osakidetzako ospitale bakoitzean ZIUn eta plantan ingresatutako pazienteen egoera'
                        },
                        bars: 'horizontal',
                        series: {
                            0: { axis: 'Plantan ingresatuta' },
                            1: { axis: 'ZIUn ingresatuta' }
                        },
                        axes: {
                            x: {
                                distance: { label: 'Pazienteak' }, // Bottom x-axis.
                                brightness: { side: 'top', label: 'apparent magnitude' } // Top x-axis.
                            }
                        }
                    };
                } else {
                    data.addColumn('string', 'Hospitales');
                    data.addColumn('number', 'Ingresados planta');
                    data.addColumn('number', 'Ingresados UCI');
                    for (let element of dataJson.byDate[dataJson.byDate.length - 1].byHospital) {
                        data.addRow([element.hospital, element.floorPeopleCount, element.icuPeopleCount]);
                    }
                    var options = {
                        width: 800,
                        chart: {
                            title: 'Situación en cada uno de los hospitales de Osakidetza',
                            subtitle: 'Pacientes ingresados en planta y en UCI en cada uno de los hospitales de Osakidetza (Servicio Vasco de Salud)'
                        },
                        bars: 'horizontal',
                        series: {
                            0: { axis: 'Ingresados en planta' },
                            1: { axis: 'Ingresados en UCI' }
                        },
                        axes: {
                            x: {
                                distance: { label: 'Pacientes' }, // Bottom x-axis.
                                brightness: { side: 'top', label: 'apparent magnitude' } // Top x-axis.
                            }
                        }
                    };
                }
                var chart = new google.charts.Bar(document.getElementById('barchart_material'));
                chart.draw(data, options);
            };
        }
    });
}