import { getEndpoint } from '../api.js';
import { getCardsFromData, filterData } from '../utils/getCardsFromDataAndFilter.js';
import { endpoints } from '../config.js';
import { getListOfSelectors } from '../utils/getListOfSelectors.js';

class DeckBuilder {
    constructor(deckCards, selectors, apiRequests, myDeck, playerClass, cardSet, race, quality, type, faction) {
        this.deckCards = deckCards;
        this.selectors = [];
        this.apiRequests = [];
        this.myDeck = [];
        if (playerClass !== undefined) { this._playerClass = playerClass; }
        if (cardSet !== undefined) { this._cardSet = cardSet; }
        if (race !== undefined) { this._race = race; }
        if (quality !== undefined) { this._quality = quality; }
        if (type !== undefined) { this._type = type; }
        if (faction !== undefined) { this._faction = faction; }
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
            const apiData = await getEndpoint(endpoints[firstSelector] + firstSelectorValue);
            const cards = await getCardsFromData(apiData, this.deckCards, this.apiRequests, firstSelector, firstSelectorValue);
            this.deckCards = await filterData(cards, this.selectors);
            return this.deckCards;
        } else {
            this.deckCards = previousRequest;
            this.deckCards = await filterData(this.deckCards, this.selectors);
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
            getEndpoint(endpoints[firstSelector] + firstSelectorValue)
            const apiData = await getEndpoint(endpoints[firstSelector] + firstSelectorValue);
            const cards = await getCardsFromData(apiData, this.deckCards, this.apiRequests, firstSelector, firstSelectorValue);
            this.deckCards = await filterData(cards, this.selectors);
            return this.deckCards;
        } else {
            this.deckCards = previousRequest;
            this.deckCards = await filterData(this.deckCards, this.selectors);
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
            const apiData = await getEndpoint(endpoints[firstSelector] + firstSelectorValue);
            const cards = await getCardsFromData(apiData, this.deckCards, this.apiRequests, firstSelector, firstSelectorValue);
            this.deckCards = await filterData(cards, this.selectors);
            return this.deckCards;
        } else {
            this.deckCards = previousRequest;
            this.deckCards = await filterData(this.deckCards, this.selectors);
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
            const apiData = await getEndpoint(endpoints[firstSelector] + firstSelectorValue);
            const cards = await getCardsFromData(apiData, this.deckCards, this.apiRequests, firstSelector, firstSelectorValue);
            this.deckCards = await filterData(cards, this.selectors);
            return this.deckCards;
        } else {
            this.deckCards = previousRequest;
            this.deckCards = await filterData(this.deckCards, this.selectors);
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
            getEndpoint(endpoints[firstSelector] + firstSelectorValue)
            const apiData = await getEndpoint(endpoints[firstSelector] + firstSelectorValue);
            const cards = await getCardsFromData(apiData, this.deckCards, this.apiRequests, firstSelector, firstSelectorValue);
            this.deckCards = await filterData(cards, this.selectors);
            return this.deckCards;
        } else {
            this.deckCards = previousRequest;
            this.deckCards = await filterData(this.deckCards, this.selectors);
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
            const apiData = await getEndpoint(endpoints[firstSelector] + firstSelectorValue);
            const cards = await getCardsFromData(apiData, this.deckCards, firstSelector, firstSelectorValue);
            this.deckCards = await filterData(cards, this.selectors);
            return this.deckCards;
        } else {
            this.deckCards = previousRequest;
            this.deckCards = await filterData(this.deckCards, this.selectors);
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
                const apiData = await getEndpoint(endpoints[firstSelector] + firstSelectorValue);
                console.log(firstSelector + firstSelectorValue);
                const cards = await getCardsFromData(apiData, this.deckCards, this.apiRequests, firstSelector, firstSelectorValue);
                this.deckCards = await filterData(cards, this.selectors);
                return this.deckCards;
            } else {
                this.deckCards = previousRequest;
                this.deckCards = await filterData(this.deckCards, this.selectors);
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
        const apiData = await getEndpoint(endpoints.info);
        const deckCards = await getListOfSelectors(apiData, valor, this);
        return deckCards;
    }
}
export { DeckBuilder };