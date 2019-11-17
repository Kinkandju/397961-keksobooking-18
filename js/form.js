'use strict';

(function () {

  // Минимальные цены для разных типов жилья
  var MIN_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var MAX_PRICE = 1000000;

  // ----Реализация сценария переключения режимов страницы----

  window.form = {
    adForm: document.querySelector('.ad-form'),
    formFieldset: document.querySelectorAll('fieldset'),
    titleInput: document.querySelector('#title'),
    priceInput: document.querySelector('#price'),
    typeInput: document.querySelector('#type'),
    timeInInput: document.querySelector('#timein'),
    timeOutInput: document.querySelector('#timeout'),
    roomNumberInput: document.querySelector('#room_number'),
    capacityInput: document.querySelector('#capacity'),
    descriptionInput: document.querySelector('#description'),

    // Добавление атрибута disabled для полей формы
    addDisabledFieldset: function () {
      for (var i = 0; i < window.form.formFieldset.length; i++) {
        window.form.formFieldset[i].disabled = true;
      }
    },

    // Удаление атрибута disabled для полей формы
    removeDisabledFieldset: function () {
      for (var j = 0; j < window.form.formFieldset.length; j++) {
        window.form.formFieldset[j].removeAttribute('disabled');
      }
    },

    // Активация попапа
    getPopupOpen: function () {
      // Активация карты/снятие затемнения c карты
      window.map.mapAds.classList.remove('map--faded');
      // Снятие затемнения c формы
      window.form.adForm.classList.remove('ad-form--disabled');
      // Удаление атрибута disabled
      window.form.removeDisabledFieldset();
    }
  };

  window.form.addDisabledFieldset();

  // В поле "адрес" записываются координаты главной метки (неактивное состояние)
  window.map.getAddress();

  // ----Взаимодействие с формой----

  // Все элементы option, которые находятся в #capacity
  var inputCapacityOptions = window.form.capacityInput.querySelectorAll('option');

  // Удаление всех элементов (option) из кол-ва мест для гостей
  var inputRoomValidateNumber = function () {
    inputCapacityOptions.forEach(function (element) {
      element.remove();
    });

    // Конструкция switch заменяет собой сразу несколько if
    // и представляет собой более наглядный способ сравнить выражение сразу с несколькими вариантами
    switch (window.form.roomNumberInput.selectedIndex) {
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
      window.form.capacityInput.appendChild(inputCapacityOptions[element]);
    });
  };

  inputRoomValidateNumber();

  // Событие при выборе/изменении кол-ва комнат
  window.form.roomNumberInput.addEventListener('change', inputRoomValidateNumber);

  // ----Валидация полей формы----

  // Валидация формы ввода заголовка объявления
  window.form.titleInput.addEventListener('input', function () {
    window.form.titleInput.checkValidity();
  });

  window.form.titleInput.addEventListener('invalid', function () {
    if (window.form.titleInput.validity.tooShort) {
      window.form.titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
      window.form.titleInput.style.border = '2px solid tomato';
    } else if (window.form.titleInput.validity.tooLong) {
      window.form.titleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
      window.form.titleInput.style.border = '2px solid tomato';
    } else if (window.form.titleInput.validity.valueMissing) {
      window.form.titleInput.setCustomValidity('Обязательное поле');
      window.form.titleInput.style.border = '2px solid tomato';
    } else {
      window.form.titleInput.setCustomValidity('');
      window.form.titleInput.style.border = 'none';
    }
  });

  // Валидация формы ввода цены за ночь
  window.form.priceInput.addEventListener('change', function () {
    window.form.priceInput.checkValidity();
  });

  window.form.priceInput.addEventListener('invalid', function () {
    if (window.form.priceInput.validity.rangeOverflow) {
      window.form.priceInput.setCustomValidity('Максимальное значение — ' + MAX_PRICE);
      window.form.priceInput.style.border = '2px solid tomato';
    } else if (window.form.priceInput.validity.valueMissing) {
      window.form.priceInput.setCustomValidity('Это обязательное поле');
      window.form.priceInput.style.border = '2px solid tomato';
    } else {
      window.form.priceInput.setCustomValidity('');
      window.form.priceInput.style.border = 'none';
    }
  });

  // Валидация формы ввода стоимости определенного типа жилья
  window.form.typeInput.addEventListener('change', function (evt) {
    var priceValue = MIN_PRICES[evt.target.value];

    window.form.priceInput.setAttribute('min', priceValue);
    window.form.priceInput.setAttribute('placeholder', priceValue);
  });

  // Изменение плейсхолдера для соответствия типа жилья и цены
  window.form.priceInput.placeholder = MIN_PRICES.flat;

  // Событие при выборе/изменении времени заезда
  window.form.timeInInput.addEventListener('change', function (evt) {
    var value = evt.target.value;

    window.form.timeOutInput.value = value;
  });

  // Событие при выборе/изменении времени выезда
  window.form.timeOutInput.addEventListener('change', function (evt) {
    var value = evt.target.value;

    window.form.timeInInput.value = value;
  });

})();
