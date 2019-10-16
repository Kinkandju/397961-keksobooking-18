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

  // Событие при нажатой кнопки мыши над главной меткой:
  mainPin.addEventListener('mousedown', function () {
    // window.renderCards(window.advertisments[0]);
    // Показ меток на карте
    window.pin.showPins();
    // Открытие попапа
    window.form.getPopupOpen();
  });

  // Событие при нажатии на Enter при фокусе над главной меткой
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      // Показ меток на карте
      window.pin.showPins();
      // Открытие попапа
      window.form.getPopupOpen();
    }
  });

})();
