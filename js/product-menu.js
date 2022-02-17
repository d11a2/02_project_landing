if (window.matchMedia("(max-width: 768px)").matches)
    $('.product-menu__section-title').text("меню");

const mesureWidth = item => {

    const width = $(window).width();
    const container = item.closest(".product-menu__item");
    const titleBlock = container.find(".product-menu__title");
    const titleWidth = titleBlock.width();
    
   
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        return width - titleWidth * 3;
    }

    if (titleWidth * 3 + 524 > width) {
        return width - titleWidth * 3;
    }
    else return 524;
   
}

const closeEveryItemInContainer = container => {

    const items = container.find(".product-menu__item");
    const content = container.find(".product-menu__content");
    
    items.removeClass("active");
    content.width(0);
}

const openHiddenContent = item => {

    const hiddenContent = item.find(".product-menu__content");
    const reqWidth = mesureWidth(item);

    item.addClass("active");
    hiddenContent.width(reqWidth);
    $('.product-menu__section-title').text("меню");
}

$(".product-menu__title").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".product-menu__item");
    const itemOpened = item.hasClass("active");
    const container = $this.closest(".product-menu__list");

    if(itemOpened) { 

        closeEveryItemInContainer(container);

    } else {

        closeEveryItemInContainer(container);
        openHiddenContent(item);
    }
});

// т.к. на макете отсутствует кнопка, закрывающая текстовый контент 
// аккордеона, я реализовал закрытие кликом по этому контенту.

$(".product-menu__content").on("click", e => {

    const $this = $(e.currentTarget);
    const item = $this.closest(".product-menu__item");
    const itemOpened = item.hasClass("active");
    const container = $this.closest(".product-menu__list");

    if(itemOpened) {
        closeEveryItemInContainer(container);
    } else {
        closeEveryItemInContainer(container);
        openHiddenContent(item);
    }
});
