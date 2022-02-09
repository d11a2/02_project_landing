const openItem = item => {
    const container = item.closest('.team__item');
    const contentBlock = container.find('.team__content');
    const textBlock = contentBlock.find('.team__content-block');
    const blockHeight = textBlock.height();
    const triangle = container.find('.triangle');


    container.addClass('active');
    triangle.addClass('turned');
    contentBlock.height(blockHeight);
}

const closeAllItems = container => {
    const items = container.find('.team__content');
    const itemContainer = container.find('.team__item');
    const triangle = container.find('.triangle');


    itemContainer.removeClass('active');
    triangle.removeClass('turned');
    items.height(0);
}

$('.team__title').click(e => {
    const $this = $(e.currentTarget);
    const container = $this.closest('.team__list');
    const itemContainer = $this.closest('.team__item');

    if (itemContainer.hasClass('active')) {
        closeAllItems(container);
    } else {
        closeAllItems(container);
        openItem($this);
    }
});