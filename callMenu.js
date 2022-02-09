const burger = document.querySelector('#callMenu');
const menu = document.querySelector('.fullscreen-menu');
const closeItem = document.querySelector('.fullscreen-menu__close')
let isOpen = false;

burger.addEventListener('click', e => {
    
    if (isOpen) {
        menu.classList.remove('active');
        burger.classList.remove('called');
        closeItem.classList.remove('called');

        isOpen = false;
    }

    else {
        menu.classList.add('active');
        
        burger.classList.add('called');
        closeItem.classList.add('called');
        isOpen = true;
    }

});

$('.menu-link').click( e => {
    console.log(e)
    menu.classList.remove('active');
    closeItem.classList.remove('called');
    isOpen = false;
});


