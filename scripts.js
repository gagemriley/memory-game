const cards = document.querySelectorAll('.memory-card');

let matched = document.getElementById('matched');
let failed = document.getElementById('failed');
let countm = 0;
let countf = 0;

// Get the modal
const modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard; 

function flipcard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if (!hasFlippedCard) {
		// first click
		hasFlippedCard = true;
		firstCard = this;

		return;
	}

	// second click
	secondCard = this;

	checkForMatch();
}

function checkForMatch() {
	// do cards match?
	let isMatch = firstCard.dataset.framework === 
		secondCard.dataset.framework;

	isMatch ? disableCards() : unFlipCards();
}


function disableCards() {
	// it's a match
	firstCard.removeEventListener('click', flipcard);
	secondCard.removeEventListener('click', flipcard);

	resetBoard();

	countm++;
	matched.innerHTML = countm;
	if (countm == 6) {
		modal.style.display = "block";
	}
}

function unFlipCards() {
	lockBoard = true;

	// not a match
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
	}, 1500);
	countf++;
	failed.innerHTML = countf;
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

function refreshPage() {
    window.location.reload();
}

(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() *12);
		card.style.order = randomPos;
	});
})();

cards.forEach(card => card.addEventListener('click', flipcard));