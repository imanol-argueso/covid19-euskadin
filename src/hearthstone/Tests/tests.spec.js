//import { getEndpoint } from '../api.js';
//import { Card } from '../Classes/Card.js';
import { DeckBuilder } from '../Classes/DeckBuilder.js';
import { getCardsFromData, getCardsByIdFromData, filterData } from '../Utils/getCardsFromDataAndFilter.js';
//var endpoints = require('../Config.js');
//import { SelectorBuilder } from '../Classes/SelectorBuilder.js';
import init from '../index.js';
describe('Tests', () => {
    //TESTS DE PRUEBA PEC2
    const deckTest = new DeckBuilder();
    test('Debe tener las propiedades de la clase DeckBuilder', () => {
        expect(deckTest.hasOwnProperty("deckCards")).toBe(true);
        expect(deckTest.hasOwnProperty("selectors")).toBe(true);
        expect(deckTest.hasOwnProperty("apiRequests")).toBe(true);
        expect(deckTest.hasOwnProperty("myDeck")).toBe(true);
    });
});