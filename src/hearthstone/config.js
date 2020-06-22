export const DATA_API_HOST = 'omgvamp-hearthstone-v1.p.rapidapi.com';
//export const DATA_API_TOKEN = 'c1d8a64b79mshe833a7d0f290827p12aa82jsn1ca17e11b9aa';
const DATA_API = `https://${DATA_API_HOST}`;
const IMAGES_API = 'https://art.hearthstonejson.com/v1/render/latest/enUS/256x/';

export const endpoints = {
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