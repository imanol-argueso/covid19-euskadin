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
})({"api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEndpoint = getEndpoint;
const headers = new Headers();
headers.append('x-rapidapi-host', 'omgvamp-hearthstone-v1.p.rapidapi.com');
headers.append('x-rapidapi-key', 'c9fbb1ccecmsh2b6c1c24edefc43p148354jsnd3eaa4dfbe8e');

async function getEndpoint(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers
    });
    const apiData = await response.json();
    return apiData;
  } catch (err) {
    console.log('fetch failed', err);
  }
}
},{}],"Classes/Card.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;

class Card {
  constructor(cardId, name, playerClass, cardSet, type, faction, rarity, cost, attack, health, text, flavor, artist, collectible, elite, race, imgCard, img, imgGold, locale, durability, dbfId, mechanics, howToGetGold, howToGet, armor, classes) {
    if (cardId !== undefined) {
      this._cardId = cardId;
    }

    if (name !== undefined) {
      this._name = name;
    }

    if (playerClass !== undefined) {
      this._playerClass = playerClass;
    }

    if (cardSet !== undefined) {
      this._cardSet = cardSet;
    }

    if (type !== undefined) {
      this._type = type;
    }

    if (faction !== undefined) {
      this._faction = faction;
    }

    if (rarity !== undefined) {
      this._rarity = rarity;
    }

    if (cost !== undefined) {
      this._cost = cost;
    }

    if (attack !== undefined) {
      this._attack = attack;
    }

    if (health !== undefined) {
      this._health = health;
    }

    if (text !== undefined) {
      this._text = text;
    }

    if (flavor !== undefined) {
      this._flavor = flavor;
    }

    if (artist !== undefined) {
      this._artist = artist;
    }

    if (collectible !== undefined) {
      this._collectible = collectible;
    }

    if (elite !== undefined) {
      this._elite = elite;
    }

    if (race !== undefined) {
      this._race = race;
    }

    if (imgCard !== undefined) {
      this._imgCard = imgCard;
    }

    if (img !== undefined) {
      this._img = img;
    }

    if (imgGold !== undefined) {
      this._imgGold = imgGold;
    }

    if (locale !== undefined) {
      this._locale = locale;
    }

    if (durability !== undefined) {
      this._durability = durability;
    }

    if (dbfId !== undefined) {
      this._dbfId = dbfId;
    }

    if (mechanics !== undefined) {
      this._mechanics = mechanics;
    }

    if (howToGetGold !== undefined) {
      this._howToGetGold = howToGetGold;
    }

    if (howToGet !== undefined) {
      this._howToGet = howToGet;
    }

    if (armor !== undefined) {
      this._armor = armor;
    }

    if (classes !== undefined) {
      this._classes = classes;
    }
  }

  get cardId() {
    return this._cardId;
  }

  set cardId(valor) {
    this._cardId = valor;
  }

  get name() {
    return this._name;
  }

  set name(valor) {
    this._name = valor;
  }

  get playerClass() {
    return this._playerClass;
  }

  set playerClass(valor) {
    this._playerClass = valor;
  }

  get cardSet() {
    return this._cardSet;
  }

  set cardSet(valor) {
    this._cardSet = valor;
  }

  get type() {
    return this._type;
  }

  set type(valor) {
    this._type = valor;
  }

  get faction() {
    return this._faction;
  }

  set faction(valor) {
    this._faction = valor;
  }

  get rarity() {
    return this._rarity;
  }

  set rarity(valor) {
    this._rarity = valor;
  }

  get cost() {
    return this._cost;
  }

  set cost(valor) {
    this._cost = valor;
  }

  get attack() {
    return this._attack;
  }

  set attack(valor) {
    this._attack = valor;
  }

  get health() {
    return this._health;
  }

  set health(valor) {
    this._health = valor;
  }

  get text() {
    return this._text;
  }

  set text(valor) {
    this._text = valor;
  }

  get flavor() {
    return this._flavor;
  }

  set flavor(valor) {
    this._flavor = valor;
  }

  get artist() {
    return this._artist;
  }

  set artist(valor) {
    this._artist = valor;
  }

