'use strict';

(function () {

  var PinData = {
    WIDTH_PIN: 50,
    HEIGHT_PIN: 70
  };

  // Элемент куда будут вставлены метки
  var similarElementPin = window.map.querySelector('.map__pins');
  window.similarElementPin = similarElementPin;

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

  // Создание объявлений, соответствующих меткам на карте (по массиву advertisments)
  var fragment = document.createDocumentFragment();
  window.fragment = fragment;
  for (var j = 0; j < window.advertisments.length; j++) {
    fragment.appendChild(renderPin(window.advertisments[j]));
  }

})();
