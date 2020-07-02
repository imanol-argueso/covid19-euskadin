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
    getJSON(DATAFILES.BYHEALTHZONE, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawSeriesChart);

            function drawSeriesChart() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('string', 'Osasun eremua');
                    data.addColumn('number', 'Positiboen tasa');
                    data.addColumn('number', 'Hilgarritasuna');
                    data.addColumn('number', 'Biztanleak (TISak guztira)');
                    var options = {
                        title: 'Euskadiko osasun eremuen positibo (100.000 biztanleko tasa) eta hilgarritasunaren arteko korrelazioa. Hilgarritsaun handiena (>13%) duten osasun eremuak bakarrik erakusten dira.',
                        hAxis: { title: 'Positiboak (100.000 biztanleko tasa)' },
                        vAxis: { title: 'Hilgarritasuna' },
                        bubble: { textStyle: { fontSize: 11 } }
                    };
                } else {
                    data.addColumn('string', 'Zona de salud');
                    data.addColumn('number', 'Tasa de positivos');
                    data.addColumn('number', 'Letalidad');
                    data.addColumn('number', 'Poblacion (Total de TIS)');
                    var options = {
                        title: 'Correlación entre positivos (tasa por 100.000 hab.) y letalidad en las zonas de salud de Euskadi. Se muestran tan solo las zonas de salud con mayor letalidad (> 13%).',
                        hAxis: { title: 'Positivos (tasa por 100.000 hab.)' },
                        vAxis: { title: 'Letalidad' },
                        bubble: { textStyle: { fontSize: 11 } }
                    };
                }
                for (let element of dataJson.dataByDateByHealthZone[0].items) {
                    if (element.mortalityRate > 13) {
                        data.addRow([element.healthZone.name, element.positiveBy100ThousandPeopleRate, element.mortalityRate, element.tisCount]);
                    }
                }
                var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div3'));
                chart.draw(data, options);
            }
            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);
            function drawTable() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('string', 'Osasun eremua');
                    data.addColumn('number', 'TISak guztira');
                    data.addColumn('number', 'Positiboak');
                    data.addColumn('number', 'Positiboen tasa 100.000 biz.');
                    data.addColumn('number', 'Hildakoak');
                    data.addColumn('number', 'Hilgarritasuna');
                } else {
                    data.addColumn('string', 'Zona de salud');
                    data.addColumn('number', 'Total TIS');
                    data.addColumn('number', 'Positivos');
                    data.addColumn('number', 'Tasa de positivos 100.000 hab.');
                    data.addColumn('number', 'Fallecidos');
                    data.addColumn('number', 'Letalidad');
                }
                for (let element of dataJson.dataByDateByHealthZone[0].items) {
                    data.addRow([element.healthZone.name, element.tisCount, element.totalPositiveCount, element.positiveBy100ThousandPeopleRate, element.totalDeceasedCount, element.mortalityRate]);
                }
                var table = new google.visualization.Table(document.getElementById('table_div10'));
                table.draw(data, { showRowNumber: true, sortColumn: 2, sortAscending: false, width: '100%', height: 'auto' });
            }

        }
    });
}