  get collectible() {
    return this._collectible;
  }

  set collectible(valor) {
    this._collectible = valor;
  }

  get elite() {
    return this._elite;
  }

  set elite(valor) {
    this._elite = valor;
  }

  get race() {
    return this._race;
  }

  set race(valor) {
    this._race = valor;
  }

  get imgCard() {
    return this._imgCard;
  }

  set imgCard(valor) {
    this._imgCard = valor;
  }

  get img() {
    return this._img;
  }

  set img(valor) {
    this._img = valor;
  }

  get imgGold() {
    return this._imgGold;
  }

  set imgGold(valor) {
    this._imgGold = valor;
  }

  get locale() {
    return this._locale;
  }

  set locale(valor) {
    this._locale = valor;
  }

  get durability() {
    return this._durability;
  }

  set durability(valor) {
    this._duaribility = valor;
  }

  get dbfId() {
    return this._dbfId;
  }

  set dbfId(valor) {
    this._dbfId = valor;
  }

  get mechanics() {
    return this._mechanics;
  }

  set mechanics(valor) {
    this._mechanics = valor;
  }

  get howToGetGold() {
    return this._howToGetGold;
  }

  set howToGetGold(valor) {
    this._howToGetGold = valor;
  }

  get howToGet() {
    return this._howToGet;
  }

  set howToGet(valor) {
    this._howToGet = valor;
  }

  get armor() {
    return this._armor;
  }

  set armor(valor) {
    this._armor = valor;
  }

  get classes() {
    return this._classes;
  }

  set classes(valor) {
    this._classes = valor;
  }

}

exports.Card = Card;
},{}],"config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endpoints = exports.DATA_API_HOST = void 0;
const DATA_API_HOST = 'omgvamp-hearthstone-v1.p.rapidapi.com'; //export const DATA_API_TOKEN = 'c1d8a64b79mshe833a7d0f290827p12aa82jsn1ca17e11b9aa';

exports.DATA_API_HOST = DATA_API_HOST;
const DATA_API = `https://${DATA_API_HOST}`;
const IMAGES_API = 'https://art.hearthstonejson.com/v1/render/latest/enUS/256x/';
const endpoints = {
  cardClass: `${DATA_API}/cards/`,
  cardSet: `${DATA_API}/cards/sets/`,
  playerClass: `${DATA_API}/cards/classes/`,
  race: `${DATA_API}/cards/races/`,
  quality: `${DATA_API}/cards/qualities/`,
  type: `${DATA_API}/cards/types/`,
  faction: `${DATA_API}/cards/factions/`,
  info: `${DATA_API}/info`,
  images: IMAGES_API
};
exports.endpoints = endpoints;
},{}],"utils/getCardsFromDataAndFilter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCardsFromData = getCardsFromData;
exports.filterData = filterData;

var _Card = require("../Classes/Card.js");

var _config = require("../config.js");

async function getCardsFromData(apiData, deckCards, apiRequests, firstSelector, firstSelectorValue) {
  try {
    for (let element of apiData) {
      var cardElement = new _Card.Card();

      for (let [key, value] of Object.entries(element)) {
        cardElement[key] = value;
      }

      cardElement.imgCard = _config.endpoints.images + cardElement.cardId + '.png';
      deckCards.push(cardElement);
    }

    apiRequests['dataCardsBy' + firstSelector + firstSelectorValue] = deckCards;
    return deckCards;
  } catch (err) {
    console.log('Failed when created the cards and setting into the apiRequests object.', err);
  }
}

async function filterData(deckCards, selectorsFilter) {
  try {
    for (var i = 1; i < Object.entries(selectorsFilter).length; i++) {
      let propiedad = '_' + Object.keys(selectorsFilter)[i];
      let valorProp = Object.values(selectorsFilter)[i];
      deckCards = deckCards.filter(CardElement => CardElement[propiedad] === valorProp);
    }

    return deckCards;
  } catch (err) {
    console.log('Failed when filtered the cards.', err);
  }
}
},{"../Classes/Card.js":"Classes/Card.js","../config.js":"config.js"}],"Config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endpoints = exports.DATA_API_HOST = void 0;
const DATA_API_HOST = 'omgvamp-hearthstone-v1.p.rapidapi.com'; //export const DATA_API_TOKEN = 'c1d8a64b79mshe833a7d0f290827p12aa82jsn1ca17e11b9aa';

