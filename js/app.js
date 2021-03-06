/*----------------------- Constants -----------------------*/
const colorScheme = {
    dark: '',
    change: function() {
        colorScheme.dark = colorScheme.dark ? '' : 'dark'
        document.querySelector('body').setAttribute('class', colorScheme.dark)
    }
}


/*----------------------- Variables -----------------------*/
let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

let dealerScore = 0;
let playerScore = 0;
let deck = [];
let playerCards = [];
let dealerCards = [];

/*--------------- Cached Element References ---------------*/
const hitBtn = document.querySelector('#hit-btn');
const standBtn = document.querySelector('#stand-btn');
const playBtn = document.querySelector('#play-button');
const lightDarkBtn = document.querySelector('#light-dark-btn');
const cashTotal = document.querySelector('#cash-total');
const messageEl = document.querySelector('#message');
const betInput = document.querySelector('#bet');

const dealerCardsEl = document.querySelector('#dealer-cards');
const dealerScoreEl = document.querySelector('#dealer-score');

const playerCardsEl = document.querySelector('#player-cards');
const playerScoreEl = document.querySelector('#player-score');

/*-------------------- Event Listeners --------------------*/
hitBtn.addEventListener('click', handleHit);
standBtn.addEventListener('click', handleStand);
playBtn.addEventListener('click', play);
lightDarkBtn.addEventListener('click', colorScheme.change);


/*----------------------- Functions -----------------------*/
checkUserColorSchemePreference();

function checkUserColorSchemePreference() {
    if (
        window.matchMedia('(prefers-color-scheme:dark)').matches && !colorScheme.dark
    ) {
        colorScheme.change()
    }
}

function play() {
    
    gameStarted = true;

    deck = generateDeck();
    shuffleDeck(deck);

    dealerCards = [deck.shift(), deck.shift()];
    playerCards = [deck.shift(), deck.shift()];

    let dealerCardStr1 = dealerCards[0].value + ' of ' + dealerCards[0].suit;
    let dealerCardStr2 = dealerCards[1].value + ' of ' + dealerCards[1].suit;
    
    let playerCardStr1 = playerCards[0].value + ' of ' + playerCards[0].suit;
    let playerCardStr2 = playerCards[1].value + ' of ' + playerCards[1].suit;

    dealerCardsEl.innerText = dealerCardStr1 + "\n" + dealerCardStr2;
    playerCardsEl.innerText = playerCardStr1 + "\n" + playerCardStr2;

    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);

    dealerScoreEl.innerText = dealerScore;
    playerScoreEl.innerText = playerScore;

    messageEl.innerText = '';
    
    if (playerScore === 21 && dealerScore === 21) {
        messageEl.innerText = 'Push!';
    } else if (playerScore === 21) {
        messageEl.innerText = 'Blackjack!';
    }
}

function handleHit() {
    messageEl.innerText = '';

    playerCards.push(deck.shift());

    let playerCardStr1 = playerCards[0].value + ' of ' + playerCards[0].suit;
    let playerCardStr2 = playerCards[1].value + ' of ' + playerCards[1].suit;
    let playerCardStr3 = playerCards[2].value + ' of ' + playerCards[2].suit;

    playerCardsEl.innerText = playerCardStr1 + "\n" + playerCardStr2 + "\n" + playerCardStr3;
    
    updateScores();
    playerScoreEl.innerText = playerScore;
    console.log(playerScore);

    if (playerScore > 21) {
        messageEl.innerText = 'Bust!';
    } 
}

function handleStand() {
    if (dealerScore < 17) {
        dealerCards.push(deck.shift());

        let dealerCardStr1 = dealerCards[0].value + ' of ' + dealerCards[0].suit;
        let dealerCardStr2 = dealerCards[1].value + ' of ' + dealerCards[1].suit;
        let dealerCardStr3 = dealerCards[2].value + ' of ' + dealerCards[2].suit;

        dealerCardsEl.innerText = dealerCardStr1 + "\n" + dealerCardStr2 + "\n" + dealerCardStr3;

        updateScores();
        dealerScoreEl.innerText = dealerScore;
    } else if (dealerScore >= 17) {
        updateScores();
        dealerScoreEl.innerText = dealerScore;
    }

    if ( (playerScore >= 17 && playerScore <= 21) && (dealerScore >= 17 && dealerScore <= 21) && (playerScore === dealerScore) ) {
        messageEl.innerText = 'Push!';
    } else if ( (playerScore <= 21) && (dealerScore >= 17) && (playerScore > dealerScore) ) {
        messageEl.innerText = 'You win!';
    } else if (dealerScore <= 21 && dealerScore > playerScore) {
        messageEl.innerText = 'Dealer Wins!';
    } else if (dealerScore > 21) {
        messageEl.innerText = 'You Win!';
    }
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
	// iterate over the entire deck array "o"
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
        case 'Ace':
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

function getScore(cardArr) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArr.length; i++) {
        let card = cardArr[i];
        score += getCardValue(card);
        if (card.value === 'Ace') {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    } else {
        return score;
    }
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}