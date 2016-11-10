'use strict';
var filters = document.querySelector('.filters');
var load = require('./load');
var Picture = require('./picture');
var picturesContainer = document.querySelector('.pictures');
var PICTURE_LOAD_URL = 'http://localhost:1507/api/pictures';
var gallery = require('./gallery.js');
var PAGE_SIZE = 12;
var lastPageReached = false;
var currentPage = 0;
var THROTTLE_DELAY = 100;
var allPictures = [];

var getParams = function() {
  return {
    from: currentPage * PAGE_SIZE,
    to: currentPage * PAGE_SIZE + PAGE_SIZE,
    filter: 'filter-popular'
  };
};

var container = document.querySelector('.pictures');
filters.classList.add('hidden');

var renderPictures = function(_pictures, allPictures, replace) {
  if (replace) {
    container.innerHTML = '';
  }
  _pictures.forEach(function(picture, imageId) {
    container.appendChild( new Picture(picture, currentPage * PAGE_SIZE + imageId).element);
  });

  gallery.setPictures(allPictures);
  filters.classList.remove('hidden');
};

var isBottomReached = function() {
  var GAP = 100;
  var footerElement = document.querySelector('footer');
  var footerPosition = footerElement.getBoundingClientRect();
  return footerPosition.top - window.innerHeight - GAP <= 0;
};

var processData = function(data, _pictures) {
  if(data.length < 12) {
    lastPageReached = true;
  }
  allPictures = allPictures.concat(_pictures);
  renderPictures(data, allPictures);
};

var setScrollEnabled = function() {
  var lastCall = Date.now();
  window.addEventListener('scroll', function(evt) {
    if (Date.now() - lastCall >= THROTTLE_DELAY) {

      if (isBottomReached() && !lastPageReached) {
        currentPage++;
        load(PICTURE_LOAD_URL, getParams(), processData, setScrollEnabled());
      }

      lastCall = Date.now();
    }
  });
};


load(PICTURE_LOAD_URL, getParams(), processData, setScrollEnabled());
