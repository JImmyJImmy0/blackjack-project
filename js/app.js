/*----------------------- Constants -----------------------*/



/*----------------------- Variables -----------------------*/



/*--------------- Cached Element References ---------------*/
const hitBtn = document.querySelector('#hit-btn');
const standBtn = document.querySelector('#stand-btn');

/*-------------------- Event Listeners --------------------*/
hitBtn.addEventListener('click', log);
standBtn.addEventListener('click', log2);


/*----------------------- Functions -----------------------*/
function log() {
    console.log('hit working')
}

function log2() {
    console.log('stand working')
}

