function getRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

var avatars = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08"
];

var titles [
    "Большая уютная квартира",
    "Маленькая неуютная квартира",
    "Огромный прекрасный дворец",
    "Маленький ужасный дворец",
    "Красивый гостевой домик",
    "Некрасивый негостеприимный домик",
    "Уютное бунгало далеко от моря",
    "Неуютное бунгало по колено в воде"
];

function getOffers(countOffers) {
    var offers = [];
    for (var i = 0; i < countOffers; i++) {
        offers[i] = {
            author: {
                avatar: "img/avatasr/user" + avatars[getRandomInt(0, avatars.length - 1)] + ".png"
            },
            offer: {
                title: titles[getRandomInt(0, titles.length - 1)],
                adress: 
            }
        }
    }
}