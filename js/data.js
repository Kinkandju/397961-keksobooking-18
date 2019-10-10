'use strict';

(function () {

  // Карта объявлений
  var map = document.querySelector('.map');
  window.map = map;

  // Случайный элемент массива
  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  window.getRandomElement = getRandomElement;

  // Случайное число в диапазоне
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  window.getRandomInteger = getRandomInteger;

  // Массив случайных элементов в массиве
  var getRandomArray = function (array) {
    var length = getRandomInteger(1, array.length);
    var resultedArr = [];

    for (var j = 0; j < length; j++) {
      resultedArr.push(getRandomElement(array));
    }

    return resultedArr;
  };
  window.getRandomArray = getRandomArray;

})();