exports.DATA_API_HOST = DATA_API_HOST;
const DATA_API = `https://${DATA_API_HOST}`;
const IMAGES_API = 'https://art.hearthstonejson.com/v1/render/latest/enUS/256x/';
const endpoints = {
  cardClass: `${DATA_API}/cards/`,
  cardSet: `${DATA_API}/cards/sets/`,
  playerClass: `${DATA_API}/cards/classes/`,
  race: `${DATA_API}/cards/races/`,
  quality: `${DATA_API}/cards/qualities/`,
  type: `${DATA_API}/cards/types/`,
  faction: `${DATA_API}/cards/factions/`,
  info: `${DATA_API}/info`,
  images: IMAGES_API
};
exports.endpoints = endpoints;
},{}],"utils/getListOfSelectors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListOfSelectors = getListOfSelectors;

var _api = require("../api.js");

var endpoints = require('../Config.js');

async function getListOfSelectors(apiData, valor, objectClass) {
  try {
    for (let element of apiData[valor]) {
      objectClass[valor].push(element);
    }

    return objectClass[valor];
  } catch (err) {
    console.log('Failed when trying to get the selectors from the API.', err);
  }
}
},{"../api.js":"api.js","../Config.js":"Config.js"}],"Classes/DeckBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilder = void 0;

var _api = require("../api.js");

var _getCardsFromDataAndFilter = require("../utils/getCardsFromDataAndFilter.js");

var _config = require("../config.js");

var _getListOfSelectors = require("../utils/getListOfSelectors.js");

class DeckBuilder {
  constructor(deckCards, selectors, apiRequests, myDeck, playerClass, cardSet, race, quality, type, faction) {
    this.deckCards = deckCards;
    this.selectors = [];
    this.apiRequests = [];
    this.myDeck = [];

    if (playerClass !== undefined) {
      this._playerClass = playerClass;
    }

    if (cardSet !== undefined) {
      this._cardSet = cardSet;
    }

    if (race !== undefined) {
      this._race = race;
    }

    if (quality !== undefined) {
      this._quality = quality;
    }

    if (type !== undefined) {
      this._type = type;
    }

    if (faction !== undefined) {
      this._faction = faction;
    }
  }

  async getCardsById(valor) {
    for (let element of this.deckCards) {
      if (element.cardId === valor) {
        this.deckCards = element;
        return this.deckCards;
      }
    }
  }

  async getCardsByplayerClass(valor) {
    this.deckCards = [];
    this.playerClass = valor;
    this.selectors.playerClass = valor;
    var firstSelector = Object.keys(this.selectors)[0];
    var firstSelectorValue = Object.values(this.selectors)[0];
    var previousRequest = this.apiRequests['dataCardsBy' + firstSelector + firstSelectorValue];

    if (previousRequest == undefined) {
      const apiData = await (0, _api.getEndpoint)(_config.endpoints[firstSelector] + firstSelectorValue);
      const cards = await (0, _getCardsFromDataAndFilter.getCardsFromData)(apiData, this.deckCards, this.apiRequests, firstSelector, firstSelectorValue);
      this.deckCards = await (0, _getCardsFromDataAndFilter.filterData)(cards, this.selectors);
      return this.deckCards;
    } else {
      this.deckCards = previousRequest;
      this.deckCards = await (0, _getCardsFromDataAndFilter.filterData)(this.deckCards, this.selectors);
      return this.deckCards;
    }
  }

