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
})({"js/by-age.js":[function(require,module,exports) {
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

function updated(jsonData) {
  let lastdate = new Date(jsonData);
  let formattedlastdate = lastdate.getDate() - 1 + "/" + (lastdate.getMonth() + 1) + "/" + lastdate.getFullYear();
  return formattedlastdate;
}

window.onload = function () {
  getJSON(DATAFILES.BYAGENEWPOSITIVES, function (err, dataJson) {
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      document.getElementById("fechaActualizacion").innerHTML += updated(dataJson.lastUpdateDate);
      let ages = ['0_2', '3_5', '6_12', '13_16', '17_18', '0_9', '10_19', '20_29', '30_39', '40_49', '50_59', '60_69', '70_79', '80_89', '90_X'];
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

      google.charts.load('current', {
        'packages': ['line']
      });
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
              subtitle: 'Kasu positibo berrien banaketa adin-tartearen arabera termino absolutuetan Euskal Autonomia Erkidegoan.'
            },
            hAxis: {
              format: 'yy/M/d'
            },
            width: 900,
            height: 500,
            curveType: 'function'
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
              subtitle: 'Distribución de los nuevos casos positivos en términos absolutos según grupos de edad en la Comunidad Autónoma de Euskadi.'
            },
            hAxis: {
              format: 'd/M/yy'
            },
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
              subtitle: 'Kasu positibo berrien banaketa adin txikien artean termino absolutuetan Euskal Autonomia Erkidegoan.'
            },
            hAxis: {
              format: 'yy/M/d'
            },
            width: 900,
            height: 500,
            curveType: 'function'
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
              subtitle: 'Distribución de los nuevos casos positivos en términos absolutos entre los menores de edad en la Comunidad Autónoma de Euskadi.'
            },
            hAxis: {
              format: 'd/M/yy'
            },
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
      }

      ;
    }
  });
  getJSON(DATAFILES.BYAGE, function (err, dataJson) {
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      google.charts.load('current', {
        'packages': ['corechart']
      });
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
            hAxis: {
              title: 'Positiboak'
            },
            vAxis: {
              title: 'Hildakoak'
            },
            bubble: {
              textStyle: {
                fontSize: 11
              }
            }
          };
        } else {
          data.addColumn('string', 'ID');
          data.addColumn('number', 'Positivos');
          data.addColumn('number', 'Fallecidos');
          data.addColumn('number', 'Poblacion');
          var options = {
            title: 'Correlación entre el número de positivos y el de fallecidos por rango de edad.',
            hAxis: {
              title: 'Positivos'
            },
            vAxis: {
              title: 'Fallecidos'
            },
            bubble: {
              textStyle: {
                fontSize: 11
              }
            }
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

      google.charts.load('current', {
        'packages': ['bar']
      });
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
              subtitle: 'Aurreko grafikoan erakutsitako datu berdinak ematen dira, beste modu batera irudikatuta.'
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
              subtitle: 'Se muestran los mismos datos representados en otro gráfico.'
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

      google.charts.load('current', {
        'packages': ['table']
      });
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
            data.addRow([element.ageRange, element.population, element.positiveCount, element.positiveByPopulationPercentage, element.deceasedCount, element.lethalityRate]);
          }
        }

        var table = new google.visualization.Table(document.getElementById('table_div4'));
        table.draw(data, {
          showRowNumber: true,
          width: '100%',
          height: 'auto'
        });
      }
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
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/by-age.js"], null)
//# sourceMappingURL=/by-age.7fc1bbdc.js.map