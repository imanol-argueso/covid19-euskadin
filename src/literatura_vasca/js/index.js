import { writers } from './data';
import { searchResult } from './search-result-builder';

window.onload = function () {
    let url = window.location.href;
    let dataFiltered;
    if (url.indexOf('index') != -1) {
        dataFiltered = writers.filter(x => x.home === 'yes');
    } else if (url.indexOf('vizcainos') != -1) {
        dataFiltered = writers.filter(x => x.category === 'Escritores vizcaínos');
    } else if (url.indexOf('alaveses') != -1) {
        dataFiltered = writers.filter(x => x.category === 'Escritores alaveses');
    } else if (url.indexOf('guipuzcoanos') != -1) {
        dataFiltered = writers.filter(x => x.category === 'Escritores guipuzcoanos');
    }
    searchResult(dataFiltered);
};