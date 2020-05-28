'use strict';
(function () {
    var map = document.querySelector(".map__pins");
    var filters = document.querySelector(".map__filters");
    var typeSelect = filters.querySelector("#housing-type");
    var priceSelect = filters.querySelector("#housing-price");
    var roomsSelect = filters.querySelector("#housing-rooms");
    var guestsSelect = filters.querySelector("#housing-guests");
    var features = filters.querySelector("#housing-features");

    function filtrationItem(it, item, key) {
        return it.value === 'any' ? true : it.value === item[key].toString();
    };

    function filterByType(item) {
        return filtrationItem(typeSelect, item.offer, 'type');
    };

    var priceRange = {
        low: {
            min: 0,
            max: 10000
        },
        middle: {
            min: 10000,
            max: 50000
        },
        high: {
            min: 50000,
            max: Infinity
        }
    };

    function filterByPrice(item) {
        var filter = priceRange[priceSelect.value];
        return priceSelect.value === 'any' ? true : filter.min <= item.offer.price && item.offer.price <= filter.max;
    };

    function filterByRoom(item) {
        return filtrationItem(roomsSelect, item.offer, 'rooms');
    };

    function filterByGuest(item) {
        return filtrationItem(guestsSelect, item.offer, 'guests');
    };

    function filterByFeatures(item) {
        var featuresFilter = Array.from(features.querySelectorAll('input:checked'));
        if (!featuresFilter.length) return true;
        var result;
        for (var i = 0; i < featuresFilter.length; i++) {
            result = item.offer.features.includes(featuresFilter[i].value) ? true : false;
            if (result == false) return result;
        };
        return result;
    };

    var onFilterChange = function () {
        var filteredData = window.card.cards.slice(0);
        filteredData = filteredData.filter(filterByType).filter(filterByPrice).filter(filterByRoom).filter(filterByGuest).filter(filterByFeatures).filter(filterByFeatures);
        pin.removePins();
        card.removeCard();
        pin.addPins(filteredData);
    };

    filters.addEventListener('change', window.debounce(onFilterChange));

})();