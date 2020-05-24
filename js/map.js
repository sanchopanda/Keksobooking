window.map = document.querySelector(".map__pins");
var pinTemplate = document
  .querySelector("template")
  .content.querySelector(".map__pin");
var cardTemplate = document
  .querySelector("template")
  .content.querySelector(".map__card");
var mainMapPin = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var adressField = document.getElementById('address');

backend.load(card.getCards, backend.getError);

//активация и ДнД
adressField.value = map.clientWidth / 2 + ',' + map.clientHeight / 2;
var isMapActive = false;
mainMapPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  if (!isMapActive) {
    document.querySelector(".map").classList.remove("map--faded");
    noticeForm.classList.remove("notice__form--disabled");
    pin.addPins(card.cards);
    isMapActive = true;
  };
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY,
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var moveCoords = {
      x: mainMapPin.offsetLeft - shift.x,
      y: mainMapPin.offsetTop - shift.y
    };

    if (moveCoords.x < map.offsetWidth - mainMapPin.offsetWidth / 2 && moveCoords.x > 0 + mainMapPin.offsetWidth / 2) {
      mainMapPin.style.left = moveCoords.x + 'px';
    };

    if (moveCoords.y < 630 && moveCoords.y > 130) {
      mainMapPin.style.top = moveCoords.y + 'px';
    };
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    adressField.value = mainMapPin.offsetLeft + ', ' + (mainMapPin.offsetTop + 42);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousedown', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

//показ карточки по клику на соответствующий пин
map.addEventListener('click', function () {
  var pin = event.target.closest('button');
  if (!pin) return;
  var i = pin.ariaLabel;
  if (i === false || i === undefined) return;
  var mapCard = document.querySelector('.map__card');
  if (mapCard) {
    mapCard.remove();
  };
  card.addCard(card.cards[i]);
  mapCard = document.querySelector('.map__card');
  //закрытие карточки по клику на крестик
  var cardCloser = mapCard.querySelector('.popup__close');
  cardCloser.addEventListener('click', function () {
    mapCard.remove();
  });
});

