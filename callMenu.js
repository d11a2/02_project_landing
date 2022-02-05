const burger = document.querySelector('#callMenu');
const menu = document.querySelector('.fullscreen-menu');
const closeItem = document.querySelector('.fullscreen-menu__close')
let closeFlag = false;

burger.addEventListener('click', e => {
    
    if (closeFlag) {
        menu.classList.remove('active');
        
        closeItem.classList.remove('called');

        closeFlag = false;
    }

    else {
        menu.classList.add('active');
        
        burger.classList.add('called');

        closeFlag = true;
    }

});