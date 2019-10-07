'use strict';

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
var PinData = {
  WIDTH_PIN: 50,
  HEIGHT_PIN: 70
};

// Случайный элемент массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Случайное число в диапазоне
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Массив случайных элементов в массиве
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
      features: getRandomArray(FEATURES),
      description: 'Описание',
      photos: getRandomArray(PHOTOS)
    },
    location: {
      x: tempX,
      y: tempY
    }
  });
}

// Переключение карты в активное состояние
var map = document.querySelector('.map');
// map.classList.remove('map--faded');

// Элемент куда будут вставлены метки
var similarElementPin = map.querySelector('.map__pins');

// Шаблон метки объявления
var similarPinTemplate = document.querySelector('#pin')
    .content;

// Отрисовка метки
var renderAdvertisment = function (advertisment) {
  var advertismentElement = similarPinTemplate.cloneNode(true);

  advertismentElement.querySelector('.map__pin').style.left = advertisment.location.x - PinData.WIDTH_PIN / 2 + 'px';
  advertismentElement.querySelector('.map__pin').style.top = advertisment.location.y - PinData.HEIGHT_PIN + 'px';
  advertismentElement.querySelector('img').src = advertisment.author.avatar.src;
  advertismentElement.querySelector('img').alt = advertisment.offer.title;

  return advertismentElement;
};

// Создание элементов, соответствующих меткам на карте по массиву advertisments
var fragment = document.createDocumentFragment();
for (var j = 0; j < advertisments.length; j++) {
  fragment.appendChild(renderAdvertisment(advertisments[j]));
}

// similarElementPin.appendChild(fragment);

// -----------------------------------------------------------------------------------------------------
// Функция генерации списка удобств
// var getFeaturesList = function (featureObject) {
//   var fragmentFeature = document.createDocumentFragment();
//
//   for (var f = 0; f < featureObject.length; f++) {
//     var featureElementList = document.createElement('li');
//     featureElementList.textContent = featureObject[f];
//     featureElementList.className = 'popup__feature popup__feature--' + featureObject[f];
//     fragmentFeature.appendChild(featureElementList);
//   }
//   return fragmentFeature;
// };

// Функция генерации списка изображений
// var getPhotosList = function (photoObject) {
//   var fragmentPhoto = document.createDocumentFragment();
//
//   for (var p = 0; p < photoObject.length; p++) {
//     var photoElement = document.createElement('img');
//
//     photoElement.className = 'popup__photo';
//     photoElement.src = photoObject[p];
//     photoElement.alt = 'Фото для объявления';
//     photoElement.setAttribute('width', '45');
//     photoElement.setAttribute('height', '40');
//
//     fragmentPhoto.appendChild(photoElement);
//   }
//   return fragmentPhoto;
// };

// Шаблон модального окна объявления
// var similarCardTemplate = document.querySelector('#card')
// .content
// .querySelector('.map__card');

// Переменная блока фильтрации объявлений
// var mapFiltersContainer = document.querySelector('.map__filters-container');

// Отрисовка модального окна объявления
// var renderCards = function (card) {
//   var cardElement = similarCardTemplate.cloneNode(true);
//
//   cardElement.querySelector('.popup__title').textContent = card.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
//   cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
//   cardElement.querySelector('.popup__type').textContent = AccomodationTypes[card.offer.type.toUpperCase()];
//   cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.rooms + ' гостей';
//   cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
//   cardElement.querySelector('.popup__description').textContent = card.offer.description;
//   cardElement.querySelector('.popup__avatar').src = card.author.avatar.src;
//
//   cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));
//   cardElement.querySelector('.popup__photos').appendChild(getPhotosList(card.offer.photos));
//
//   cardElement.querySelector('.popup__features').innerHTML = '';
//   cardElement.querySelector('.popup__features').appendChild(getFeaturesList(card.offer.features));
//
//   mapFiltersContainer.insertAdjacentElement('beforebegin', cardElement);
// };
//
// renderCards(advertisments[0]);

// ---------------Реализация сценария переключения режимов страницы---------------
var adForm = document.querySelector('.ad-form');
var formFieldset = adForm.querySelectorAll('fieldset');

// Добавление атрибута disabled для полей формы
var addDisabledFieldset = function () {
  for (var d = 0; d < formFieldset.length; d++) {
    formFieldset[d].disabled = true;
  }
};
addDisabledFieldset();

// Удаление атрибута disabled для полей формы
var removeDisabledFieldset = function () {
  for (var r = 0; r < formFieldset.length; r++) {
    formFieldset[r].removeAttribute('disabled');
  }
};

var mainPin = document.querySelector('.map__pin--main');

// var mainPinData = {
//   WIDTH_PIN: 65,
//   HEIGHT_PIN: 65
// };

// Событие при нажатой кнопки мыши над элементом
mainPin.addEventListener('mousedown', function () {
  var address = adForm.querySelector('input[name="address"]');
  var coordinateX = mainPin.offsetLeft;
  var coordinateY = mainPin.offsetTop;

  address.value = coordinateX + ', ' + coordinateY;

  map.classList.remove('map--faded');
  removeDisabledFieldset();
  adForm.classList.remove('ad-form--disabled');
  similarElementPin.appendChild(fragment);
});

var ENTER_KEYCODE = 13;

// Событие открытия попапа по нажатию на Enter при фокусе
mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    map.classList.remove('map--faded');
    removeDisabledFieldset();
    adForm.classList.remove('ad-form--disabled');
    similarElementPin.appendChild(fragment);
  }
});

var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');

// Добавление атрибута disabled для полей выбора комнаты
var addDisableRoom = function () {
  for (var m = 0; m < capacity.length; m++) {
    capacity[m].disabled = true;
  }
};

// Функция перебора селекторов и удаления у них атрибута disabled
var onRoomNumberChange = function (evt) {
  addDisableRoom();

  if (evt.target.value === '100') {
    var choosenValue = '0';
  } else {
    choosenValue = evt.target.value;
  }
  for (var v = 0; v < capacity.length; v++) {
    if (capacity[v].value === choosenValue) {
      capacity[v].disabled = false;
    } else if (capacity[v].value <= choosenValue && capacity[v].value > 0) {
      capacity[v].disabled = false;
    }
  }
};

roomNumber.addEventListener('change', onRoomNumberChange);
