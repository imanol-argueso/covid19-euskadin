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

    getJSON(DATAFILES.BYAGE, function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            google.charts.load('current', { 'packages': ['bar'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('string', 'Adina');
                    data.addColumn('number', 'Gizonezkoak');
                    data.addColumn('number', 'Emakumezkoak');
                    var options = {
                        chart: {
                            title: 'Positiboak sexuaren eta adinaren arabera',
                            subtitle: '100.000 biztanleko positiboen tasa, sexuaren eta adin tartearen arabera.',
                        }
                    };
                } else {
                    data.addColumn('string', 'Edad');
                    data.addColumn('number', 'Hombres');
                    data.addColumn('number', 'Mujeres');
                    var options = {
                        chart: {
                            title: 'Positivos por sexo y rango de edad',
                            subtitle: 'Tasa de positivos por 100.000 habitantes en función del sexo y del rango de edad.',
                        }
                    };
                }
                for (let element of dataJson.byAgeRange) {
                    if (element.ageRange !== 'No consta') {
                        data.addRow([element.ageRange + ' años', element.positivesByMenPopulationRate, element.positivesByWomenPopulationRate]);
                    }
                }
                var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
                chart.draw(data, google.charts.Bar.convertOptions(options));
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('string', 'Adina');
                    data.addColumn('number', 'Gizonezkoak');
                    data.addColumn('number', 'Emakumezkoak');
                    var options = {
                        chart: {
                            title: 'Hilgarritasuna sexuaren eta adinaren arabera',
                            subtitle: 'Gaixotasunaren hilgarritasuna sexuaren eta adin tartearen arabera.',
                        }
                    };
                } else {
                    data.addColumn('string', 'Edad');
                    data.addColumn('number', 'Hombres');
                    data.addColumn('number', 'Mujeres');
                    var options = {
                        chart: {
                            title: 'Letalidad por sexo y rango de edad',
                            subtitle: 'Letalidad de la enfermedad en función del sexo y del rango de edad.',
                        }
                    };
                }

                for (let element of dataJson.byAgeRange) {
                    if (element.ageRange !== 'No consta') {
                        data.addRow([element.ageRange + ' años', element.lethalityMenRate, element.lethalityWomenRate]);
                    }
                }
                var chart = new google.charts.Bar(document.getElementById('columnchart_material2'));
                chart.draw(data, google.charts.Bar.convertOptions(options));
            }

            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);
            function drawTable() {
                var data = new google.visualization.DataTable();
                if (window.location.href.indexOf("/eu/") > -1) {
                    data.addColumn('string', 'Adin tartea');
                    data.addColumn('number', 'Populazioa');
                    data.addColumn('number', 'Gizonezkoak: postibo tasa');
                    data.addColumn('number', 'Emakumezkoak: positibo tasa');
                    data.addColumn('number', 'Gizonezkoak: hilgarritasuna');
                    data.addColumn('number', 'Emakumezkoak: hilgarritasuna');
                } else {
                    data.addColumn('string', 'Rango de edad');
                    data.addColumn('number', 'Poblacion');
                    data.addColumn('number', 'Hombres: Tasa de positivos');
                    data.addColumn('number', 'Mujeres: Tasa de positivos');
                    data.addColumn('number', 'Hombres: Letalidad');
                    data.addColumn('number', 'Mujeres: Letalidad');
                }
                for (let element of dataJson.byAgeRange) {
                    if (element.ageRange !== 'No consta') {
                        data.addRow([element.ageRange, element.population, element.positivesByMenPopulationRate, element.positivesByWomenPopulationRate, element.lethalityMenRate, element.lethalityWomenRate,]);
                    }
                }
                var table = new google.visualization.Table(document.getElementById('table_div7'));
                table.draw(data, { sortColumn: 0, sortAscending: true, width: '100%', height: 'auto' });

            }
        }
    });
}