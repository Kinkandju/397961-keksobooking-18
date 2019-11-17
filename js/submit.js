'use strict';

(function () {

  // ----Отправка формы----

  var formSend = function () {
    window.map.mapAds.classList.add('hidden');

    var successHandler = function () {
      var similarSuccessTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

      var nodeSuccess = similarSuccessTemplate.cloneNode(true);

      document.body.insertAdjacentElement('afterbegin', nodeSuccess);

      // Событие клика на на произвольную область экрана
      window.addEventListener('click', function () {
        closePopup();
        similarSuccessTemplate.style = '';
      });

      // Событие нажатия клавиши Esc на произвольную область экрана
      window.addEventListener('keydown', function (evtKey) {
        if (evtKey.keyCode === window.card.ESC_KEYCODE) {
          closePopup();
          similarSuccessTemplate.style = '';
        }
      });

      // Функция удаления обработчика закрытия попапа по нажатию на Esc
      var onPopupEscPress = function (evt) {
        if (evt.keyCode === window.card.ESC_KEYCODE) {
          closePopup();
        }
      };

      // Функция закрытия попапа
      var closePopup = function () {
        nodeSuccess.classList.add('hidden');
        window.removeEventListener('keydown', onPopupEscPress);
      };
    };

    var showSuccess = function (nodeSuccess) {
      successHandler(nodeSuccess);
    };

    showSuccess();
    pageStatus();
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
      closePopup();
      similarErrorTemplate.style = '';
    });

    // Событие клика на на произвольную область экрана
    window.addEventListener('click', function () {
      closePopup();
      similarErrorTemplate.style = '';
    });

    // Событие нажатия клавиши Esc на произвольную область экрана
    window.addEventListener('keydown', function (evtKey) {
      if (evtKey.keyCode === window.card.ESC_KEYCODE) {
        closePopup();
        similarErrorTemplate.style = '';
      }
    });

    // Функция удаления обработчика закрытия попапа по нажатию на Esc
    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.card.ESC_KEYCODE) {
        closePopup();
      }
    };

    // Функция закрытия попапа
    var closePopup = function () {
      nodeError.classList.add('hidden');
      window.removeEventListener('keydown', onPopupEscPress);
    };
  };

  var featuresFieldset = window.form.adForm.querySelectorAll('.feature__checkbox');

  // Активное и неактивное состояния страницы
  var pageStatus = function () {
    if (!window.map.isPageActive) {
      // Открытие попапа
      window.form.getPopupOpen();
      // Отрисовка меток
      window.pin.renderPinList();

      window.map.isPageActive = true;
    } else {
    // Затемнение карты
      window.map.mapAds.classList.add('map--faded');
      // Затемнение формы
      window.form.adForm.classList.add('ad-form--disabled');
      // Добавление атрибута disabled
      window.form.addDisabledFieldset();
      // Удаление меток
      window.pin.removePins();
      // Скрытие объявлений
      window.card.closeCard();
      // Координаты главной метки
      window.map.getMainPinAddress();
      // Сброс фильтра
      window.filters.clearFilters();

      // Сброс данных до исходного состояния
      var syncValues = function (element, value) {
        element.value = value;
      };

      syncValues(window.form.titleInput, '');
      syncValues(window.form.typeInput, 'flat');
      syncValues(window.form.priceInput, '1000');
      syncValues(window.form.timeInInput, '12:00');
      syncValues(window.form.timeOutInput, '12:00');
      syncValues(window.form.descriptionInput, '');
      syncValues(window.form.roomNumberInput, '1');
      syncValues(window.form.capacityInput, '1');

      featuresFieldset.forEach(function (element) {
        element.checked = false;
      });

      window.map.isPageActive = false;
    }
  };

  // Функция отправки формы на сервер
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.form.adForm), formSend, errorHandler);

    // Скрытие объявлений
    window.card.closeCard();
  };

  window.form.adForm.addEventListener('submit', onFormSubmit);

})();
