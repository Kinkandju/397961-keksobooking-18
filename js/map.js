'use strict';

(function () {

  var ENTER_KEYCODE = 13;

  var mainPin = document.querySelector('.map__pin--main');

  var MainPinData = {
    HALF_WIDTH_PIN: 31, // Изображение метки 62px / 2
    HEIGHT_PIN: 84 // Изображения метки 62px + хростик метки 22px
    // MainPinData.HALF_WIDTH_PIN
  };

  // При ограничении перемещения метки по горизонтали её острый конец должен указывать на крайнюю точку блока
  var MIN_COORD_X = 0 - MainPinData.HALF_WIDTH_PIN;
  var MAX_COORD_X = 1200 - MainPinData.HALF_WIDTH_PIN;
  var MIN_COORD_Y = 130;
  var MAX_COORD_Y = 630;

  window.map = {
    // Карта объявлений
    mapAds: document.querySelector('.map'),

    // Функция переноса данных координат в поле "адрес"
    getAddress: function () {
      var coords = {
        // В неактивном состоянии координаты главной метки соответствуют её центру
        x: mainPin.offsetLeft + MainPinData.HALF_WIDTH_PIN,
        y: mainPin.offsetTop + MainPinData.HALF_WIDTH_PIN
      };

      window.adForm.querySelector('#address').value = coords.x + ', ' + coords.y;
    },

    getNewAddress: function () {
      var newCoords = {
        // В активном состоянии координаты главной метки соответствуют её острому концу
        x: window.map.coordinates.x + MainPinData.HALF_WIDTH_PIN,
        y: window.map.coordinates.y + MainPinData.HEIGHT_PIN
      };
      window.adForm.querySelector('#address').value = newCoords.x + ', ' + newCoords.y;
    }
  };

  var isPageActive = false;
  // Событие при клике мыши на главную меткой:
  mainPin.addEventListener('click', function () {
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

  // ----Перетаскивание главной метки на карте----
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Начальные координаты метки
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordinates = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };
      window.map.coordinates = coordinates;

      if (coordinates.x < MIN_COORD_X) {
        coordinates.x = MIN_COORD_X;
      } else if (coordinates.x > MAX_COORD_X) {
        coordinates.x = MAX_COORD_X;
      }

      if (coordinates.y < MIN_COORD_Y) {
        coordinates.y = MIN_COORD_Y;
      } else if (coordinates.y > MAX_COORD_Y) {
        coordinates.y = MAX_COORD_Y;
      }

      mainPin.style.left = coordinates.x + 'px';
      mainPin.style.top = coordinates.y + 'px';

      window.map.getNewAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // Обработчики события передвижения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


})();
