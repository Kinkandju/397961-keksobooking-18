'use strict';

(function () {

  var filters = document.querySelector('.map__filters');
  var filterElements = {
    selects: filters.querySelectorAll('.map__filter'),
    features: filters.querySelectorAll('input[name="features"]'),
  };

  var featureWifi = document.querySelector('#filter-wifi');
  var featureDishwasher = document.querySelector('#filter-dishwasher');
  var featureParking = document.querySelector('#filter-parking');
  var featureWasher = document.querySelector('#filter-washer');
  var featureElevator = document.querySelector('#filter-elevator');
  var featureConditioner = document.querySelector('#filter-conditioner');

  var housingType = filters.querySelector('#housing-type').value;
  var housingPrice = filters.querySelector('#housing-price').value;
  var housingRooms = filters.querySelector('#housing-rooms').value;
  var housingGuests = filters.querySelector('#housing-guests').value;

  var Prices = {
    'low': {
      min: 0,
      max: 10000
    },
    'middle': {
      min: 10000,
      max: 50000
    },
    'high': 50000
  };

  var defaultValue = 'any';

  // Фильтр по типу жилья
  var filterByHousingType = function (it) {
    return (it.offer.type === housingType) || (housingType === defaultValue);
  };

  // Фильтр по цене
  var filterByHousingPrice = function (it) {
    if (housingPrice === defaultValue) {
      return true;
    }
    if (housingPrice === 'high') {
      return it.offer.price >= Prices[housingPrice];
    }
    return it.offer.price >= Prices[housingPrice].min &&
   it.offer.price < Prices[housingPrice].max;
  };

  // Фильтр по количеству комнат
  var filterByHousingRooms = function (it) {
    return (it.offer.rooms.toString() === housingRooms) || (housingRooms === defaultValue);
  };

  // Фильтр по количеству гостей
  var filterByHousingGuests = function (it) {
    return (it.offer.guests.toString() === housingGuests) || (housingGuests === defaultValue);
  };

  // Фильтр удобств
  var filterByFeature = function (feature, it) {
    return (!feature.checked) || (it.offer.features.indexOf(feature.value) !== -1);
  };

  window.filters = {
    filterPins: function (it) {
      return filterByHousingType(it) &&
    filterByHousingPrice(it) &&
    filterByHousingGuests(it) &&
    filterByHousingRooms(it) &&
    filterByFeature(featureWifi, it) &&
    filterByFeature(featureDishwasher, it) &&
    filterByFeature(featureParking, it) &&
    filterByFeature(featureConditioner, it) &&
    filterByFeature(featureElevator, it) &&
    filterByFeature(featureWasher, it);
    },

    HousingMap: {
      'housing-type': function (value) {
        housingType = value;
      },
      'housing-price': function (value) {
        housingPrice = value;
      },
      'housing-guests': function (value) {
        housingGuests = value;
      },
      'housing-rooms': function (value) {
        housingRooms = value;
      }
    },

    // Сброс фильтра
    clearFilters: function () {
      filterElements.selects.forEach(function (select) {
        select.value = defaultValue;
      });
      filterElements.features.forEach(function (feature) {
        feature.removeAttribute('checked');
      });
    }
  };

})();