  async getCardsBycardSet(valor) {
    this.deckCards = [];
    this.cardSet = valor;
    this.selectors.cardSet = valor;
    var firstSelector = Object.keys(this.selectors)[0];
    var firstSelectorValue = Object.values(this.selectors)[0];
    var previousRequest = this.apiRequests['dataCardsBy' + firstSelector + firstSelectorValue];

    if (previousRequest == undefined) {
      (0, _api.getEndpoint)(_config.endpoints[firstSelector] + firstSelectorValue);
      const apiData = await (0, _api.getEndpoint)(_config.endpoints[firstSelector] + firstSelectorValue);
      const cards = await (0, _getCardsFromDataAndFilter.getCardsFromData)(apiData, this.deckCards, this.apiRequests, firstSelector, firstSelectorValue);
      this.deckCards = await (0, _getCardsFromDataAndFilter.filterData)(cards, this.selectors);
      return this.deckCards;
    } else {
      this.deckCards = previousRequest;
      this.deckCards = await (0, _getCardsFromDataAndFilter.filterData)(this.deckCards, this.selectors);
      return this.deckCards;
    }
  }

  async getCardsByrace(valor) {
    this.deckCards = [];
    this.race = valor;
    this.selectors.race = valor;
    var firstSelector = Object.keys(this.selectors)[0];
    var firstSelectorValue = Object.values(this.selectors)[0];
    var previousRequest = this.apiRequests['dataCardsBy' + firstSelector + firstSelectorValue];

    if (previousRequest == undefined) {
      const apiData = await (0, _api.getEndpoint)(_config.endpoints[firstSelector] + firstSelectorValue);
      const cards = await (0, _getCardsFromDataAndFilter.getCardsFromData)(apiData, this.deckCards, this.apiRequests, firstSelector, firstSelectorValue);
      this.deckCards = await (0, _getCardsFromDataAndFilter.filterData)(cards, this.selectors);
      return this.deckCards;
    } else {
      this.deckCards = previousRequest;
      this.deckCards = await (0, _getCardsFromDataAndFilter.filterData)(this.deckCards, this.selectors);
      return this.deckCards;
    }
  }

  async getCardsBytype(valor) {
    this.deckCards = [];
    this.type = valor;
    this.selectors.type = valor;
    var firstSelector = Object.keys(this.selectors)[0];
    var firstSelectorValue = Object.values(this.selectors)[0];
    var previousRequest = this.apiRequests['dataCardsBy' + firstSelector + firstSelectorValue];

    if (previousRequest == undefined) {
      const apiData = await (0, _api.getEndpoint)(_config.endpoints[firstSelector] + firstSelectorValue);
      const cards = await (0, _getCardsFromDataAndFilter.getCardsFromData)(apiData, this.deckCards, this.apiRequests, firstSelector, firstSelectorValue);
      this.deckCards = await (0, _getCardsFromDataAndFilter.filterData)(cards, this.selectors);
      return this.deckCards;
    } else {
      this.deckCards = previousRequest;
      this.deckCards = await (0, _getCardsFromDataAndFilter.filterData)(this.deckCards, this.selectors);
      return this.deckCards;
    }
  }

  async getCardsByfaction(valor) {
    this.deckCards = [];
    this.faction = valor;
    this.selectors.faction = valor;
    var firstSelector = Object.keys(this.selectors)[0];
    var firstSelectorValue = Object.values(this.selectors)[0];
    var previousRequest = this.apiRequests['dataCardsBy' + firstSelector + firstSelectorValue];

    if (previousRequest == undefined) {
      (0, _api.getEndpoint)(_config.endpoints[firstSelector] + firstSelectorValue);
      const apiData = await (0, _api.getEndpoint)(_config.endpoints[firstSelector] + firstSelectorValue);
      const cards = await (0, _getCardsFromDataAndFilter.getCardsFromData)(apiData, this.deckCards, this.apiRequests, firstSelector, firstSelectorValue);
      this.deckCards = await (0, _getCardsFromDataAndFilter.filterData)(cards, this.selectors);
      return this.deckCards;
    } else {
      this.deckCards = previousRequest;
      this.deckCards = await (0, _getCardsFromDataAndFilter.filterData)(this.deckCards, this.selectors);
      return this.deckCards;
    }
  }

