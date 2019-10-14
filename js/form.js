'use strict';

(function () {

  var ENTER_KEYCODE = 13;

  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var titleInput = adForm.querySelector('#title');
  var priceInput = adForm.querySelector('#price');
  var typeInput = adForm.querySelector('#type');
  // var addressInput = adForm.querySelector('#address');
  var timeInInput = adForm.querySelector('#timein');
  var timeOutInput = adForm.querySelector('#timeout');
  var roomNumberInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');

  // ----Реализация сценария переключения режимов страницы----

  // Добавление атрибута disabled для полей формы
  var addDisabledFieldset = function () {
    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = true;
    }
  };
  addDisabledFieldset();

  // Удаление атрибута disabled для полей формы
  var removeDisabledFieldset = function () {
    for (var j = 0; j < formFieldset.length; j++) {
      formFieldset[j].removeAttribute('disabled');
    }
  };

  // Функция выполняющая:
  // - Активацию карты
  // - Отрисовку пинов
  // - Отрисовку объявлений
  // - Удаление атрибута disabled
  var getPopupOpen = function () {
    // Функция переноса данных координат в поле "адрес"
    var getAddress = function () {
      var coordinateX = window.mainPin.offsetLeft;
      var coordinateY = window.mainPin.offsetTop;
      adForm.querySelector('#address').value = coordinateX + ', ' + coordinateY;
    };
    // В поле "адрес" записываются координаты главной метки
    getAddress();

    window.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.similarElementPin.appendChild(window.fragment);
    window.renderCards(window.advertisments[0]);
    removeDisabledFieldset();
  };

  // Событие при нажатой кнопки мыши над главной меткой:
  window.mainPin.addEventListener('mousedown', function () {
    getPopupOpen();
  });

  // Событие при нажатии на Enter при фокусе над главной меткой
  window.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      getPopupOpen();
    }
  });

  // ----Взаимодействие с формой----

  // Все элементы option, которые находятся в #capacity
  var inputCapacityOptions = capacityInput.querySelectorAll('option');

  // Удаление всех элементов (option) из кол-ва мест для гостей
  var inputRoomValidateNumber = function () {
    inputCapacityOptions.forEach(function (element) {
      element.remove();
    });

    // Конструкция switch заменяет собой сразу несколько if
    // и представляет собой более наглядный способ сравнить выражение сразу с несколькими вариантами
    switch (roomNumberInput.selectedIndex) {
      case 0:
        insertInputCapacityOptions([2]);
        break;
      case 1:
        insertInputCapacityOptions([2, 1]);
        break;
      case 2:
        insertInputCapacityOptions([2, 1, 0]);
        break;
      case 3:
        insertInputCapacityOptions([3]);
        break;
    }
  };

  // Добавление элементов (option) после их перебора в кол-во мест для гостей
  // (после последовательного сравнения всех вариантов roomNumber.selectedIndex со всеми вариантами из case)
  var insertInputCapacityOptions = function (elements) {
    elements.forEach(function (element) {
      capacityInput.appendChild(inputCapacityOptions[element]);
    });
  };

  inputRoomValidateNumber();

  // Событие при выборе/изменении кол-ва комнат
  roomNumberInput.addEventListener('change', inputRoomValidateNumber);

  // ----Валидация полей формы----

  // Валидация формы ввода заголовка объявления
  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  // Минимальные цены для разных типов жилья
  var MIN_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  // Валидация формы ввода стоимости определенного типа жилья
  typeInput.addEventListener('change', function (evt) {
    var priceValue = MIN_PRICES[evt.target.value];

    priceInput.setAttribute('min', priceValue);
    priceInput.setAttribute('placeholder', priceValue);
  });

  // Изменение плейсхолдера для соответствия типа жилья и цены
  priceInput.placeholder = MIN_PRICES.flat;

  // Все элементы option, которые находятся в #timeout
  var inputTimeOutOptions = timeOutInput.querySelectorAll('option');

  // Удаление всех элементов (option) из времени выезда
  var inputTimeInValidateOptions = function () {
    inputTimeOutOptions.forEach(function (element) {
      element.remove();
    });

    // Конструкция switch заменяет собой сразу несколько if
    // и представляет собой более наглядный способ сравнить выражение сразу с несколькими вариантами
    switch (timeInInput.selectedIndex) {
      case 0:
        insertInputTimeInOptions([0]);
        break;
      case 1:
        insertInputTimeInOptions([1]);
        break;
      case 2:
        insertInputTimeInOptions([2]);
        break;
    }
  };

  // Добавление элементов (option) после их перебора во время выезда
  // (после последовательного сравнения всех вариантов timeInInput.selectedIndex со всеми вариантами из case)
  var insertInputTimeInOptions = function (elements) {
    elements.forEach(function (element) {
      timeOutInput.appendChild(inputTimeOutOptions[element]);
    });
  };

  inputTimeInValidateOptions();

  // Событие при выборе/изменении времени заезда
  timeInInput.addEventListener('change', inputTimeInValidateOptions);

})();
