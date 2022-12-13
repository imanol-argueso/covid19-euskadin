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
})({"js/by-health-zone-map.js":[function(require,module,exports) {
//import { DATAFILES } from './config';
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
  getJSON(DATAFILES.BYHEALTHZONE, function (err, dataJson) {
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      document.getElementById("fechaActualizacion").innerHTML += updated(dataJson.dataByDateByHealthZone[0].date);
      var popupInfo;
      var popupNoData;
      var title;
      var titleParagraph;

      if (window.location.href.indexOf("/eu/") > -1) {
        popupInfo = ' positibo 100.000 biztanleko';
        popupNoData = 'Ez dago positiborik.';
        title = 'Positiboak';
        titleParagraph = 'Euskadiko osasun eremuetan duten 100.000 biztanleko positiboen tasa.';
      } else {
        popupInfo = ' positivos por 100.000 hab.';
        popupNoData = 'No hay positivos.';
        title = 'Positivos';
        titleParagraph = 'Tasa de positivos por 100.000 habitantes en cada zona de salud.';
      }

      let map = L.map('map');
      L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      let geojson_url = "../maps/osasun_eremuak_2018_latlon.json";

      function getColor(d) {
        return d > 9000 ? '#800026' : d > 8000 ? '#BD0026' : d > 7000 ? '#E31A1C' : d > 6000 ? '#FC4E2A' : d > 5000 ? '#FD8D3C' : d > 4000 ? '#FEB24C' : d > 2000 ? '#FED976' : d > 0 ? '#FFEDA0' : 'white';
      }

      function style(dataValue) {
        return {
          fillColor: getColor(dataValue),
          weight: 1,
          dashArray: '3',
          fillOpacity: 0.7
        };
      } //Leyenda con los rangos


      var legend = L.control({
        position: 'bottomright'
      });

      legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 2000, 4000, 5000, 6000, 7000, 8000, 9000],
            labels = [];

        for (var i = 0; i < grades.length; i++) {
          div.innerHTML += '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
      };

      legend.addTo(map);
      var geojsonLayer;

      let addGeoLayer = data => {
        geojsonLayer = L.geoJson(data, {
          onEachFeature: function (feature, layer) {
            let objetoAFiltrar = dataJson.dataByDateByHealthZone[0].items;
            let positivos = objetoAFiltrar.filter(element => element.healthZone.healthZoneId === feature.properties.ZON_Cod);

            if (positivos.length !== 0) {
              layer.bindPopup(feature.properties.ZONA_Nom + ': ' + positivos[0].positiveBy100ThousandPeopleRate + popupInfo);
              layer.setStyle(style(positivos[0].positiveBy100ThousandPeopleRate));
            } else {
              layer.bindPopup(popupNoData);
              layer.setStyle(style(0));
            }
          }
        }).addTo(map);
        map.fitBounds(geojsonLayer.getBounds());
      }; //Añadimos la capa de info


      var info = L.control();

      info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
      };

      info.update = function () {
        this._div.innerHTML = '<h4>' + title + '</h4><p class="info_p">' + titleParagraph + '</p>';
      };

      info.addTo(map);
      fetch(geojson_url).then(res => res.json()).then(data => addGeoLayer(data));
      var popupInfo2;
      var popupNoData2;
      var title2;
      var titleParagraph2;

      if (window.location.href.indexOf("/eu/") > -1) {
        popupInfo2 = '(%)-eko hilgarritasuna';
        popupNoData2 = 'Ez dago daturik.';
        title2 = 'Hilgarritasuna';
        titleParagraph2 = 'Pandemiaren hasieratik Euskadiko osasun eremuetan izandako hilgarritasuna.';
      } else {
        popupInfo2 = '% de letalidad';
        popupNoData2 = 'No hay datos.';
        title2 = 'Letalidad';
        titleParagraph2 = 'Letalidad en las zonas de salud de Euskadi desde el inicio de la pandemia.';
      }

      let map2 = L.map('map2');
      L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map2); //let geojson_url2 = "./maps/osasun_eremuak_2018_latlon.json";

      function getColor2(d) {
        return d > 7 ? '#800026' : d > 6 ? '#BD0026' : d > 5 ? '#E31A1C' : d > 4 ? '#FC4E2A' : d > 3 ? '#FD8D3C' : d > 2 ? '#FEB24C' : d > 1 ? '#FED976' : d > 0 ? '#FFEDA0' : 'white';
      }

      function style2(dataValue) {
        return {
          fillColor: getColor2(dataValue),
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
            grades = [0, 1, 2, 3, 4, 5, 6, 7],
            labels = [];

        for (var i = 0; i < grades.length; i++) {
          div.innerHTML += '<i style="background:' + getColor2(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '%&ndash;' + grades[i + 1] + '%<br>' : '% +');
        }

        return div;
      };

      legend2.addTo(map2);
      var geojsonLayer2;

      let addGeoLayer2 = data => {
        geojsonLayer2 = L.geoJson(data, {
          onEachFeature: function (feature, layer) {
            let objetoAFiltrar = dataJson.dataByDateByHealthZone[0].items;
            let positivos = objetoAFiltrar.filter(element => element.healthZone.healthZoneId === feature.properties.ZON_Cod);

            if (positivos.length !== 0) {
              layer.bindPopup(feature.properties.ZONA_Nom + ': ' + positivos[0].mortalityRate + popupInfo2);
              layer.setStyle(style2(positivos[0].mortalityRate));
            } else {
              layer.bindPopup(popupNoData2);
              layer.setStyle(style2(0));
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
        this._div.innerHTML = '<h4>' + title2 + '</h4><p class="info_p">' + titleParagraph2 + '</p>';
      };

      info2.addTo(map2);
      fetch(geojson_url).then(res => res.json()).then(data => addGeoLayer2(data));
      google.charts.load('current', {
        'packages': ['corechart']
      });
      google.charts.setOnLoadCallback(drawSeriesChart);

      function drawSeriesChart() {
        var data = new google.visualization.DataTable();

        if (window.location.href.indexOf("/eu/") > -1) {
          data.addColumn('string', 'Osasun eremua');
          data.addColumn('number', 'Positiboen tasa');
          data.addColumn('number', 'Hilgarritasuna');
          data.addColumn('number', 'Biztanleak (TISak guztira)');
          var options = {
            title: 'Euskadiko osasun eremuen positibo (100.000 biztanleko tasa) eta hilgarritasunaren arteko korrelazioa. Hilgarritsaun handiena (>4%) duten osasun eremuak bakarrik erakusten dira.',
            hAxis: {
              title: 'Positiboak (100.000 biztanleko tasa)'
            },
            vAxis: {
              title: 'Hilgarritasuna'
            },
            bubble: {
              textStyle: {
                fontSize: 11
              }
            }
          };
        } else {
          data.addColumn('string', 'Zona de salud');
          data.addColumn('number', 'Tasa de positivos');
          data.addColumn('number', 'Letalidad');
          data.addColumn('number', 'Poblacion (Total de TIS)');
          var options = {
            title: 'Correlación entre positivos (tasa por 100.000 hab.) y letalidad en las zonas de salud de Euskadi. Se muestran tan solo las zonas de salud con mayor letalidad (> 4%).',
            hAxis: {
              title: 'Positivos (tasa por 100.000 hab.)'
            },
            vAxis: {
              title: 'Letalidad'
            },
            bubble: {
              textStyle: {
                fontSize: 11
              }
            }
          };
        }

        for (let element of dataJson.dataByDateByHealthZone[0].items) {
          if (element.mortalityRate > 4) {
            data.addRow([element.healthZone.name, element.positiveBy100ThousandPeopleRate, element.mortalityRate, element.tisCount]);
          }
        }

        var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div3'));
        chart.draw(data, options);
      }

      google.charts.load('current', {
        'packages': ['table']
      });
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
        table.draw(data, {
          showRowNumber: true,
          sortColumn: 2,
          sortAscending: false,
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54881" + '/');

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
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/by-health-zone-map.js"], null)
//# sourceMappingURL=/by-health-zone-map.13cbf1d0.js.map