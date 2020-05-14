//функция получения случайного числа из заданного диапазона
function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

//данные для генерации карточек
var avatars = ["01", "02", "03", "04", "05", "06", "07", "08"];
var titles = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде",
];
var types = {
  palace: "дворец",
  flat: "квартира",
  house: "дом",
  bungalo: "бунгало"
};
var checkins = ["12:00", "13:00", "14:00"];
var checkouts = ["12:00", "13:00", "14:00"];
var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

//функция получения случайного элемента и удаления его из первоначального массива
function getCutElem(array) {
  var i = getRandomInt(0, array.length);
  var elem = array[i];
  array.splice(i, 1);
  return elem;
};

//функция получения случайного элемента из массива
function getRandomElem(array) {
  return array[getRandomInt(0, array.length)];
};

//функция перемешивания массива
function randomShuffleArr(array) {
  var copyArr = array.slice(0);
  for (var i = copyArr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copyArr[i];
    copyArr[i] = copyArr[j];
    copyArr[j] = temp;
  }
  return copyArr;
};


var similarListElement = document.querySelector(".map__pins");

//функция генерации карточек
function getOffers(countOffers) {
  var offers = [];
  for (var i = 0; i < countOffers; i++) {
    offers[i] = {
      id: i,
      author: {
        avatar: "img/avatars/user" + getCutElem(avatars) + ".png",
      },
      offer: {
        title: getCutElem(titles),
        price: getRandomInt(1000, 10000),
        type: types[getRandomElem(Object.keys(types))],
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 10),
        checkin: getRandomElem(checkins),
        checkout: getRandomElem(checkouts),
        features: features,
        description: "",
        photos: randomShuffleArr(photos),
        location: {
          x: getRandomInt(30, similarListElement.clientWidth - 30),
          y: getRandomInt(130, 630)
        }
      }
    };
    offers[i].offer.address = offers[i].offer.location.x + ', ' + offers[i].offer.location.y;
  }
  return offers;
}

var offers = getOffers(8);
var similarPinTemplate = document
  .querySelector("template")
  .content.querySelector(".map__pin");
var similarCardTemplate = document
  .querySelector("template")
  .content.querySelector(".map__card");

//функция рендера пинов
function renderPins(offer) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.querySelector("img").src = offer.author.avatar;
  pinElement.style =
    "top: " +
    offer.offer.location.y +
    "px; left: " +
    offer.offer.location.x +
    "px";
  pinElement.ariaLabel = offer.id;
  return pinElement;
}

//функция рендера карточек
function renderOffer(offer) {
  var offerElement = similarCardTemplate.cloneNode(true);
  offerElement.querySelector(".popup__avatar").src = offer.author.avatar;
  offerElement.querySelector("h3").textContent = offer.offer.title;
  offerElement.querySelector(".popup__adress").textContent = offer.offer.address;
  offerElement.querySelector(".popup__text--price").textContent = offer.offer.price + "Р/ночь";
  offerElement.querySelector(".popup__type").textContent = offer.offer.type;
  offerElement.querySelector(".popup__text--capacity").textContent = offer.offer.rooms + " комнаты для " + offer.offer.guests + " гостей";
  offerElement.querySelector(".popup__text--time").textContent = "Заезд после " + offer.offer.checkin + ", выезд до " + offer.offer.checkout;
  var featuresList = offerElement.querySelector(".popup__features");
  for (var i = 0; i < offer.offer.features.length; i++) {
    var featureElem = document.createElement("li");
    featureElem.classList.add("feature");
    var classFeature = "feature--" + offer.offer.features[i];
    featureElem.classList.add(classFeature);
    featuresList.appendChild(featureElem);
  }
  offerElement.querySelector(".popup__description").textContent = offer.offer.description;
  var offerPhotos = offerElement.querySelector(".popup__photos");
  for (var i = 0; i < offer.offer.photos.length; i++) {
    var imgElem = offerPhotos.querySelector('.popup__photo').cloneNode(true);
    imgElem.src = offer.offer.photos[i];
    offerPhotos.appendChild(imgElem);
  };
  offerPhotos.querySelector('.popup__photo').remove();
  return offerElement;
}

//функция добавления пинов
function addPins() {
  var pins = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    pins.appendChild(renderPins(offers[i]));
  }
  similarListElement.appendChild(pins);
};
//функция добавления карточки
function addOffer(offer) {
  var offerElem = document.createDocumentFragment();
  offerElem.appendChild(renderOffer(offer));
  similarListElement.after(offerElem);
};

var mainMapPin = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var adressField = document.getElementById('address');

//активация и ДнД
var isMapActive = false;
mainMapPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  if (!isMapActive) {
    document.querySelector(".map").classList.remove("map--faded");
    noticeForm.classList.remove("notice__form--disabled");
    addPins();
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

    if (moveCoords.x < similarListElement.offsetWidth - mainMapPin.offsetWidth / 2 && moveCoords.x > 0 + mainMapPin.offsetWidth / 2) {
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
similarListElement.addEventListener('click', function () {
  var pin = event.target.closest('button');
  if (!pin) return;
  var i = pin.ariaLabel;
  if (i === false || i === undefined) return;
  var mapCard = document.querySelector('.map__card');
  if (mapCard) {
    mapCard.remove();
  };
  addOffer(offers[i]);
});
//валидация цены и типа
var priceForType = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
var inputType = noticeForm.querySelector("#type");
var inputPrice = noticeForm.querySelector("#price");
inputType.addEventListener("change", function () {
  inputPrice.placeholder = priceForType[inputType.value];
  inputPrice.min = priceForType[inputType.value];
});

//Валидация  времени заезда и выезда
var inputTimein = noticeForm.querySelector("#timein");
var inputTimeout = noticeForm.querySelector("#timeout");
inputTimein.addEventListener("change", function () {
  inputTimeout[inputTimein.selectedIndex].selected = true;
});
inputTimeout.addEventListener("change", function () {
  inputTimein[inputTimeout.selectedIndex].selected = true;
});

//Валидация количества комнат и гостей
var inputRoomNumber = noticeForm.querySelector("#room_number");
var inputCapacity = noticeForm.querySelector("#capacity");
inputRoomNumber.addEventListener("change", function () {
  if (inputRoomNumber.value != 100) {
    for (var i = 0; i < Object.keys(inputCapacity).length; i++) {
      if (inputCapacity[i].value > inputRoomNumber.value || inputCapacity[i].value == 0) {
        inputCapacity[i].disabled = true;
        inputCapacity[i].selected = false;
      } else {
        inputCapacity[i].disabled = false;
      }
    }
  } else {
    for (var i = 0; i < Object.keys(inputCapacity).length; i++) {
      if (inputCapacity[i].value == 0) {
        inputCapacity[i].disabled = false;
        inputCapacity[i].selected = true;
      } else {
        inputCapacity[i].disabled = true;
      }
    }
  }
});

adressField.value = similarListElement.clientWidth / 2 + ',' + similarListElement.clientHeight / 2;

