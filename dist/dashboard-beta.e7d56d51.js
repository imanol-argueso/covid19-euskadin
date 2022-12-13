// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/dashboard-beta.js":[function(require,module,exports) {
/*import { DATAFILES } from './config';*/
const DATA_SOURCE = 'https://opendata.euskadi.eus/contenidos/ds_informes_estudios/covid_19_2020/opendata/generated';
DATAFILES = {
  EPIDEMICSTATUS: `${DATA_SOURCE}/covid19-epidemic-status.json`,
  PCR: `${DATA_SOURCE}/covid19-pcr.json`,
  DECEASEDPEOPLECOUNT: `${DATA_SOURCE}/covid19-deceasedPeopleCount.json`,
  BYAGE: `${DATA_SOURCE}/covid19-byage.json`,
  BYHEALTHZONE: `${DATA_SOURCE}/covid19-byhealthzone.json`,
  BYMUNICIPALITY: `${DATA_SOURCE}/covid19-bymunicipality.json`,
  BYHOSPITAL: `${DATA_SOURCE}/covid19-byhospital.json`
}; //import { getJSON } from './getData.js';

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
  let increment = today - yesterday;

  if (Math.floor(increment) !== increment) {
    increment = increment.toFixed(2);
  }

  ;
  return today + ' (' + format(increment) + ')';
}

