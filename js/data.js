(function () {
    window.data = {
        //функция получения случайного числа из диапазона
        getRandomInt: function (min, max) {
            return Math.floor(min + Math.random() * (max - min));
        },

        //функция получения случайного элемента и удаления его из первоначального массива
        getCutElem: function (array) {
            var i = data.getRandomInt(0, array.length);
            var elem = array[i];
            array.splice(i, 1);
            return elem;
        },

        //функция получения случайного элемента из массива
        getRandomElem: function (array) {
            return array[data.getRandomInt(0, array.length)];
        },

        //функция перемешивания массива
        randomShuffleArr: function (array) {
            var copyArr = array.slice(0);
            for (var i = copyArr.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = copyArr[i];
                copyArr[i] = copyArr[j];
                copyArr[j] = temp;
            };
            return copyArr;
        },
        //данные для генерации объявлений
        avatars: ["01", "02", "03", "04", "05", "06", "07", "08"],
        titles: [
            "Большая уютная квартира",
            "Маленькая неуютная квартира",
            "Огромный прекрасный дворец",
            "Маленький ужасный дворец",
            "Красивый гостевой домик",
            "Некрасивый негостеприимный домик",
            "Уютное бунгало далеко от моря",
            "Неуютное бунгало по колено в воде",
        ],
        types: {
            palace: "дворец",
            flat: "квартира",
            house: "дом",
            bungalo: "бунгало"
        },
        checkins: ["12:00", "13:00", "14:00"],
        checkouts: ["12:00", "13:00", "14:00"],
        features: ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
        photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
    }
})();

