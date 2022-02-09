const replaceDropdownListField = (item, field, value) => {
    item.find('.dropdown__block__items')
    .find(`.item__specification__name:contains(${field})`)
    .closest('.dropdown__block__item')
    .find('.item__specification__value')
    .text(value);
}

const createClonedShopItem = protoItem => {

    const clonedItem = protoItem.clone();

    clonedItem.find('.img-container').attr('src', './img/shop/Ellipse 6-2.png');
    clonedItem.find('.shop__desc__title').text("beats solo pro. цвет «красный цитрус»");
    clonedItem.find('.shop__desc__text-block p').text("Беспроводные наушники Solo Pro помогают настроиться на творчество. Для этого предусмотрено два режима прослушивания: режим с активным шумоподавлением и Прозрачный режим.");

    replaceDropdownListField(clonedItem, "Дальность", "10 м");
    replaceDropdownListField(clonedItem, "Зарядка", "2 ч");
    
    return clonedItem;
}

const getItemWidth = item => {
    const itemWidth = parseFloat(item.css('width'));
    return itemWidth;
}
const setItemsWidth = (items,container) => {
    $(items).css('width', `${getItemWidth(container)}px`);
}

const list = $('.shop__list');
const item = list.children('.shop__item:first-child');
const clonedItem = createClonedShopItem(item);
list.append(clonedItem);

const items = list.children('.shop__item');
const slideContainer = $('.shop__content');

setItemsWidth(items,slideContainer);

$(window).resize(e => { 
    setItemsWidth(items,slideContainer);
    list.css('left', "0px");
});

const slider = $('.shop__slider');
const itemsCount = items.lenght;
leftArrow = slider.find('#shop__left');
rightArrow = slider.find('#shop__right');

leftArrow.click( e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const step = parseInt(list.children('.shop__item:last-child').css('margin-left'))
    + parseInt(item.css('width'));


    let currentL = parseInt(list.css('left'));
    if(currentL == (-step)) {
        list.css('left', `${currentL + step}px`) ;
    } else {if(currentL < 0){
        list.css('left', `${0}px`) ;
        }
    }
    
});


rightArrow.click( e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const step = parseInt(list.children('.shop__item:last-child').css('margin-left'))
    + parseInt(item.css('width'));


    let currentL = parseInt(list.css('left'));
    if(currentL == 0 ) {
        list.css('left', `${currentL - step}px`) ;
    } else if (currentL > 0) {
        list.css('left', `${step}px`) ;
        }
});
