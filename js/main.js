'use strict';

var OBJECT_COUNT = 8;
var ACCOMODATION_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var pinData = {
  WIDTH_PIN: 50,
  HEIGHT_PIN: 70
};

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Случайный элемент массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Случайное число в диапазоне
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Массив случайных элементов
var getRandomArray = function (array) {
  var length = getRandomInteger(1, array.length);
  var resultedArr = [];

  for (var j = 0; j < length; j++) {
    resultedArr.push(getRandomElement(array));
  }

  return resultedArr;
};

var advertisments = [];

// Создание массива случайных объявлений
for (var i = 0; i < OBJECT_COUNT; i++) {
  var tempX = getRandomInteger(MIN_X, MAX_X);
  var tempY = getRandomInteger(MIN_Y, MAX_Y);

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
      type: getRandomElement(ACCOMODATION_TYPES),
      rooms: 2,
      guests: 2,
      checkin: getRandomElement(TIME),
      checkout: getRandomElement(TIME),
      features: getRandomArray(features),
      description: 'Описание',
      photos: getRandomArray(photos)
    },
    location: {
      x: tempX,
      y: tempY
    }
  });
}

// Переключение карты в активное состояние
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Элемент куда будут вставлены метки
var similarElementPin = map.querySelector('.map__pins');

// Шаблон метки объявления
var similarPinTemplate = document.querySelector('#pin')
    .content;

var renderAdvertisment = function (advertisment) {
  var advertismentElement = similarPinTemplate.cloneNode(true);

  advertismentElement.querySelector('.map__pin').style = 'left: ' + (advertisment.location.x - pinData.WIDTH_PIN / 2) + 'px; top: ' + advertisment.location.y + 'px';
  advertismentElement.querySelector('img').src = advertisment.author.avatar.src;
  advertismentElement.querySelector('img').alt = advertisment.offer.title;

  return advertismentElement;
};

// Создание элементов, соответствующих меткам на карте по массиву advertisments
var fragment = document.createDocumentFragment();
for (var j = 0; j < advertisments.length; j++) {
  fragment.appendChild(renderAdvertisment(advertisments[j]));
}

similarElementPin.appendChild(fragment);
