import { getJSON } from '../getData.js';

window.onload = function () {

    getJSON('https://opendata.euskadi.eus/contenidos/ds_informes_estudios/covid_19_2020/opendata/generated/covid19-byage.json', function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            google.charts.load('current', { 'packages': ['bar'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();

                data.addColumn('string', 'Edad');
                data.addColumn('number', 'Hombres');
                data.addColumn('number', 'Mujeres');
                for (let element of dataJson.byAgeRange) {
                    if (element.ageRange !== 'No consta') {
                        data.addRow([element.ageRange + ' años', element.positivesByMenPopulationRate, element.positivesByWomenPopulationRate]);
                    }
                }

                var options = {
                    chart: {
                        title: 'Positivos por sexo y rango de edad',
                        subtitle: 'Tasa de positivos por 100.000 habitantes en función del sexo y del rango de edad.',
                    }
                };

                var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

                chart.draw(data, google.charts.Bar.convertOptions(options));

                var data = new google.visualization.DataTable();

                data.addColumn('string', 'Edad');
                data.addColumn('number', 'Hombres');
                data.addColumn('number', 'Mujeres');
                for (let element of dataJson.byAgeRange) {
                    if (element.ageRange !== 'No consta') {
                        data.addRow([element.ageRange + ' años', element.lethalityMenRate, element.lethalityWomenRate]);
                    }
                }

                var options = {
                    chart: {
                        title: 'Letalidad por sexo y rango de edad',
                        subtitle: 'Letalidad de la enfermedad en función del sexo y del rango de edad.',
                    }
                };

                var chart = new google.charts.Bar(document.getElementById('columnchart_material2'));

                chart.draw(data, google.charts.Bar.convertOptions(options));
            }

            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);
            function drawTable() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Rango de edad');
                data.addColumn('number', 'Poblacion');
                data.addColumn('number', 'Hombres: Tasa de positivos');
                data.addColumn('number', 'Mujeres: Tasa de positivos');
                data.addColumn('number', 'Hombres: Letalidad');
                data.addColumn('number', 'Mujeres: Letalidad');


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