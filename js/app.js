/*----------------------- Constants -----------------------*/



/*----------------------- Variables -----------------------*/



/*--------------- Cached Element References ---------------*/
const hitBtn = document.querySelector('#hit-btn');


/*-------------------- Event Listeners --------------------*/
hitBtn.addEventListener('click', log)


/*----------------------- Functions -----------------------*/
function log() {
    console.log('hit working')
}