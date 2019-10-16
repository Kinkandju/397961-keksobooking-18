'use strict';

(function () {

  window.data = {
    // Случайный элемент массива
    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    // Случайное число в диапазоне
    getRandomInteger: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Массив случайных элементов в массиве
    getRandomArray: function (array) {
      var length = window.data.getRandomInteger(1, array.length);
      var resultedArr = [];

      for (var j = 0; j < length; j++) {
        resultedArr.push(window.data.getRandomElement(array));
      }
      return resultedArr;
    }
  };

})();
