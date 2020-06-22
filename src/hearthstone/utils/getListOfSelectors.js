import { getEndpoint } from '../api.js';
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
export { getListOfSelectors };