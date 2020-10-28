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
})({"js/data.js":[function(require,module,exports) {
module.exports = {
  title: "Basque literature authors",
  writers: [{
    id: "001",
    name: "Lope García de Salazar",
    born: 1399,
    death: 1476,
    placeOfBirth: "Somorrostro",
    home: "yes",
    category: "Escritores vizcaínos",
    url: "https://www.euskadi.eus",
    img: "/img/lope-garcia-salazar.jpg",
    description: "Don Lope García de Salazar, señor del castillo de Muñatones, en el valle de Somorrostro, nace en 1399 y es considerado por los especialistas como el más antiguo cronista de Vizcaya. Pero este corajudo banderizo, inmerso en las sangrías entre oñacinos y gamboinos que durante años asolan al viejo Señorío, es de alguna manera el precursor de la literatura vizcaína."
  }, {
    id: "002",
    name: "Antonio de Trueba",
    born: 1819,
    death: 1889,
    placeOfBirth: "Montellano, Galdames",
    category: "Escritores vizcaínos",
    home: "no",
    url: "/antonio-de-trueba.html",
    img: "/img/antonio-de-trueba.jpg",
    description: "Dice Fermín Herrán en un discurso pronunciado en la Sociedad El Sitio de Bilbao en 1891 que Antonio de Trueba «es el único escritor vasco de este siglo que ha impuesto su nombre en las páginas de la literatura española."
  }, {
    id: "003",
    name: "Emiliano de Arriaga",
    born: 1844,
    death: 1919,
    placeOfBirth: "Bilbao",
    category: "Escritores vizcaínos",
    home: "no",
    url: "/emiliano-de-arriaga.html",
    img: "/img/emiliano-de-arriaga.jpg",
    description: "Emiliano de Arriaga es el representante más conspicuo de la corriente de los costumbristas bilbainos. En 1896 publica su libro más famoso, el Lexicón etimológico, naturalista y popular del bilbaino neto. Sobrino del músico Juan Crisóstomo de Arriaga, Emiliano fue fundador y presidente de la Sociedad Filarmónica, teniente de alcalde por los canovistas y seguidor del incipiente nacionalismo vasco."
  }, {
    id: "004",
    name: "El Canciller de Ayala",
    born: 1332,
    death: 1407,
    placeOfBirth: "Vitoria-Gasteiz",
    home: "yes",
    category: "Escritores alaveses",
    url: "./el-canciller-de-ayala.html",
    img: "./img/el-canciller-de-ayala.jpg",
    description: "La voz europea del siglo XIV. No es fácil resumir la figura y la obra de don Pedro López de Ayala, nacido en Vitoria en 1332 y muerto en Calahorra en 1407. El canciller, una de las figuras emblemáticas de la literatura castellana y, como ha escrito Antonio Ortiz de Urbina, «la voz europea del siglo XIV», es uno de esos raros casos en donde se dan cita el escritor y el hombre de acción, el humanista y el político, el avezado historiador y el poeta elegíaco y escéptico."
  }, {
    id: "005",
    name: "Francisco de Vitoria",
    born: 1486,
    death: 1546,
    placeOfBirth: "Vitoria-Gasteiz",
    category: "Escritores alaveses",
    home: "no",
    url: "./francisco-de-vitoria.html",
    img: "./img/francisco-de-vitoria.jpg",
    description: "La obligada reducción de estas notas ha mantenido al margen –que no marginado marginado– a aquellos autores que no ejercieron la escritura como una actividad esencialmente artística, es decir, literaria. Ni los historiadores más o menos canónicos, ni los jurisconsultos ni los especialistas en botánica han tenido cabida en estas páginas. Pero hablar de Francisco de Vitoria, que no fue un escritor en puridad, resulta inevitable."
  }, {
    id: "006",
    name: "Ramiro de Maeztu",
    born: 1874,
    death: 1936,
    placeOfBirth: "Vitoria-Gasteiz",
    category: "Escritores alaveses",
    home: "yes",
    url: "./ramiro-de-maeztu.html",
    img: "./img/ramiro-de-maeztu.jpg",
    description: "La condena del silencio. Contaba Eugenio Montes que, cuando en los años treinta, publicó un elogioso comentario sobre Ramiro de Maeztu, éste le suplicó que no hablase bien de él: «Es usted muy joven y no tiene derecho a que le cerque el silencio como a mí. Yo soy un leproso». No exageraba un ápice el autor alavés. A raíz de su apoyo a la dictadura de Primo de Rivera, olvidar a Maeztu fue una consigna tácita, y los años no han hecho sino revalidarla una generación tras otra. Nadie quiere acordarse de Maeztu, ni dentro ni fuera del país de los vascos."
  }, {
    id: "007",
    name: "Gabriel Celaya",
    born: 1911,
    death: 1991,
    placeOfBirth: "Hernani",
    category: "Escritores guipuzcoanos",
    home: "yes",
    url: "./gabriel-celaya.html",
    img: "./img/gabriel-celaya.jpg",
    description: "Junto al bilbaino Blas de Otero, Rafael Múgica (que también puede ser Juan de Leceta) es el representante más solvente de la llamada poesía social (que ellos gustaban de llamar histórica), aquella que a partir fundamentalmente de los años cincuenta se compromete de manera directa en la lucha contra la dictadura franquista."
  }, {
    id: "008",
    name: "Francisco Grandmontagne",
    born: 1866,
    death: 1936,
    placeOfBirth: "Burgos",
    category: "Escritores guipuzcoanos",
    home: "no",
    url: "./francisco-grandmontagne.html",
    img: "./img/francisco-grandmontagne.jpg",
    description: "Francisco Grandmontagne, vasco-bearnés nacido en Burgos en 1866, criado en Fuenterrabía y emigrado a Argentina, escribió gran parte de su obra en los periódicos. Sus artículos aparecen en diarios argentinos como La Nación o en el madrileño El Sol. Su tío materno era Claudio de Otaegui, pedagogo, músico y poeta en lengua vasca."
  }, {
    id: "009",
    name: "José María Salaverría",
    born: 1873,
    death: 1940,
    placeOfBirth: "Vinaroz",
    category: "Escritores guipuzcoanos",
    home: "yes",
    url: "./jose-maria-salaberria.html",
    img: "./img/jose-maria-salaberria.jpg",
    description: "José María Salaverría fue, como Mourlane y Grandmontagne, ante todo escritor de periódicos, a pesar de su copiosa y desigual producción novelística. De familia guipuzcoana, nació en Vinaroz en 1873 y murió en Madrid en 1940. Residió en Argentina durante largos años y colaboró, después de desempeñar los más diversos oficios, en los más importantes diarios iberoamericanos."
  }]
};
},{}],"js/search-result-builder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResult = searchResult;

function searchResult(data) {
  let section = document.getElementById("searchResult");
  let ul = document.createElement("ul");
  section.appendChild(ul);
  data.forEach(element => {
    const searchResultLi = document.createElement("li");
    let divName = document.createElement("div");
    let divYears = document.createElement("div");
    let divPlace = document.createElement("div");
    let divDescription = document.createElement("div");
    let a = document.createElement("a");
    searchResultLi.appendChild(divName);
    divName.classList.add('title');
    divName.appendChild(a);
    a.textContent = element.name;
    a.href = element.url;
    searchResultLi.appendChild(divPlace);
    divPlace.classList.add('place');
    divPlace.textContent = 'Nacido/a: ' + element.placeOfBirth;
    searchResultLi.appendChild(divYears);
    divYears.classList.add('years');
    divYears.textContent = '(' + element.born + " - " + element.death + ')';
    searchResultLi.appendChild(divDescription);
    divDescription.classList.add('description');
    divDescription.textContent = element.description;
    ul.append(searchResultLi);
  });
}
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

var _data = require("./data");

var _searchResultBuilder = require("./search-result-builder");

window.onload = function () {
  let url = window.location.href;
  let dataFiltered;

  if (url.indexOf('index') != -1) {
    dataFiltered = _data.writers.filter(x => x.home === 'yes');
  } else if (url.indexOf('vizcainos') != -1) {
    dataFiltered = _data.writers.filter(x => x.category === 'Escritores vizcaínos');
  } else if (url.indexOf('alaveses') != -1) {
    dataFiltered = _data.writers.filter(x => x.category === 'Escritores alaveses');
  } else if (url.indexOf('guipuzcoanos') != -1) {
    dataFiltered = _data.writers.filter(x => x.category === 'Escritores guipuzcoanos');
  }

  (0, _searchResultBuilder.searchResult)(dataFiltered);
};
},{"./data":"js/data.js","./search-result-builder":"js/search-result-builder.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51679" + '/');

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
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map