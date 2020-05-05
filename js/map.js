function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

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

var types = ["дворец", "квартира", "дом", "бунгало"];

var checkins = ["12:00", "13:00", "14:00"];

var checkouts = ["12:00", "13:00", "14:00"];

var features = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner",
];

function getArrayElem(array) {
  i = getRandomInt(0, array.length);
  var elem = array[i];
  array.splice(i, 1);
  return elem;
};

function getOffers(countOffers) {
  var offers = [];
  for (var i = 0; i < countOffers; i++) {
    offers[i] = {
      author: {
        avatar: "img/avatars/user" + getArrayElem(avatars) + ".png",
      },
      offer: {
        title: getArrayElem(titles),
        adress: getRandomInt(0, 1000) + ", " + getRandomInt(0, 1000),
        price: getRandomInt(1000, 10000),
        type: getArrayElem(types),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 10),
        checkin: getArrayElem(checkins),
        checkout: getArrayElem(checkouts),
        features: features,
        description: "",
        photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg"],
        location: {
          x: getRandomInt(10, 90),
          y: getRandomInt(130, 630),
        },
      },
    };
  }
  return offers;
}

var similarListElement = document.querySelector(".map__pins");

var similarPinTemplate = document
  .querySelector("template")
  .content.querySelector(".map__pin");

var similarCardTemplate = document
  .querySelector("template")
  .content.querySelector(".map__card");

var offers = getOffers(8);

function renderOffer(offer) {
  var offerElement = similarCardTemplate.cloneNode(true);
  offerElement.querySelector(".popup__avatar").src = offer.author.avatar;
  offerElement.querySelector("h3").textContent = offer.offer.title;  
  offerElement.querySelector(".popup__adress").textContent = offer.offer.adress;
  offerElement.querySelector(".popup__text--price").textContent = offer.offer.price + "Р/ночь";
  offerElement.querySelector(".popup__type").textContent = offer.offer.type;
  offerElement.querySelector(".popup__text--capacity").textContent = offer.offer.rooms + " комнаты для " + offer.offer.guests + " гостей";
  offerElement.querySelector(".popup__text--time").textContent = "Заезд после " + offer.offer.checkin + ", выезд до " + offer.offer.checkout;
  var featuresList = offerElement.querySelector(".popup__features");
  for (var i = 0; i < offer.offer.features.length; i++) {
    var featureElem =  document.createElement("li");
    featureElem.classList.add("feature");
    var classFeature = "feature--" + offer.offer.features[i];
    featureElem.classList.add(classFeature);
    featuresList.appendChild(featureElem);
  }  
  offerElement.querySelector(".popup__description").textContent = offer.offer.description;
  var offerPhotos = offerElement.querySelector(".popup__pictures");
  for (var i = 0; i < offer.offer.photos.length; i++) {
    var photoElem =  document.createElement("li");
    var imgElem = document.createElement("img");
    imgElem.src = offer.offer.photos[i];   
    photoElem.appendChild(imgElem);
    offerPhotos.appendChild(photoElem);
  }
  return offerElement;
}

function renderPins(offer) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.querySelector("img").src = offer.author.avatar;
  pinElement.style =
    "top: " +
    offer.offer.location.y +
    "px; left: " +
    offer.offer.location.x +
    "%";
  return pinElement;
}

var pins = document.createDocumentFragment();
for (var i = 0; i < offers.length; i++) {
  pins.appendChild(renderPins(offers[i]));
}
similarListElement.appendChild(pins);

var offerElem = document.createDocumentFragment();
offerElem.appendChild(renderOffer(offers[1]));
similarListElement.after(offerElem);

document.querySelector(".map").classList.remove("map--faded");
