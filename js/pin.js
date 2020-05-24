(function () {
    //функция рендера пинов
    function renderPin(card, pinTemplate, id) {
        var pinElement = pinTemplate.cloneNode(true);
        pinElement.querySelector("img").src = card.author.avatar;
        pinElement.style =
            "top: " +
            card.location.y +
            "px; left: " +
            card.location.x +
            "px";
        pinElement.ariaLabel = id;
        pinElement.addEventListener('click', function () {
            var mapCard = document.querySelector('.map__card');
            if (mapCard) {
                mapCard.remove();
            };
            window.card.addCard(card);
        });
        return pinElement;
    };

    window.pin = {
        //функция добавления пинов       
        addPins: function (cards) {
            var pins = document.createDocumentFragment();
            for (var i = 0; i < cards.length; i++) {
                pins.appendChild(renderPin(cards[i], pinTemplate, i));
            }
            window.map.appendChild(pins);
        },
        //функция удаления  пинов
        removePins: function () {
            var pins = window.map.querySelectorAll('.map__pin');
            for (var i = 1; i < pins.length; i++) {
                pins[i].remove();
            };
        },
        updatePins: function (cards) {
            pin.removePins();
            pin.addPins(cards);
        }
    };
})();