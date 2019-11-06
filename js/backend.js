'use strict';

(function () {

  var Url = {
    DOWNLOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var CODE_SUCCESS = 200;

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onLoad(xhr.response);
      } else {
        // onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        onError('Ошибка загрузки объявления');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    return xhr;
  };

  var loadData = function (onLoad, onError) {
    var xhr = window.load(onLoad, onError);

    xhr.open('GET', Url.DOWNLOAD);
    xhr.send();
  };

  var saveData = function (data, onLoad, onError) {
    var xhr = window.load(onLoad, onError);

    xhr.open('POST', Url.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    save: saveData
  };

})();
