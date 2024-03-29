'use strict';

(function () {

  var filters = document.querySelector('.map__filters');

  // Размеры меток
  var PinData = {
    WIDTH_PIN: 50,
    HEIGHT_PIN: 70
  };

  // Максимальное количество меток
  var MAX_PINS = 5;

  var pins = [];

  // Шаблон метки объявления
  var similarPinTemplate = document.querySelector('#pin')
      .content;

  // Отрисовка метки
  var renderPin = function (advertisment) {
    var advertismentElement = similarPinTemplate.cloneNode(true);

    advertismentElement.querySelector('.map__pin').style.left = advertisment.location.x - PinData.WIDTH_PIN / 2 + 'px';
    advertismentElement.querySelector('.map__pin').style.top = advertisment.location.y - PinData.HEIGHT_PIN + 'px';
    advertismentElement.querySelector('img').src = advertisment.author.avatar;
    advertismentElement.querySelector('img').alt = advertisment.offer.title;

    return advertismentElement;
  };

  // Функция открытия карточки при нажатии по метке на карте
  var createPinsListeners = function (advertisments) {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPins.forEach(function (pin, index) {
      pin.addEventListener('click', function () {
        mapPins[index].classList.add('.map__pin--active');
        window.card.renderCards(advertisments[index]);
      });
    });
  };

  window.pin = {
    // Функция создания меток на карте (по длине массива advertisments)
    renderPinList: function () {
      // Элемент куда будут вставлены метки
      var pinList = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      var onLoad = function (advertisments) {
        advertisments.forEach(function (pin, i) {
          if (i < MAX_PINS) {
            fragment.appendChild(renderPin(pin));
          }
        });
        pinList.appendChild(fragment);

        createPinsListeners(advertisments);
      };
      window.backend.load(onLoad);
    },

    // Удаление меток
    removePins: function () {
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      mapPins.forEach(function (pin) {
        pin.remove();
      });
    }
  };

  // Отфильтровка меток
  var getFilteredPins = function () {
    var filteredPins = pins.filter(function (pin) {
      return window.filters.filterPins(pin);
    });
    return filteredPins;
  };

  // Обновление меток
  var updatePins = function () {
    window.pin.removePins();
    window.pin.renderPinList(getFilteredPins());
  };

  // Событие изменений фильтрации объявлений
  filters.addEventListener('change', function (evt) {
    if (evt.target.name !== 'features') {
      window.filters.HousingMap[evt.target.name](evt.target.value);
    }
    window.debounce(updatePins);
  });


})();
