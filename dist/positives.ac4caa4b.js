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
})({"js/positives.js":[function(require,module,exports) {
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
  BYHOSPITAL: `${DATA_SOURCE}/covid19-byhospital.json`
}; //import { getJSON } from './getData.js';
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
  getJSON(DATAFILES.PCR, function (err, dataJson) {
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      document.getElementById("fechaActualizacion").innerHTML += updated(dataJson.byDate[dataJson.byDate.length - 1].date);
      google.charts.load('current', {
        'packages': ['line']
      });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();

        if (window.location.href.indexOf("/eu/") > -1) {
          data.addColumn('date', 'Data');
          data.addColumn('number', 'Euskadi: Kasu positiboen kopurua');
          var options = {
            chart: {
              title: 'Kasu positibo berriak Euskadin',
              subtitle: 'Egindako testetan izandako kasu positibo berriak termino absolutuetan Euskadin.'
            },
            hAxis: {
              format: 'yy/M/d'
            },
            width: 900,
            height: 500
          };
        } else {
          data.addColumn('date', 'Fecha');
          data.addColumn('number', 'Euskadi: Número de casos positivos');
          var options = {
            chart: {
              title: 'Casos positivos nuevos en Euskadi',
              subtitle: 'Casos positivos nuevos en términos absolutos de test realizados en la Comunidad Autónoma de Euskadi.'
            },
            hAxis: {
              format: 'd/M/yy'
            },
            width: 900,
            height: 500
          };
        }

        for (let element of dataJson.byDate) {
          data.addRow([new Date(element.date), element.positiveCount]);
        }

        var chart = new google.charts.Line(document.getElementById('linechart_material'));
        chart.draw(data, google.charts.Line.convertOptions(options));
        var data = new google.visualization.DataTable();

        if (window.location.href.indexOf("/eu/") > -1) {
          data.addColumn('date', 'Data');
          data.addColumn('number', 'Euskadi: 14 egunetan metatutako intzidentzia 100.000 biztanleko (testak guztira)');
          data.addColumn('number', 'Araba: 14 egunetan metatutako intzidentzia 100.000 biztanleko (testak guztira)');
          data.addColumn('number', 'Bizkaia: 14 egunetan metatutako intzidentzia 100.000 biztanleko (testak guztira)');
          data.addColumn('number', 'Gipuzkoa: 14 egunetan metatutako intzidentzia 100.000 biztanleko (testak guztira)');
          var options = {
            chart: {
              title: 'Kasu positiboak: 100.000 biztanleko intzidentzia',
              subtitle: '14 egunetan metatutako intzidentzia 100.000 biztanleko (testak guztira)'
            },
            hAxis: {
              format: 'yy/M/d'
            },
            width: 900,
            height: 500
          };
        } else {
          data.addColumn('date', 'Fecha');
          data.addColumn('number', 'Euskadi: Incidencia acumulada 14 días x 100.000 hab. (test totales)');
          data.addColumn('number', 'Araba: Incidencia acumulada 14 días x 100.000 hab. (test totales)');
          data.addColumn('number', 'Bizkaia: Incidencia acumulada 14 días x 100.000 hab. (test totales)');
          data.addColumn('number', 'Gipuzkoa: Incidencia acumulada 14 días x 100.000 hab. (test totales)');
          var options = {
            chart: {
              title: 'Casos positivos: incidencia x 100.000 hab.',
              subtitle: 'Incidencia acumulada 14 días x 100.000 hab. (test totales)'
            },
            hAxis: {
              format: 'd/M/yy'
            },
            width: 900,
            height: 500
          };
        }

        for (let element of dataJson.byDate) {
          data.addRow([new Date(element.date), element.aggregatedIncidence, element.aggregatedIncidenceAR, element.aggregatedIncidenceBIZ, element.aggregatedIncidenceGI]);
        }

        var chart = new google.charts.Line(document.getElementById('linechart_material0'));
        chart.draw(data, google.charts.Line.convertOptions(options));
      }

      google.charts.load('current', {
        'packages': ['table']
      });
      google.charts.setOnLoadCallback(drawTable);

      function drawTable() {
        var data = new google.visualization.DataTable();

        if (window.location.href.indexOf("/eu/") > -1) {
          data.addColumn('date', 'Data');
          data.addColumn('number', 'Positiboak testetan');
          data.addColumn('number', 'Euskadi: positiboak 100.000 biztanleko');
          data.addColumn('number', 'Araba');
          data.addColumn('number', 'Bizkaia');
          data.addColumn('number', 'Gizpuzkoa');
          var monthYearFormatter = new google.visualization.DateFormat({
            pattern: "yyy-MM-dd"
          });
        } else {
          data.addColumn('date', 'Fecha');
          data.addColumn('number', 'Positivos test');
          data.addColumn('number', 'Euskadi: Positivos x 100.000 hab.');
          data.addColumn('number', 'Araba');
          data.addColumn('number', 'Bizkaia');
          data.addColumn('number', 'Gizpuzkoa');
          var monthYearFormatter = new google.visualization.DateFormat({
            pattern: "dd-MM-yyy"
          });
        }

        for (let element of dataJson.byDate) {
          data.addRow([new Date(element.date), element.positiveCount, element.aggregatedIncidence, element.aggregatedIncidenceAR, element.aggregatedIncidenceBIZ, element.aggregatedIncidenceGI]);
        }

        monthYearFormatter.format(data, 0);
        var table = new google.visualization.Table(document.getElementById('table_div'));
        table.draw(data, {
          showRowNumber: true,
          sortColumn: 0,
          sortAscending: false,
          width: '100%',
          height: '100%'
        });
      }
    }
  });
  getJSON(DATAFILES.EPIDEMICSTATUS, function (err, dataJson) {
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      google.charts.load('current', {
        'packages': ['line']
      });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();

        if (window.location.href.indexOf("/eu/") > -1) {
          data.addColumn('date', 'Data');
          data.addColumn('number', 'Kutsatze tasa: Positiboak zati egindako probak (%)');
          data.addColumn('number', 'Errenferentziazko tasa = %5');
          var options = {
            chart: {
              title: 'Kutsatze tasa: Kasu positiboak egindako proben arabera (%)',
              subtitle: 'Kasu positiboak zati egindako testak (PCR eta antigeno probak) Euskadin.'
            },
            hAxis: {
              format: 'yy/M/d'
            },
            width: 900,
            height: 500
          };
        } else {
          data.addColumn('date', 'Fecha');
          data.addColumn('number', 'Tasa de positividad: Positivos entre los test totales realizados (%)');
          data.addColumn('number', 'Tasa de referencia = 5%');
          var options = {
            chart: {
              title: 'Tasa de Positividad: Positivos en función de los test totales realizados (%)',
              subtitle: 'Casos positivos entre las pruebas (PCR y antígenos) realizadas en Euskadi.'
            },
            hAxis: {
              format: 'd/M/yy'
            },
            width: 900,
            height: 500
          };
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

        var chart = new google.charts.Line(document.getElementById('linechart_material1'));
        chart.draw(data, google.charts.Line.convertOptions(options));
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
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/positives.js"], null)
//# sourceMappingURL=/positives.ac4caa4b.js.map