  async getCardsByquality(valor) {
    this.deckCards = [];
    this.quality = valor;
    this.selectors.quality = valor;
    var firstSelector = Object.keys(this.selectors)[0];
    var firstSelectorValue = Object.values(this.selectors)[0];
    var previousRequest = this.apiRequests['dataCardsBy' + firstSelector + firstSelectorValue];

    if (previousRequest == undefined) {
      const apiData = await (0, _api.getEndpoint)(_config.endpoints[firstSelector] + firstSelectorValue);
      const cards = await (0, _getCardsFromDataAndFilter.getCardsFromData)(apiData, this.deckCards, firstSelector, firstSelectorValue);
      this.deckCards = await (0, _getCardsFromDataAndFilter.filterData)(cards, this.selectors);
      return this.deckCards;
    } else {
      this.deckCards = previousRequest;
      this.deckCards = await (0, _getCardsFromDataAndFilter.filterData)(this.deckCards, this.selectors);
      return this.deckCards;
    }
  }

  async unselectCards(selector) {
    this.deckCards = [];
    delete this[selector];
    delete this.selectors[selector];

    if (Object.keys(this.selectors).length > 0) {
      var firstSelector = Object.keys(this.selectors)[0];
      var firstSelectorValue = Object.values(this.selectors)[0];
      var previousRequest = this.apiRequests['dataCardsBy' + firstSelector + firstSelectorValue];

      if (previousRequest == undefined) {
        this.apiRequests = [];
        const apiData = await (0, _api.getEndpoint)(_config.endpoints[firstSelector] + firstSelectorValue);
        console.log(firstSelector + firstSelectorValue);
        const cards = await (0, _getCardsFromDataAndFilter.getCardsFromData)(apiData, this.deckCards, this.apiRequests, firstSelector, firstSelectorValue);
        this.deckCards = await (0, _getCardsFromDataAndFilter.filterData)(cards, this.selectors);
        return this.deckCards;
      } else {
        this.deckCards = previousRequest;
        this.deckCards = await (0, _getCardsFromDataAndFilter.filterData)(this.deckCards, this.selectors);
        return this.deckCards;
      }
    } else {
      const noResultsMessage = '0 results.';
      return noResultsMessage;
    }
  }

  async setCardsToMyDeck(valor) {
    for (let element of this.deckCards) {
      if (element.cardId === valor) {
        this.myDeck.push(element);
      }
    }

    return this.myDeck;
  }

  async deleteCardsFromMyDeck(valor) {
    this.myDeck = this.myDeck.filter(s => s.cardId !== valor);
    return this.myDeck;
  }

  async getSelectors(valor) {
    this[valor] = [];
    const apiData = await (0, _api.getEndpoint)(_config.endpoints.info);
    const deckCards = await (0, _getListOfSelectors.getListOfSelectors)(apiData, valor, this);
    return deckCards;
  }

}

exports.DeckBuilder = DeckBuilder;
},{"../api.js":"api.js","../utils/getCardsFromDataAndFilter.js":"utils/getCardsFromDataAndFilter.js","../config.js":"config.js","../utils/getListOfSelectors.js":"utils/getListOfSelectors.js"}],"utils/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSelector = createSelector;

