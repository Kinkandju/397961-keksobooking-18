'use strict';

(function () {

  var ENTER_KEYCODE = 13;

  var mainPin = document.querySelector('.map__pin--main');

  var MainPinData = {
    HALF_WIDTH_PIN: 31, // Изображение метки 62px / 2
    HEIGHT_PIN: 62,
    ALL_HEIGHT_PIN: 84 // Изображения метки 62px + хростик метки 22px
  };

  // При ограничении перемещения метки по горизонтали её острый конец должен указывать на крайнюю точку блока
  var MIN_COORD_X = 0 - MainPinData.HALF_WIDTH_PIN;
  var MAX_COORD_X = 1200 - MainPinData.HALF_WIDTH_PIN;
  var MIN_COORD_Y = 130;
  var MAX_COORD_Y = 630;

  var isPageActive = false;

  window.map = {
    // Карта объявлений
    mapAds: document.querySelector('.map'),

    // Функция переноса данных координат в поле "адрес"
    getAddress: function () {
      if (!isPageActive) {
        var coords = {
          x: mainPin.offsetLeft + MainPinData.HALF_WIDTH_PIN,
          y: mainPin.offsetTop + MainPinData.HEIGHT_PIN
        };
        window.form.adForm.querySelector('#address').value = coords.x + ', ' + coords.y;
      } else {
        var newCoords = {
          x: window.map.coordinates.x + MainPinData.HALF_WIDTH_PIN,
          y: window.map.coordinates.y + MainPinData.ALL_HEIGHT_PIN
        };
        window.adForm.querySelector('#address').value = newCoords.x + ', ' + newCoords.y;
      }
    }
  };

  // ----Перетаскивание главной метки на карте----

  // Событие при нажатой кнопки мыши по главной метке:
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

      window.map.getAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

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

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // Событие при нажатии на Enter при фокусе над главной меткой
    mainPin.addEventListener('keydown', function (evtKey) {
      if (evtKey.keyCode === ENTER_KEYCODE) {
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

    // Обработчики события передвижения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


})();
