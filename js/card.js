(function () {
    var typeForValue = {
        flat: "квартира",
        palace: "дворец",
        bungalo: "бунгало",
        house: "дом"
    };
    //функция рендера карточек
    function renderCard(card, cardTemplate) {
        var cardElement = cardTemplate.cloneNode(true);
        cardElement.querySelector(".popup__avatar").src = card.author.avatar;
        cardElement.querySelector("h3").textContent = card.offer.title;
        cardElement.querySelector(".popup__adress").textContent = card.offer.address;
        cardElement.querySelector(".popup__text--price").textContent = card.offer.price + "Р/ночь";
        cardElement.querySelector(".popup__type").textContent = typeForValue[card.offer.type];
        cardElement.querySelector(".popup__text--capacity").textContent = card.offer.rooms + " комнаты для " + card.offer.guests + " гостей";
        cardElement.querySelector(".popup__text--time").textContent = "Заезд после " + card.offer.checkin + ", выезд до " + card.offer.checkout;
        var featuresList = cardElement.querySelector(".popup__features");
        for (var i = 0; i < card.offer.features.length; i++) {
            var featureElem = document.createElement("li");
            featureElem.classList.add("feature");
            var classFeature = "feature--" + card.offer.features[i];
            featureElem.classList.add(classFeature);
            featuresList.appendChild(featureElem);
        }
        cardElement.querySelector(".popup__description").textContent = card.offer.description;
        var cardPhotos = cardElement.querySelector(".popup__photos");
        for (var i = 0; i < card.offer.photos.length; i++) {
            var imgElem = cardPhotos.querySelector('.popup__photo').cloneNode(true);
            imgElem.src = card.offer.photos[i];
            cardPhotos.appendChild(imgElem);
        };
        cardPhotos.querySelector('.popup__photo').remove();
        return cardElement;
    };

    window.card = {
        getCards: function (data) {
            window.card.cards = data;
        },
        //функция добавления карточки
        addCard: function (card) {
            var cardElem = document.createDocumentFragment();
            cardElem.appendChild(renderCard(card, cardTemplate));
            window.map.after(cardElem);
        },
        //функция удаления карточки
        removeCard: function () {
            if (document.querySelector('.map__card')) document.querySelector('.map__card').remove();
        }
    }
})();