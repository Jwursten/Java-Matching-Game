// script.js
const cards = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D']; // Pairs of cards
const memoryGame = document.querySelector('.memory-game');
let flippedCards = [];

// Shuffle the cards randomly
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create card elements
function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.textContent = card;
    memoryGame.appendChild(cardElement);

    cardElement.addEventListener('click', () => handleCardClick(cardElement));
}

function handleCardClick(cardElement) {
    if (flippedCards.length < 2) {
        cardElement.classList.add('flipped');
        flippedCards.push(cardElement);

        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            if (firstCard.textContent === secondCard.textContent) {
                setTimeout(() => {
                    firstCard.classList.add('matched');
                    secondCard.classList.add('matched');
                    checkWin(); // Check if all cards are matched
                }, 500);
            } else {
                setTimeout(() => {
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                }, 1000);
            }
            flippedCards = [];
        }
    }
}

function checkWin() {
    const matchedCards = document.querySelectorAll('.card.matched');
    if (matchedCards.length === cards.length) {
        // All cards are matched
        showWinScreen();
    }
}

function showWinScreen() {
    const winScreen = document.createElement('div');
    winScreen.classList.add('win-screen');
    winScreen.textContent = 'Congratulations! You won! 🎉';
    memoryGame.appendChild(winScreen);
}

// Shuffle the cards and create card elements
shuffleCards(cards);
cards.forEach(createCard);

