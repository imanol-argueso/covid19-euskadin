export function searchResult(data) {
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
