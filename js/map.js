'use strict';

(function () {

  var ENTER_KEYCODE = 13;

  var mainPin = document.querySelector('.map__pin--main');

  // var mainPinData = {
  //   WIDTH_PIN: 65,
  //   HEIGHT_PIN: 65
  // };

  window.map = {
    // Карта объявлений
    mapAds: document.querySelector('.map'),

    // Функция переноса данных координат в поле "адрес"
    getAddress: function () {
      var coordinateX = mainPin.offsetLeft;
      var coordinateY = mainPin.offsetTop;
      window.adForm.querySelector('#address').value = coordinateX + ', ' + coordinateY;
    }
  };

  var isPageActive = false;
  // Событие при нажатой кнопки мыши над главной меткой:
  mainPin.addEventListener('mousedown', function () {
    // Показ меток на карте
    if (!isPageActive) {
      // Открытие попапа
      window.form.getPopupOpen();
      // Отрисовка меток
      window.pin.renderPinList();
      // Для каждой метки своя карточка объявления
      window.pin.createPinsListeners();

      isPageActive = true;
    }
  });

  // Событие при нажатии на Enter при фокусе над главной меткой
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      // Показ меток на карте
      if (!isPageActive) {
        // Открытие попапа
        window.form.getPopupOpen();
        // Отрисовка меток
        window.pin.renderPinList();
        // Для каждой метки своя карточка объявления
        window.pin.createPinsListeners();

        isPageActive = true;
      }
    }
  });

})();
