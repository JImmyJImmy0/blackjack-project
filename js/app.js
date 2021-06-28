/*----------------------- Constants -----------------------*/



/*----------------------- Variables -----------------------*/



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
function log() {
    console.log('hit working')
}

function log2() {
    console.log('stand working')
}

function log3() {
    console.log('play working')
}