function createSelector(options, parent) {
  const selectEl = document.createElement('select');
  selectEl.name = parent;
  selectEl.dataset.parent = parent;
  selectEl.className = 'select-css';
  const optionEl = document.createElement('option');
  const optionText = document.createTextNode('Default');
  optionEl.value = 'Default';
  optionEl.appendChild(optionText);
  selectEl.appendChild(optionEl);

  for (let element of options) {
    const optionEl = document.createElement('option');
    const optionText = document.createTextNode(element);
    optionEl.value = element;
    optionEl.appendChild(optionText);
    selectEl.appendChild(optionEl);
  }

  return selectEl;
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _DeckBuilder = require("./Classes/DeckBuilder.js");

var _render = require("./utils/render.js");

window.onload = function () {
  async function rendering() {
    var userDeckBuilder = new _DeckBuilder.DeckBuilder();
    let info = {
      playerClass: 'classes',
      cardSet: 'sets',
      type: 'types',
      faction: 'factions',
      quality: 'qualities',
      race: 'races'
    };
    const sidebarSelectors = document.querySelector('#hearthStone_sidebarSelectors');
    const cardSelector = document.querySelector('#hearthStone_cardSelector');
    const cardSummary = document.querySelector('#hearthStone_cardSummary');
    const resultsP = cardSelector.appendChild(document.createElement('p'));
    resultsP.id = 'resultNumber';
    resultsP.textContent = 'Please, select your query with the options of the left column.';

    for (let [key, value] of Object.entries(info)) {
      sidebarSelectors.appendChild((0, _render.createSelector)((await userDeckBuilder.getSelectors(value)), key));
    }

    sidebarSelectors.addEventListener('change', async function (event) {
      const loader = document.querySelector('#loader');
      resultsP.textContent = 'Loading...';
      loader.classList.add("loader");
      const {
        value
      } = event.target;
      const parentSelector = event.target.dataset.parent;
      let userDeck;

      if (value == 'Default') {
        console.log(info[parentSelector]);
        userDeck = await userDeckBuilder.unselectCards(parentSelector);
      } else {
        userDeck = await userDeckBuilder['getCardsBy' + parentSelector](value);
      }

      if (userDeck !== '0 results.') {
        resultsP.textContent = userDeck.length + ' cards in this search result.';

        if (document.querySelector('#imagesList') !== null) {
          document.querySelector('#imagesList').remove();
        }

        const ulList = cardSelector.appendChild(document.createElement('ul'));
        ulList.id = 'imagesList';

        for (let element of userDeck) {
          const liList = ulList.appendChild(document.createElement('li'));
          liList.className = 'img-css';
          const imgList = liList.appendChild(document.createElement('img'));
          imgList.id = element.cardId;
          imgList.src = element.imgCard;
          imgList.addEventListener('error', function (event) {
            imgList.src = './images/nocard.png';
          });
          let idOfimgList = document.querySelector('#' + element.cardId); //Muestra el resumen de cartas al pasar por enciema de cada imagen

          idOfimgList.addEventListener('mouseover', async function (event) {
            if (document.querySelector('#hearthStone_cardSummaryStats') !== null) {
              document.querySelector('#hearthStone_cardSummaryStats').remove();
            }

            const summaryUl = cardSummary.appendChild(document.createElement('ul'));
            summaryUl.id = 'hearthStone_cardSummaryStats';

            for (let [keyFeature, valueFeature] of Object.entries(element)) {
              const summaryLi = summaryUl.appendChild(document.createElement('li'));
              summaryLi.appendChild(document.createTextNode(keyFeature.substr(1) + ": " + valueFeature));
            }
          }); //Añade una carta al mazo y la muestra en el área al clickar sobre la imagen

          idOfimgList.addEventListener('click', async function (event) {
            if (!userDeckBuilder.myDeck.some(containsCardId => containsCardId.cardId === element.cardId)) {
              userDeckBuilder.setCardsToMyDeck(element.cardId);
              const deckBuilder = document.querySelector('#hearthStone_deckBuilderCards');
              const deckBuilderList = deckBuilder.appendChild(document.createElement('li'));
              deckBuilderList.appendChild(document.createTextNode(element.name + " (" + element.cardId + ")"));
              const imgDelete = deckBuilderList.appendChild(document.createElement('img'));
              imgDelete.src = './images/delete.png';
              imgDelete.id = 'delete-' + element.cardId;
              imgDelete.alt = 'Delete this card form My deck'; //Añade una imagen de borrar al mazo

              const deckBuilderDelete = document.querySelector('#delete-' + element.cardId);
              deckBuilderDelete.addEventListener('click', async function (event) {
                document.querySelector('#delete-' + element.cardId).parentNode.remove();
                userDeckBuilder.deleteCardsFromMyDeck(element.cardId);
              });
            } else {
              alert('This card is already in your Deck');
            }
          });
        }
      } else {
        console.log('0 results.');
        console.log(userDeckBuilder.selectors);
        document.querySelector('#imagesList').remove();
        resultsP.textContent = '0 results. Please, select your query with the options of the left column.';
      }

      loader.classList.remove('loader');
      loader.classList.add('hide');
    });
  }

  return rendering();
};
},{"./Classes/DeckBuilder.js":"Classes/DeckBuilder.js","./utils/render.js":"utils/render.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54879" + '/');

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
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/hearthstone.e31bb0bc.js.map