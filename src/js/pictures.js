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

var getParams = function() {
  return {
    from: currentPage * PAGE_SIZE,
    to: currentPage * PAGE_SIZE + PAGE_SIZE,
    filter: 'filter-popular'
  };
};

var container = document.querySelector('.pictures');
filters.classList.add('hidden');

var renderPictures = function(_pictures, replace) {
  if (replace) {
    picturesContainer.innerHTML = '';
  }
  _pictures.forEach(function(picture, imageId) {
    container.appendChild( new Picture(picture, currentPage * PAGE_SIZE + imageId).element);
  });

  gallery.setPictures(_pictures);
  filters.classList.remove('hidden');
};

var isBottomReached = function() {
  var GAP = 100;
  var footerElement = document.querySelector('footer');
  var footerPosition = footerElement.getBoundingClientRect();
  return footerPosition.top - window.innerHeight - GAP <= 0;
};

var processData = function(data) {
  if(data.length < 12) {
    lastPageReached = true;
  }
  renderPictures(data);
};

window.addEventListener('scroll', function(evt) {
  if (!lastPageReached) {
    currentPage++;
    load(PICTURE_LOAD_URL, getParams(), processData);
  }
});

load(PICTURE_LOAD_URL, getParams(), processData);
