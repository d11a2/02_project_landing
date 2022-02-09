const findItemByAlias = (alias) => {
    return $('.feedback__content__item').filter((ndx, item) => {
        return $(item).attr('data-linked-with') === alias;
    });
}

$('.feedback__link').click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-display');
    const curItem = $this.closest('.feedback__item');
    const itemToShow = findItemByAlias(target);

    itemToShow.addClass('active').siblings().removeClass('active');
    curItem.addClass('active').siblings().removeClass('active');
});