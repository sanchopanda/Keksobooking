(function () {
    //функция рендера пинов
    function renderPins(card, pinTemplate) {
        var pinElement = pinTemplate.cloneNode(true);
        pinElement.querySelector("img").src = card.author.avatar;
        pinElement.style =
            "top: " +
            card.offer.location.y +
            "px; left: " +
            card.offer.location.x +
            "px";
        pinElement.ariaLabel = card.id;
        return pinElement;
    };

    window.pin = {
        //функция добавления пинов
        addPins: function (cards, map) {
            var pins = document.createDocumentFragment();
            for (var i = 0; i < cards.length; i++) {
                pins.appendChild(renderPins(cards[i], pinTemplate));
            }
            map.appendChild(pins);
        },
        //функция удаления  пинов
        removePins: function (map) {
            var pins = map.querySelectorAll('.map__pin');
            for (var i = 1; i < pins.length; i++) {
                pins[i].remove();
            };
        }
    };
})();