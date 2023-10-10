let cards = document.getElementById("cards");
let matches = document.getElementById("matches-found");
let matchesLeft = document.getElementById("matches-left");

let shuffled = [];
let openCards = [];
let inQue = []
const uniqueCards = ["images/carbink.webp", "images/floatzel.webp", "images/machamp.webp", "images/magneton.webp", "images/poliwrath.webp", "images/raboot.webp", "images/shaymin.webp", "images/slowpoke.webp"]

function handleClick(id) {
    let card = document.getElementById(id);
	let index = parseInt(card.id.substring(5));
	let cardsInQue = inQue.length;

	if(cardsInQue === 0) {
		card.src = shuffled[index];
		inQue.push(index);
	} else if(cardsInQue === 1) {
		inQue.push(index);
		card.src = shuffled[index];

		if(shuffled[inQue[0]] === shuffled[inQue[1]] && inQue[0] !== inQue[1]) {
			openCards.push(inQue[0]);
			openCards.push(inQue[1]);

			inQue = [];
		} else {
			let card2 = document.getElementById(`card-${inQue[1]}`);


			setTimeout(() => {
				card2.src = shuffled[inQue[1]];
				inQue = [];
				hydrate();
			}, 500)

		}

	} else {
		return;
	}

	hydrate();
}

let generateCard = (uid, src) => {
	let index = parseInt(uid.substring(5));

    return `
        <div class="card" onclick="handleClick('${uid}')">
            <img id="${uid}" src=${openCards.includes(index) || inQue.includes(index) ? shuffled[index] : "images/back.png"} alt="Back of a Pokemon Card">
        </div>
    `;
}

function hydrate() {
    cards.innerHTML = "";
	matches.innerText = `${openCards.length / 2} Matches Found`;
	matchesLeft.innerText = `${(shuffled.length - openCards.length) / 2} Matches Left`;

    shuffled.map((value, index) => {
        cards.innerHTML += generateCard(`card-${index}`, value);
    })
}

function initializeGame() {
    let setOfCards = [];

    for(i = 0; i < uniqueCards.length; i++) {
        setOfCards.push(uniqueCards[i]);
        setOfCards.push(uniqueCards[i]);
    }

    shuffled = setOfCards
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    hydrate();
}

initializeGame();