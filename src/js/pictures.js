'use strict';
var filters = document.querySelector('.filters');
var load = require('./load');
var Picture = require('./picture');
var picturesContainer = document.querySelector('.pictures');
var PICTURE_LOAD_URL = 'http://localhost:1507/api/pictures';
var gallery = require('./gallery.js');
var PAGE_SIZE = 12;
var pageNumber = 0;

var container = document.querySelector('.pictures');
filters.classList.add('hidden');

var renderPictures = function(_pictures, replace) {
  if (replace) {
    picturesContainer.innerHTML = '';
  }
  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  _pictures.slice(from, to).forEach(function(picture, imageId) {
    container.appendChild( new Picture(picture, imageId).element);
  });

  gallery.setPictures(_pictures);
  filters.classList.remove('hidden');
};

var isNextPageAvailable = function(page) {
  return page < Math.floor(_pictures.length / PAGE_SIZE);
};

var isBottomReached = function() {
  var GAP = 100;
  var footerElement = document.querySelector('footer');
  var footerPosition = footerElement.getBoundingClientRect();
  return footerPosition.top - window.innerHeight - 100 <= 0;
};

var setScrollEnabled = function(_pictures) {
  window.addEventListener('scroll', function(evt) {
    if (isBottomReached() &&
      isNextPageAvailable(_pictures, pageNumber, PAGE_SIZE)) {
      pageNumber++;
      renderPictures(_pictures, pageNumber);
    }
  });
};



load(PICTURE_LOAD_URL, renderPictures, setScrollEnabled());

