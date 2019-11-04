'use strict';

(function () {

  var PinData = {
    WIDTH_PIN: 50,
    HEIGHT_PIN: 70
  };

  // Шаблон метки объявления
  var similarPinTemplate = document.querySelector('#pin')
      .content;

  // Отрисовка метки
  var renderPin = function (advertisment) {
    var advertismentElement = similarPinTemplate.cloneNode(true);

    advertismentElement.querySelector('.map__pin').style.left = advertisment.location.x - PinData.WIDTH_PIN / 2 + 'px';
    advertismentElement.querySelector('.map__pin').style.top = advertisment.location.y - PinData.HEIGHT_PIN + 'px';
    advertismentElement.querySelector('img').src = advertisment.author.avatar.src;
    advertismentElement.querySelector('img').alt = advertisment.offer.title;

    return advertismentElement;
  };

  window.pin = {
    // Функция создания меток на карте (по длине массива advertisments)
    renderPinList: function () {
      // Элемент куда будут вставлены метки
      var pinList = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < window.advertisments.length; i++) {
        fragment.appendChild(renderPin(window.advertisments[i]));
      }

      pinList.appendChild(fragment);
    },

    // Функция открытия карточки при нажатии по метке на карте
    createPinsListeners: function () {
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      // Открытие карточки при нажатии по метке на карте
      mapPins.forEach(function (pin, index) {
        window.backend.load(function (advertisments) {
          pin.addEventListener('click', function () {
            mapPins[index].classList.add('.map__pin--active');
            window.card.renderCards(advertisments[index]);
          });
        });
      });
    }
  };

})();
