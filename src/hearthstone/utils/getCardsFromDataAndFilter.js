import { Card } from '../Classes/Card.js';
import { endpoints } from '../config.js';

async function getCardsFromData(apiData, deckCards, apiRequests, firstSelector, firstSelectorValue) {
    try {
        for (let element of apiData) {
            var cardElement = new Card();
            for (let [key, value] of Object.entries(element)) {
                cardElement[key] = value;
            }
            cardElement.imgCard = endpoints.images + cardElement.cardId + '.png';
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
export { getCardsFromData, filterData };