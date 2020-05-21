(function () {
    var map = document.querySelector(".map__pins");
    var noticeForm = document.querySelector('.notice__form');

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

    //сброс
    var reset = noticeForm.querySelector('.form__reset');

    function deactivate() {
        noticeForm.classList.add("notice__form--disabled");
        document.querySelector(".map").classList.add("map--faded");
        mainMapPin.style = '';
        pin.removePins(map);
        card.removeCard();
        isMapActive = false;
    };

    reset.addEventListener('click', deactivate);

    //отправка формы
    function formPostSucces() {
        console.log(1);
        document.querySelector('.success').classList.remove('hidden');
        document.addEventListener('click', function () {
            document.querySelector('.success').classList.add('hidden');
        });

    };

    noticeForm.addEventListener('submit', function (evt) {
        window.backend.save(new FormData(noticeForm), formPostSucces, backend.getError);
        noticeForm.reset();
        deactivate();
        evt.preventDefault();
    });
})()
