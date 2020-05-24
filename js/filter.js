'use strict';
(function () {
    var map = document.querySelector(".map__pins");
    var filters = document.querySelector(".map__filters");
    var housingFilter = filters.querySelector("#housing-type");

    housingFilter.addEventListener('change', function () {
        var filter = housingFilter.value;
        var filterCards = card.cards.slice().filter(card => card.offer.type == filter);
        pin.updatePins(filterCards);
    });
})();