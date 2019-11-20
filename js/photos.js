'use strict';
(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_PREVIEW_WIDTH = 70;

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var defaultAvatar = avatarPreview.src;

  var housePhotoChooser = document.querySelector('#images');
  var housePhotoContainer = document.querySelector('.ad-form__photo-container');
  var housePhotoPreview = document.querySelector('.ad-form__photo');

  var checkFileType = function (file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var renderPreview = function (file, preview) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  };

  var renderHousePhotos = function (files) {
    var fragment = document.createDocumentFragment();
    var currentImage;

    var fileList = Array.prototype.slice.call(files);

    fileList.forEach(function (file) {
      if (file && checkFileType(file)) {
        currentImage = document.createElement('img');
        currentImage.width = IMAGE_PREVIEW_WIDTH;
        housePhotoPreview.appendChild(currentImage);
        renderPreview(file, currentImage);
        fragment.appendChild(housePhotoPreview);
        housePhotoPreview = housePhotoPreview.cloneNode();
      }
    });
    housePhotoContainer.appendChild(fragment);
  };

  window.photos = {
    // Сброс аватара
    setDefaultAvatar: function () {
      avatarPreview.src = defaultAvatar;
    },

    // Удаление изображений
    clear: function () {
      var photos = Array.prototype.slice.call(housePhotoContainer.querySelectorAll('.ad-form__photo'));
      if (photos.length >= 1) {
        photos.forEach(function (photo, index) {
          if (photo.querySelector('img') && index === 0) {
            (photo.querySelector('img')).remove();
          } else {
            photo.remove();
          }
        });
      }
    }
  };

  // Событие при выборе/изменении изображения аватара пользователя
  avatarChooser.addEventListener('change', function () {
    var avatarFile = avatarChooser.files[0];
    if (avatarFile && checkFileType(avatarFile)) {
      renderPreview(avatarFile, avatarPreview);
    }
  });

  // Событие при выборе/изменении изображения жилья
  housePhotoChooser.addEventListener('change', function () {
    renderHousePhotos(housePhotoChooser.files);
  });

})();
