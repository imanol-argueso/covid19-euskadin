const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const currencySelect = document.getElementById('currency');

populateUI();

let ticketPrice = movieSelect.value;

//Guardar en el localStorage el índice de la película y su precio
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Actualizar el total de asientos y el precio
function updateSelectedCount(price) {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * price;
}
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Evento para modificar el precio en base a la película seleccionada
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount(ticketPrice);
});

//Evento para actualizar el número de asientos
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount(ticketPrice);
    }
});

//Evento para actualizar la moneda
currency.addEventListener('change', e => {
    const selectedCurrency = e.target.value;

    fetch('https://api.exchangerate-api.com/v4/latest/EUR')
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[selectedCurrency];
            console.log(ticketPrice);
            ticketPriceCurrency = (ticketPrice * rate).toFixed(2);;
            console.log(ticketPriceCurrency);
            updateSelectedCount(ticketPriceCurrency);
            //rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
            //amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        });


});

//Número de asientos y total del precio inicial
updateSelectedCount(ticketPrice);