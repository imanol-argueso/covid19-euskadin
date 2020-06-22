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
export { createSelector };