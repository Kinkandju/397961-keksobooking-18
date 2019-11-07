'use strict';

(function () {

  // Минимальные цены для разных типов жилья
  var MIN_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  // var adForm = document.querySelector('.ad-form');
  // window.adForm = adForm;

  // ----Реализация сценария переключения режимов страницы----

  window.form = {
    adForm: document.querySelector('.ad-form'),

    // Добавление атрибута disabled для полей формы
    addDisabledFieldset: function () {
      for (var i = 0; i < formFieldset.length; i++) {
        formFieldset[i].disabled = true;
      }
    },

    // Удаление атрибута disabled для полей формы
    removeDisabledFieldset: function () {
      for (var j = 0; j < formFieldset.length; j++) {
        formFieldset[j].removeAttribute('disabled');
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

  var formFieldset = window.form.adForm.querySelectorAll('fieldset');
  var titleInput = window.form.adForm.querySelector('#title');
  var priceInput = window.form.adForm.querySelector('#price');
  var typeInput = window.form.adForm.querySelector('#type');
  var timeInInput = window.form.adForm.querySelector('#timein');
  var timeOutInput = window.form.adForm.querySelector('#timeout');
  var roomNumberInput = window.form.adForm.querySelector('#room_number');
  var capacityInput = window.form.adForm.querySelector('#capacity');

  window.form.addDisabledFieldset();

  // В поле "адрес" записываются координаты главной метки (неактивное состояние)
  window.map.getAddress();

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

  // Валидация формы ввода стоимости определенного типа жилья
  typeInput.addEventListener('change', function (evt) {
    var priceValue = MIN_PRICES[evt.target.value];

    priceInput.setAttribute('min', priceValue);
    priceInput.setAttribute('placeholder', priceValue);
  });

  // Изменение плейсхолдера для соответствия типа жилья и цены
  priceInput.placeholder = MIN_PRICES.flat;

  // Событие при выборе/изменении времени заезда
  timeInInput.addEventListener('change', function (evt) {
    var value = evt.target.value;

    timeOutInput.value = value;
  });

  // Событие при выборе/изменении времени выезда
  timeOutInput.addEventListener('change', function (evt) {
    var value = evt.target.value;

    timeInInput.value = value;
  });

  // ----Отправка формы----

  var formSend = function () {
    window.map.mapAds.classList.add('hidden');
  };

  var errorHandler = function (errorMessage) {
    var similarErrorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

    var nodeError = similarErrorTemplate.cloneNode(true);
    nodeError.querySelector('.error__message').textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', nodeError);

    // Кнопка закрытия окна об ошибке
    var errorButton = document.querySelector('.error__button');

    // Событие клика на кнопку закрытия
    errorButton.addEventListener('click', function () {
      // closePopup();
      nodeError.classList.add('hidden');
      similarErrorTemplate.style = '';
    });

    // Событие клика на на произвольную область экрана
    nodeError.addEventListener('click', function () {
      // closePopup();
      nodeError.classList.add('hidden');
      similarErrorTemplate.style = '';
    });

    // Событие нажатия клавиши Esc на произвольную область экрана
    nodeError.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.card.ESC_KEYCODE) {
        // closePopup();
        nodeError.classList.add('hidden');
        similarErrorTemplate.style = '';
      }
    });

    // Функция удаления обработчика закрытия попапа по нажатию на Esc
    // var onPopupEscPress = function (evt) {
    //   if (evt.keyCode === window.card.ESC_KEYCODE) {
    //     closePopup();
    //   }
    // };

    // Функция закрытия попапа
    // var closePopup = function () {
    //   nodeError.classList.add('hidden');
    //   document.removeEventListener('keydown', onPopupEscPress);
    // };

  };

  var showError = function (errorMessage) {
    errorHandler(errorMessage);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    var successHandler = function (successMessage) {
      var similarSuccessTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

      var nodeSuccess = similarSuccessTemplate.cloneNode(true);
      nodeSuccess.querySelector('.success__message').textContent = successMessage;

      document.body.insertAdjacentElement('afterbegin', nodeSuccess);
    };

    var showSuccess = function (successMessage) {
      successHandler(successMessage);
    };

    showSuccess();

    window.backend.save(new FormData(window.form.adForm), formSend, showError);

  };

  window.form.adForm.addEventListener('submit', onFormSubmit);

})();
