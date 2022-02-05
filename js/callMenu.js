const burger = document.querySelector('#callMenu');
const menu = document.querySelector('#menu');
var closeFlag = false;
let zIndex = 0;

burger.addEventListener('click', e => {
    
    if (closeFlag) {
        menu.classList.remove('active');
        
        burger.classList.remove('called');

        burger.style.zIndex = zIndex;

        closeFlag = false;
    }

    else {
        menu.classList.add('active');
        
        burger.classList.add('called');

        zIndex = burger.style.zIndex;
        burger.style.zIndex = 1001;

        closeFlag = true;
    }

    console.log(burger.style.zIndex);

});