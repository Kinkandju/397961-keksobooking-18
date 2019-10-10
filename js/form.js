'use strict';

(function () {

  var ENTER_KEYCODE = 13;

  // ----Реализация сценария переключения режимов страницы----

  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');

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

  // Событие при нажатой кнопки мыши над главной меткой:
  // - Активация карты
  // - Отрисовка пинов
  // - Отрисовка объявлений
  // - Удаление атрибута disabled
  window.mainPin.addEventListener('mousedown', function () {
    // В поле "адрес" записываются координаты главной метки
    var address = adForm.querySelector('input[name="address"]');
    var coordinateX = window.mainPin.offsetLeft;
    var coordinateY = window.mainPin.offsetTop;
    address.value = coordinateX + ', ' + coordinateY;

    window.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.similarElementPin.appendChild(window.fragment);
    // window.renderCards(window.advertisments);
    removeDisabledFieldset();
  });

  // Событие при нажатии на Enter при фокусе над главной меткой
  window.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.similarElementPin.appendChild(window.fragment);
      // window.renderCards(window.advertisments);
      removeDisabledFieldset();
    }
  });

  // ----Взаимодействие с формой----

  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var inputCapacityOptions = capacity.querySelectorAll('option');

  // Удаление всех элементов (option) из кол-ва мест для гостей
  var inputRoomValidateNumber = function () {
    inputCapacityOptions.forEach(function (element) {
      element.remove();
    });

    // Конструкция switch заменяет собой сразу несколько if
    // и представляет собой более наглядный способ сравнить выражение сразу с несколькими вариантами
    switch (roomNumber.selectedIndex) {
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
      capacity.appendChild(inputCapacityOptions[element]);
    });
  };

  inputRoomValidateNumber();

  // Событие при выборе/изменении кол-ва комнат
  roomNumber.addEventListener('change', inputRoomValidateNumber);

})();
