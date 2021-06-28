/*----------------------- Constants -----------------------*/



/*----------------------- Variables -----------------------*/
let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let dealerScore = 0;
let playerScore = 0;
let deck = [];
let playerWin = false;
let gameStarted = false;
let gameOver = false;
/*--------------- Cached Element References ---------------*/
const hitBtn = document.querySelector('#hit-btn');
const standBtn = document.querySelector('#stand-btn');
const playBtn = document.querySelector('#play-button');
const cashTotal = document.querySelector('#cash-total');
const message = document.querySelector('#message');
const betInput = document.querySelector('#bet');

/*-------------------- Event Listeners --------------------*/
hitBtn.addEventListener('click', log);
standBtn.addEventListener('click', log2);
playBtn.addEventListener('click', log3);


/*----------------------- Functions -----------------------*/
function generateDeck() {
    let deck = [];
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            let card = {
                suit: suits[suitIndex],
                value: value[valueIndex]
            };
            deck.push(card);
        }
    }
    return deck;
}