function dashboardHospital(jsonData, jsonDataId) {
  let today = jsonData.byDate[jsonData.byDate.length - 1].totals[jsonDataId];
  let yesterday = jsonData.byDate[jsonData.byDate.length - 2].totals[jsonDataId];
  let increment = today - yesterday;

  if (Math.floor(increment) !== increment) {
    increment = increment.toFixed(2);
  }

  ;
  return today + ' (' + format(increment) + ')';
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

window.onload = function () {
  getJSON(DATAFILES.EPIDEMICSTATUS, function (err, dataJson) {
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      document.getElementById("fechaActualizacion").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date) + " (23:59)";
      document.getElementById("positivos").innerHTML = dashboard(dataJson, 'pcrPositiveCount');
      document.getElementById("actualizadoPositivos").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
      let todayPositives = dataJson.byDate[dataJson.byDate.length - 1].pcrPositiveCount;
      let yesterdayPositives = dataJson.byDate[dataJson.byDate.length - 2].pcrPositiveCount;
      let previousYesterdayPositives = dataJson.byDate[dataJson.byDate.length - 3].pcrPositiveCount;
      let todayTests = dataJson.byDate[dataJson.byDate.length - 1].pcrTestCount;
      let yesterdayTests = dataJson.byDate[dataJson.byDate.length - 2].pcrTestCount;
      let previousYesterdayTests = dataJson.byDate[dataJson.byDate.length - 3].pcrTestCount;
      let positivesRate = ((todayPositives - yesterdayPositives) / (todayTests - yesterdayTests) * 100).toFixed(2);
      let yesterdayPositivesRate = ((yesterdayPositives - previousYesterdayPositives) / (yesterdayTests - previousYesterdayTests) * 100).toFixed(2);
      document.getElementById("positivosRate").innerHTML = positivesRate + '% (' + format((positivesRate - yesterdayPositivesRate).toFixed(2)) + ')';
      document.getElementById("actualizadoPositivosRate").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
      document.getElementById("actualizadoR0").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
      document.getElementById("r0").innerHTML = dashboard(dataJson, 'r0');
      document.getElementById("tests").innerHTML = dashboard(dataJson, 'pcrTestCount');
      document.getElementById("actualizadoPcrTestCount").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
      document.getElementById("hospitalizadosUci").innerHTML = dashboard(dataJson, 'icuPeopleCount');
      document.getElementById("actualizadoicuPeopleCount").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
      document.getElementById("hospitalizaciones").innerHTML = dashboard(dataJson, 'hospitalAdmissionsWithPCRCount');
      document.getElementById("actualizadoHospitalizaciones").innerHTML += updated(dataJson.r0ByDate[dataJson.r0ByDate.length - 1].date);
      document.getElementById("positivosAraba").innerHTML = dashboard(dataJson, 'pcrPositiveCountAraba');
      document.getElementById("positivosBizkaia").innerHTML = dashboard(dataJson, 'pcrPositiveCountBizkaia');
      document.getElementById("positivosGipuzkoa").innerHTML = dashboard(dataJson, 'pcrPositiveCountGipuzkoa');
      google.charts.load('current', {
        'packages': ['line']
      });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', '');

        if (window.location.href.indexOf("/eu/") > -1) {
          data.addColumn('number', 'Biderkatze zenbakia (r0)');
          data.addColumn('number', 'Erreferentziazko R0');
        } else {
          data.addColumn('number', 'Número de Reproducción (r0)');
          data.addColumn('number', 'R0 de referencia');
        }

        for (let element of dataJson.byDate) {
          if (element.date > '2020-03-07T22:00:00Z') {
            data.addRow([new Date(element.date), element.r0, 1]);
          }
        }

        var options = {
          legend: {
            position: 'none'
          },
          hAxis: {
            format: 'd/M/yy'
          },
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
          data.addColumn('number', 'Egindako PCR testak');
        } else {
          data.addColumn('number', 'Test PCR realizados');
        }

        for (let element of dataJson.byDate) {
          data.addRow([new Date(element.date), element.pcrTestCount]);
        }

        var options = {
          legend: {
            position: 'none'
          },
          hAxis: {
            format: 'd/M/yy'
          },
          colors: ['#6c757d'],
          curveType: 'function',
          width: 297,
          height: 197
        };
        var chart2 = new google.charts.Line(document.getElementById('linechart_material_mini4'));
        chart2.draw(data, google.charts.Line.convertOptions(options));
      }

      google.charts.setOnLoadCallback(drawChart3);

      function drawChart3() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', '');

        if (window.location.href.indexOf("/eu/") > -1) {
          data.addColumn('number', 'Positiboen tasa (%)');
          data.addColumn('number', 'Errenferentziazko tasa = %5');
        } else {
          data.addColumn('number', 'Tasa de positivos (%)');
          data.addColumn('number', 'Tasa de referencia = 5%');
        }

        var positivesPcrRate = [];
        let previousPositives;
        let previousPcr;

        for (i = 0; i < dataJson.byDate.length; i++) {
          positivesPcrRate.push({
            date: dataJson.byDate[i].date,
            positives: dataJson.byDate[i].pcrPositiveCount,
            pcr: dataJson.byDate[i].pcrTestCount,
            rate: (dataJson.byDate[i].pcrPositiveCount - previousPositives) / (dataJson.byDate[i].pcrTestCount - previousPcr) * 100
          });
          previousPositives = dataJson.byDate[i].pcrPositiveCount;
          previousPcr = dataJson.byDate[i].pcrTestCount;
        }

        for (let element of positivesPcrRate) {
          if (element.date > '2020-04-25T22:00:00Z' && element.rate > 0) {
            data.addRow([new Date(element.date), element.rate, 5]);
          }
        }

        var options = {
          legend: {
            position: 'none'
          },
          hAxis: {
            format: 'd/M/yy'
          },
          colors: ['#6c757d'],
          curveType: 'function',
          width: 297,
          height: 197
        };
        var chart3 = new google.charts.Line(document.getElementById('linechart_material_mini7'));
        chart3.draw(data, google.charts.Line.convertOptions(options));
      }

      google.charts.setOnLoadCallback(drawChart4);

      function drawChart4() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', '');

        if (window.location.href.indexOf("/eu/") > -1) {
          data.addColumn('number', 'ZIUn ingresatutako pazienteak');
        } else {
          data.addColumn('number', 'Pacientes ingresados en UCI');
        }

        for (let element of dataJson.byDate) {
          if (element.date > '2020-04-25T22:00:00Z' && element.icuPeopleCount > 0) {
            data.addRow([new Date(element.date), element.icuPeopleCount]);
          }
        }

        var options = {
          legend: {
            position: 'none'
          },
          hAxis: {
            format: 'd/M/yy'
          },
          colors: ['#6c757d'],
          curveType: 'function',
          width: 297,
          height: 197
        };
        var chart4 = new google.charts.Line(document.getElementById('linechart_material_mini5'));
        chart4.draw(data, google.charts.Line.convertOptions(options));
        google.charts.setOnLoadCallback(drawChart5);

        function drawChart5() {
          var data = new google.visualization.DataTable();
          data.addColumn('date', '');

          if (window.location.href.indexOf("/eu/") > -1) {
            data.addColumn('number', 'Plantan ingresatutako pazienteak');
          } else {
            data.addColumn('number', 'Pacientes ingresados en Planta');
          }

          for (let element of dataJson.byDate) {
            if (element.date > '2020-10-03T22:00:00Z') {
              data.addRow([new Date(element.date), element.hospitalAdmissionsWithPCRCount]);
            }
          }

          var options = {
            legend: {
              position: 'none'
            },
            hAxis: {
              format: 'd/M/yy'
            },
            colors: ['#6c757d'],
            curveType: 'function',
            width: 297,
            height: 197
          };
          var chart5 = new google.charts.Line(document.getElementById('linechart_material_mini6'));
          chart5.draw(data, google.charts.Line.convertOptions(options));
        }
      }
    }
  });
  getJSON(DATAFILES.PCR, function (err, dataJson) {
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      google.charts.load('current', {
        'packages': ['line']
      });
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
          legend: {
            position: 'none'
          },
          hAxis: {
            format: 'd/M/yy'
          },
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
      google.charts.load('current', {
        'packages': ['line']
      });
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
          legend: {
            position: 'none'
          },
          hAxis: {
            format: 'd/M/yy'
          },
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

      for (let element of dataJson.newPositivesByMunicipalityByDate.positiveCountByMunicipalityByDate) {
        var lastpositives = 0;

        for (i = element.values.length - 14; i < element.values.length; i++) {
          lastpositives += element.values[i];
        }

        last14municipality.push({
          municipalityName: element.dimension.officialName,
          municipalityCode: '' + element.dimension.countyId + element.dimension.oid + '',
          positives: lastpositives
        });
      }

      let last14municipalityPositives = [];
      dataJson.newPositivesByDateByMunicipality[dataJson.newPositivesByDateByMunicipality.length - 1].items.forEach(element => {
        if (element.population !== 0) {
          let last14municipalityActive = last14municipality.filter(x => x.municipalityCode === '' + element.geoMunicipality.countyId + element.geoMunicipality.oid + '');
          last14municipalityPositives.push({
            municipalityName: last14municipalityActive[0].municipalityName,
            municipalityCode: last14municipalityActive[0].municipalityCode,
            positives: last14municipalityActive[0].positives,
            population: element.population,
            rate: (last14municipalityActive[0].positives * (100000 / element.population)).toFixed(0)
          });
        }
      });
      var popupInfo;
      var popupNoData;
      var title;
      var titleParagraph;

      if (window.location.href.indexOf("/eu/") > -1) {
        popupInfo = ' positibo azken 14 egunotan. Populazioa: ';
        popupNoData = 'Ez dago positiborik.';
        title = 'Covid-19aren udalerrien semaforoa';
        titleParagraph = 'Intzidentzia tasa metatua 100.000 biztanleko azken 14 egunotan.';
      } else {
        popupInfo = ' positivos por 100.000 habitantes. Población: ';
        popupNoData = 'No hay positivos.';
        title = 'Semáforo del Covid-19 por municipios';
        titleParagraph = 'Tasa de incidencia por 100.000 habitantes acumulada en 14 días.';
      }

      let map2 = L.map('map2');
      L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map2);
      let geojson_url2;

      if (window.location.href.indexOf("/eu/") > -1) {
        geojson_url2 = "../maps/municipios_latlon.json";
      } else {
        geojson_url2 = "./maps/municipios_latlon.json";
      }

      function getColor(d) {
        return d > 149 ? '#800026' : d > 99 ? '#fcb13e' : d > 59 ? '#f9fc3e' : d > 0 ? '#11f017' : '#11f017';
      }

      function style(dataValue) {
        return {
          fillColor: getColor(dataValue),
          weight: 1,
          dashArray: '3',
          fillOpacity: 0.7
        };
      } //Leyenda con los rangos


      var legend2 = L.control({
        position: 'bottomright'
      });

      legend2.onAdd = function (map2) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 60, 100, 150],
            labels = [];

        for (var i = 0; i < grades.length; i++) {
          div.innerHTML += '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
      };

      legend2.addTo(map2);
      var geojsonLayer2;

      let addGeoLayer2 = data => {
        geojsonLayer2 = L.geoJson(data, {
          onEachFeature: function (feature, layer) {
            let positivos = last14municipalityPositives.filter(element => element.municipalityCode === feature.properties.EUSTAT);
            console.log(positivos);

            if (positivos.length !== 0) {
              layer.bindPopup(feature.properties.NOMBRE_EUS + ': ' + positivos[0].rate + popupInfo + positivos[0].population);
              layer.setStyle(style(positivos[0].rate));
            } else {
              layer.bindPopup(popupNoData);
              layer.setStyle(style(0));
            }
          }
        }).addTo(map2);
        map2.fitBounds(geojsonLayer2.getBounds());
      }; //Añadimos la capa de info


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
      fetch(geojson_url2).then(res => res.json()).then(data => addGeoLayer2(data));
      document.getElementById("fechaActualizacionMapa").innerHTML += updated(dataJson.newPositivesByMunicipalityByDate.positiveCountByMunicipalityByDate[0].byDate[dataJson.newPositivesByMunicipalityByDate.positiveCountByMunicipalityByDate[0].byDate.length - 1].date);
      +'.';
    }
  });
};
},{}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52992" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/dashboard-beta.js"], null)
//# sourceMappingURL=/dashboard-beta.e7d56d51.js.map