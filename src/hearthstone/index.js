import { DeckBuilder } from './Classes/DeckBuilder.js';
import { createSelector } from './utils/render.js';

window.onload = function () {
    async function rendering() {
        var userDeckBuilder = new DeckBuilder();
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
            sidebarSelectors.appendChild(createSelector(await userDeckBuilder.getSelectors(value), key));
        }
        sidebarSelectors.addEventListener('change', async function (event) {
            const loader = document.querySelector('#loader');
            resultsP.textContent = 'Loading...';
            loader.classList.add("loader");
            const { value } = event.target;
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
                    let idOfimgList = document.querySelector('#' + element.cardId);

                    //Muestra el resumen de cartas al pasar por enciema de cada imagen
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
                    });
                    //Añade una carta al mazo y la muestra en el área al clickar sobre la imagen
                    idOfimgList.addEventListener('click', async function (event) {
                        if (!userDeckBuilder.myDeck.some(containsCardId => containsCardId.cardId === element.cardId)) {
                            userDeckBuilder.setCardsToMyDeck(element.cardId);
                            const deckBuilder = document.querySelector('#hearthStone_deckBuilderCards');
                            const deckBuilderList = deckBuilder.appendChild(document.createElement('li'));
                            deckBuilderList.appendChild(document.createTextNode(element.name + " (" + element.cardId + ")"));
                            const imgDelete = deckBuilderList.appendChild(document.createElement('img'));
                            imgDelete.src = './images/delete.png';
                            imgDelete.id = 'delete-' + element.cardId;
                            imgDelete.alt = 'Delete this card form My deck';
                            //Añade una imagen de borrar al mazo
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
}