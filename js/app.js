/*----------------------- Constants -----------------------*/



/*----------------------- Variables -----------------------*/
let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let dealerScore = 0;
let playerScore = 0;
let deck = [];
let playerCards = [];
let dealerCards = [];
let playerWin = false;
let gameStarted = false;
let gameOver = false;
let startingCash = 100;

/*--------------- Cached Element References ---------------*/
const hitBtn = document.querySelector('#hit-btn');
const standBtn = document.querySelector('#stand-btn');
const playBtn = document.querySelector('#play-button');
const cashTotal = document.querySelector('#cash-total');
const messageEl = document.querySelector('#message');
const betInput = document.querySelector('#bet');
const dealerDiv = document.querySelector('#dealer-total');
const playerDiv = document.querySelector('#player-total');

/*-------------------- Event Listeners --------------------*/
// hitBtn.addEventListener('click', log);
// standBtn.addEventListener('click', log2);
playBtn.addEventListener('click', play);


/*----------------------- Functions -----------------------*/
function play() {
    gameStarted = true;

    deck = generateDeck();
    shuffleDeck(deck);

    dealerCards = [JSON.stringify(deck.shift()), JSON.stringify(deck.shift())];
    playerCards = [JSON.stringify(deck.shift()), JSON.stringify(deck.shift())];

    dealerDiv.innerHTML = `dealer had ${dealerCards}`;
    playerDiv.innerText = `player has ${playerCards}`;
}





function generateDeck() {
    let deck = [];
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            let card = {
                suit: suits[suitIndex],
                value: values[valueIndex]
            };
            deck.push(card);
        }
    }
    return deck;
}

// https://devdojo.com/devdojo/create-a-deck-of-cards-in-javascript
function shuffleDeck(o) {
	// iterate over the entire input array "o"
    for(let i = o.length; i; i--) {
        // get the "current" item and save it in variable "x"
        let x = o[i];
        // generate a random number within the bounds of the array
        let j = parseInt(Math.random() * (i + 1));
        // The next two lines essentially swap item[i] and item[j]
        // set the "current" item to a randomly picked item
        o[i] = o[j];
        // put the "current" item in the random position
        o[j] = x;
        }
        return o;
    };

function getCardValue(card) {
    switch (card.value) {
        case 'A':
            return 1;
        case '2':
            return 2;
        case '3':
            return 3;
        case '4':
            return 4;
        case '5':
            return 5;
        case '6':
            return 6;
        case '7':
            return 7;
        case '8':
            return 8;
        case '9':
            return 9;
        default:
            return 10;
    }
}

// function getNextCard() {
//     let deck = generateDeck();
//     let nextCard = deck.shift();
//     return JSON.stringify(nextCard);
// }

function getScore(cardArr) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArr.length; i++) {
        let card = cardArr[i];
        score += getCardValue(card);
        if (card.value === 'A') {
            hasAce === true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function gameWinner() {
    updateScores();
    if (playerScore <= 21 && playerScore === dealerScore) {
        // update game message
        messageEl.innerText = `Push! You and the Dealer both had ${playerScore}.`;
    } else if ( (playerScore <= 21 && dealerScore <= 21) && playerScore > dealerScore) {
        // update win game message
        messageEl.innerText = `You win! Keep it goin!`;
    } else if ( (playerScore <= 21 && dealerScore <= 21) && playerScore < dealerScore) {
        // update lose game message
        messageEl.innerText = `The dealer wins! Better luck next time!`;
    } else if (playerScore > 21) {
        // update bust game message
        messageEl.innerText = `Bust! Better luck next time!`
    } else if (dealerScore > 21) {
        // update bust dealer game message
        messageEl.innerText = `Dealer bust! You win!`
    }
}