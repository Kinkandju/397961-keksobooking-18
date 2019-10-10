'use strict';

(function () {

  // var ESC_KEYCODE = 27;
  var OBJECT_COUNT = 8;
  var ACCOMODATION_TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var AccomodationTypes = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  // Массив объявлений
  var advertisments = [];
  window.advertisments = advertisments;

  // Добавление случайных объявлений в массив с помощью цикла
  for (var i = 0; i < OBJECT_COUNT; i++) {
    var tempX = window.getRandomInteger(MIN_X, MAX_X);
    var tempY = window.getRandomInteger(MIN_Y, MAX_Y);

    advertisments.push({
      author: {
        avatar: {
          src: 'img/avatars/user0' + (i + 1) + '.png'
        }
      },
      offer: {
        title: 'Заголовок объявления',
        address: tempX + ', ' + tempY,
        price: 5000,
        type: window.getRandomElement(ACCOMODATION_TYPES),
        rooms: 2,
        guests: 2,
        checkin: window.getRandomElement(TIME),
        checkout: window.getRandomElement(TIME),
        features: window.getRandomArray(FEATURES),
        description: 'Описание',
        photos: window.getRandomArray(PHOTOS)
      },
      location: {
        x: tempX,
        y: tempY
      }
    });
  }

  // Шаблон модального окна объявления
  var similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  // Переменная блока фильтрации объявлений
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  // Отрисовка модального окна объявления
  var renderCards = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = AccomodationTypes[card.offer.type.toUpperCase()];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.rooms + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar.src;
    cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));
    cardElement.querySelector('.popup__photos').appendChild(getPhotosList(card.offer.photos));
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(getFeaturesList(card.offer.features));

    mapFiltersContainer.insertAdjacentElement('beforebegin', cardElement);
  };
  window.renderCards = renderCards;

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

})();
