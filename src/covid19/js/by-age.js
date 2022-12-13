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
    BYAGENEWPOSITIVES: `${DATA_SOURCE}/covid19-pcr-positives.json`
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
    let formattedlastdate = (lastdate.getDate() - 1) + "/" + (lastdate.getMonth() + 1) + "/" + lastdate.getFullYear();
    return formattedlastdate;
}
window.onload = function () {

    getJSON(DATAFILES.BYAGENEWPOSITIVES, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            document.getElementById("fechaActualizacion").innerHTML += updated(dataJson.lastUpdateDate);

            let ages = ['0_2', '3_5', '6_12', '13_16', '17_18', '0_9', '10_19', '20_29', '30_39', '40_49', '50_59', '60_69', '70_79', '80_89', '90_X']
            let dataByWeek = [];
            for (let element of ages) {
                this['accElementAge_' + element + '_Count'] = 0;
            }
            for (let element of dataJson.byDate) {
                const dateDay = new Date(element.date);
                for (let item of ages) {
                    this['accElementAge_' + item + '_Count'] = this['accElementAge_' + item + '_Count'] + element['age_' + item + '_Count'];
                }
                if (dateDay.getDay() === 6) {
                    dataByWeek.push({
                        'day': element.date,
                        'dataWeekly0_2': accElementAge_0_2_Count,
                        'dataWeekly3_5': accElementAge_3_5_Count,
                        'dataWeekly6_12': accElementAge_6_12_Count,
                        'dataWeekly13_16': accElementAge_13_16_Count,
                        'dataWeekly17_18': accElementAge_17_18_Count,
                        'dataWeekly0_9': accElementAge_0_9_Count,
                        'dataWeekly10_19': accElementAge_10_19_Count,
                        'dataWeekly20_29': accElementAge_20_29_Count,
                        'dataWeekly30_39': accElementAge_30_39_Count,
                        'dataWeekly40_49': accElementAge_40_49_Count,
                        'dataWeekly50_59': accElementAge_50_59_Count,
                        'dataWeekly60_69': accElementAge_60_69_Count,
                        'dataWeekly70_79': accElementAge_70_79_Count,
                        'dataWeekly80_89': accElementAge_80_89_Count,
                        'dataWeekly90_X': accElementAge_90_X_Count
                    });
                    for (let item of ages) {
                        this['accElementAge_' + item + '_Count'] = 0;
                    }
                }
            }
            google.charts.load('current', { 'packages': ['line'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('date', 'Data');
                    data.addColumn('number', '0-19 urte');
                    data.addColumn('number', '20-39 urte');
                    data.addColumn('number', '40-59 urte');
                    data.addColumn('number', '60-79 urte');
                    data.addColumn('number', '80 urtetik gora');
                    var options = {
                        chart: {
                            title: 'Kasu positibo berriak adinaren arabera',
                            subtitle: 'Kasu positibo berrien banaketa adin-tartearen arabera termino absolutuetan Euskal Autonomia Erkidegoan.',
                        },
                        hAxis: { format: 'yy/M/d' },
                        width: 900,
                        height: 500,
                        curveType: 'function',
                    };
                } else {
                    data.addColumn('date', 'Fecha');
                    data.addColumn('number', '0-19 años');
                    data.addColumn('number', '20-39 años');
                    data.addColumn('number', '40-59 años');
                    data.addColumn('number', '60-79 años');
                    data.addColumn('number', 'Más de 80 años');
                    var options = {
                        chart: {
                            title: 'Casos positivos nuevos por edad',
                            subtitle: 'Distribución de los nuevos casos positivos en términos absolutos según grupos de edad en la Comunidad Autónoma de Euskadi.',
                        },
                        hAxis: { format: 'd/M/yy' },
                        width: 900,
                        height: 500,
                        curveType: 'function'
                    };
                }
                for (let element of dataByWeek) {
                    data.addRow([new Date(element.day), element.dataWeekly0_9 + element.dataWeekly10_19, element.dataWeekly20_29 + element.dataWeekly30_39, element.dataWeekly40_49 + element.dataWeekly50_59, element.dataWeekly60_69 + element.dataWeekly70_79, element.dataWeekly80_89 + element.dataWeekly90_X]);
                }

                var chart = new google.charts.Line(document.getElementById('linechart_material9'));
                chart.draw(data, google.charts.Line.convertOptions(options));

                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('date', 'Data');
                    data.addColumn('number', '0-2 urte');
                    data.addColumn('number', '3-5 urte');
                    data.addColumn('number', '6-12 urte');
                    data.addColumn('number', '13-16 urte');
                    data.addColumn('number', '17-18 urte');
                    var options = {
                        chart: {
                            title: 'Kasu positibo berriak adin txikien artean',
                            subtitle: 'Kasu positibo berrien banaketa adin txikien artean termino absolutuetan Euskal Autonomia Erkidegoan.',
                        },
                        hAxis: { format: 'yy/M/d' },
                        width: 900,
                        height: 500,
                        curveType: 'function',

                    };
                } else {
                    data.addColumn('date', 'Fecha');
                    data.addColumn('number', '0-2 años');
                    data.addColumn('number', '3-5 años');
                    data.addColumn('number', '6-12 años');
                    data.addColumn('number', '13-16 años');
                    data.addColumn('number', '17-18 años');
                    var options = {
                        chart: {
                            title: 'Casos positivos nuevos entre los menores de edad',
                            subtitle: 'Distribución de los nuevos casos positivos en términos absolutos entre los menores de edad en la Comunidad Autónoma de Euskadi.',
                        },
                        hAxis: { format: 'd/M/yy' },
                        width: 900,
                        height: 500,
                        curveType: 'function'
                    };
                }
                for (let element of dataByWeek) {
                    if (element.day > '2020-07-12T22:00:00Z') {
                        data.addRow([new Date(element.day), element.dataWeekly0_2, element.dataWeekly3_5, element.dataWeekly6_12, element.dataWeekly13_16, element.dataWeekly17_18]);
                    }
                }

                var chart = new google.charts.Line(document.getElementById('linechart_material10'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            };
        }
    });

    getJSON(DATAFILES.BYAGE, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {

            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawSeriesChart);

            function drawSeriesChart() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('string', 'ID');
                    data.addColumn('number', 'Positiboak');
                    data.addColumn('number', 'Hildakoak');
                    data.addColumn('number', 'Populazioa');
                    var options = {
                        title: 'Adin tartearen araberako positibo kopurua eta hildakoen arteko korrelazioa.',
                        hAxis: { title: 'Positiboak' },
                        vAxis: { title: 'Hildakoak' },
                        bubble: { textStyle: { fontSize: 11 } }
                    };
                } else {
                    data.addColumn('string', 'ID');
                    data.addColumn('number', 'Positivos');
                    data.addColumn('number', 'Fallecidos');
                    data.addColumn('number', 'Poblacion');
                    var options = {
                        title: 'Correlación entre el número de positivos y el de fallecidos por rango de edad.',
                        hAxis: { title: 'Positivos' },
                        vAxis: { title: 'Fallecidos' },
                        bubble: { textStyle: { fontSize: 11 } }
                    };
                }
                for (let element of dataJson.byAgeRange) {
                    if (element.ageRange !== 'No consta') {
                        data.addRow([element.ageRange, element.positiveCount, element.deceasedCount, element.population]);
                    }
                }
                var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
                chart.draw(data, options);
            }
            google.charts.load('current', { 'packages': ['bar'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('string', 'Adin tartea');
                    data.addColumn('number', 'Positiboak');
                    data.addColumn('number', 'Hildakoak');
                    var options = {
                        chart: {
                            title: 'Adin tartearen araberako positiboak eta hildakoak.',
                            subtitle: 'Aurreko grafikoan erakutsitako datu berdinak ematen dira, beste modu batera irudikatuta.',
                        },
                        bars: 'horizontal' // Required for Material Bar Charts.
                    };
                } else {
                    data.addColumn('string', 'Rango de edad');
                    data.addColumn('number', 'Positivos');
                    data.addColumn('number', 'Fallecidos');
                    var options = {
                        chart: {
                            title: 'Número de positivos y de fallecidos por rango de edad',
                            subtitle: 'Se muestran los mismos datos representados en otro gráfico.',
                        },
                        bars: 'horizontal' // Required for Material Bar Charts.
                    };
                }
                for (let element of dataJson.byAgeRange) {
                    if (element.ageRange !== 'No consta') {
                        data.addRow([element.ageRange + ' años', element.positiveCount, element.deceasedCount]);
                    }
                }
                var chart = new google.charts.Bar(document.getElementById('barchart_material6'));
                chart.draw(data, google.charts.Bar.convertOptions(options));
            }


            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);
            function drawTable() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('string', 'Adin tartea');
                    data.addColumn('number', 'Populazioa');
                    data.addColumn('number', 'Positiboak guztira');
                    data.addColumn('number', 'Kasu guztietatik positiboen ehunekoa');
                    data.addColumn('number', 'Hildakoak guztira');
                    data.addColumn('number', 'Hilgarritasuna');
                } else {
                    data.addColumn('string', 'Rango de edad');
                    data.addColumn('number', 'Poblacion');
                    data.addColumn('number', 'Total de positivos');
                    data.addColumn('number', '% de positivos sobre el total de casos');
                    data.addColumn('number', 'Total fallecidos');
                    data.addColumn('number', 'Letalidad');
                }
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