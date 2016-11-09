'use strict';
var filters = document.querySelector('.filters');
var load = require('./load');
var Picture = require('./picture');
var picturesContainer = document.querySelector('.pictures');
var PICTURE_LOAD_URL = 'http://localhost:1507/api/pictures';
var gallery = require('./gallery.js');
var PAGE_SIZE = 12;
var currentPage = 0;

var getParams = function(currentPage, filter) {
  var from = currentPage * PAGE_SIZE;
  var to = from + PAGE_SIZE;
  return [from, to];
};

console.log(currentPage);


var container = document.querySelector('.pictures');
filters.classList.add('hidden');

var renderPictures = function(_pictures, replace) {
  if (replace) {
    picturesContainer.innerHTML = '';
  }
  _pictures.forEach(function(picture, imageId) {
    container.appendChild( new Picture(picture, imageId).element);
  });

  gallery.setPictures(_pictures);
  filters.classList.remove('hidden');
};

var isNextPageAvailable = function(_pictures) {
  return currentPage <= Math.floor(_pictures.length / PAGE_SIZE);
};

var isBottomReached = function() {
  var GAP = 100;
  var footerElement = document.querySelector('footer');
  var footerPosition = footerElement.getBoundingClientRect();
  return footerPosition.top - window.innerHeight - 100 <= 0;
};

window.addEventListener('scroll', function(_pictures, evt) {
  if (isBottomReached() &&
      isNextPageAvailable(_pictures, currentPage, PAGE_SIZE)) {
    currentPage++;
    renderPictures(_pictures, currentPage);
  }
});

load(PICTURE_LOAD_URL, getParams, renderPictures );
