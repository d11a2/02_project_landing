const sections = $('section');
const display = $(".body-container");
const transitionDuration = parseFloat(display.css('transition-duration')) * 1000;
const fixedMenuList = $(".fixed-menu__list"); 
const fixedMenuItems = $(".fixed-menu__item"); 

let inScroll = false;

sections.first().addClass("active");
fixedMenuItems.first().addClass("active");


const setFixedMenuClass = activeSection => {
    
    const dataSectionIdAttr = activeSection.attr('data-section-id');
    const calcActiveFixedItem = fixedMenuList
    .find(`.fixed-menu__item[data-scroll-to="${dataSectionIdAttr}"]`);
    
    if (dataSectionIdAttr === "product-menu") {
        
        fixedMenuList.removeClass("red");
        fixedMenuList.addClass("grey");

    } else {
        fixedMenuList.removeClass("grey");
    }

    if (dataSectionIdAttr === "delivery") {

        fixedMenuList.removeClass("grey");
        fixedMenuList.addClass("red");

    } else {
        fixedMenuList.removeClass("red");
    }
    
    calcActiveFixedItem
        .addClass("active").siblings().removeClass("active");  

}

const performTransition = (sectionEq, transitionDuration) => {

    if (inScroll === false) {
        inScroll = true;
        const position = sectionEq * -100;

        display.css({
            transform: `translateY(${position}%)`
        });

        sections.eq(sectionEq).addClass("active").siblings().removeClass("active");
        
        setFixedMenuClass(sections.eq(sectionEq));

        setTimeout(() => {
            inScroll = false;
        }, transitionDuration + 300);
    }
}

const scrollViewport = direction => {

    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();
    
    if (direction === "next" && nextSection.length) {

        performTransition(nextSection.index(), transitionDuration);
        
    }

    if (direction === "prev" && prevSection.length) {
        
        performTransition(prevSection.index(), transitionDuration);

    }
}

$(window).on("wheel", e => {

    const tagName = e.target.tagName.toLowerCase();
        
    // блокировка прокрутки имеет смысл только в случае, 
    // если поля ввода в фокусе. иначе весь скролл 
    // стопорится на форме.

    if (!($(e.target).is(":focus") 
    && (tagName === "input" || tagName === "textarea"))) {

        const deltaY = e.originalEvent.deltaY;

        if (deltaY > 0) {
            scrollViewport("next"); 
        }

        if (deltaY < 0) {
            scrollViewport("prev");
        }
    }
});

$(window).on("keydown", e => {

   const tagName = e.target.tagName.toLowerCase();

   if (!($(e.target).is(":focus") 
    && (tagName === "input" || tagName === "textarea"))) {
    
        switch (e.keyCode) {
            case 38:
                scrollViewport("prev");
                break;
            case 40: 
                scrollViewport("next");
                break;
        }
   }
});


$("[data-scroll-to]").click( e => {

    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id="${target}"]`);

    // это обеспечивает возможность быстрого листинга 
    // через боковое меню.

    if ($this.hasClass("fixed-menu__item")) {
        
        performTransition(reqSection.index(), -100);
    } else {
        performTransition(reqSection.index(), transitionDuration);

    }

});