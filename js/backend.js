'use strict';

(function () {

  var Url = {
    DOWNLOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var CODE_SUCCESS = 200;

  var xhrSetup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = xhrSetup(onLoad, onError);

      xhr.open('POST', Url.UPLOAD);
      xhr.send(data);
    },

    load: function (onLoad, onError) {
      var xhr = xhrSetup(onLoad, onError);

      xhr.open('GET', Url.DOWNLOAD);
      xhr.send();
    }
  };

})();
