'use strict';

(function () {

  var ESC_KEYCODE = 27;
  window.card.ESC_KEYCODE = ESC_KEYCODE;
  var AccomodationTypes = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  // Шаблон модального окна объявления
  var similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  // Переменная, куда запишется отрисовка модального окна объявления
  var card;

  // Функция закрытия модального окна при нажатии Esc
  var onKeyEsc = function (evt) {
    if (card && evt.keyCode === ESC_KEYCODE) {
      window.card.closeCard();
    }
  };

  // Закрытие модального окна объявления
  var closeCard = function () {
    if (card) {
      card.querySelector('.popup__close').removeEventListener('click', window.card.closeCard);
      document.removeEventListener('keydown', window.card.onKeyEsc);
      card.remove();
    }
  };

  // Функция генерации списка удобств
  var getFeaturesList = function (featureObject) {
    var fragmentFeature = document.createDocumentFragment();

    for (var f = 0; f < featureObject.length; f++) {
      var featureElementList = document.createElement('li');
      featureElementList.textContent = featureObject[f];
      featureElementList.className = 'popup__feature popup__feature--' + featureObject[f];
      fragmentFeature.appendChild(featureElementList);
    }
    return fragmentFeature;
  };

  // Функция генерации списка изображений
  var getPhotosList = function (photoObject) {
    var fragmentPhoto = document.createDocumentFragment();

    for (var p = 0; p < photoObject.length; p++) {
      var photoElement = document.createElement('img');

      photoElement.className = 'popup__photo';
      photoElement.src = photoObject[p];
      photoElement.alt = 'Фото для объявления';
      photoElement.setAttribute('width', '45');
      photoElement.setAttribute('height', '40');

      fragmentPhoto.appendChild(photoElement);
    }
    return fragmentPhoto;
  };

  window.card = {
    // Отрисовка модального окна объявления
    renderCards: function (cardData) {
      // Удаление предыдущего модального окна объявления
      closeCard();

      var cardElement = similarCardTemplate.cloneNode(true);

      cardElement.querySelector('.popup__title').textContent = cardData.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = cardData.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = AccomodationTypes[cardData.offer.type.toUpperCase()];
      cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.rooms + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
      cardElement.querySelector('.popup__description').textContent = cardData.offer.description;
      cardElement.querySelector('.popup__avatar').src = cardData.author.avatar;
      cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));
      cardElement.querySelector('.popup__photos').appendChild(getPhotosList(cardData.offer.photos));
      cardElement.querySelector('.popup__features').innerHTML = '';
      cardElement.querySelector('.popup__features').appendChild(getFeaturesList(cardData.offer.features));

      // Вставка модального окна объявления в разметку/DOM
      document.querySelector('.map').insertBefore(cardElement, document.querySelector('.map__filters-container'));

      // Перенос модального окна объявления
      card = document.querySelector('.map__card');

      // Закрытие модального окна при клике
      cardElement.querySelector('.popup__close').addEventListener('click', closeCard);

      // Закрытие модального окна при нажатии Esc
      cardElement.querySelector('.popup__close').addEventListener('keydown', onKeyEsc);
    }
  };

})();
