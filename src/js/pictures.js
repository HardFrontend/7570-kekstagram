'use strict';
var filters = document.querySelector('.filters');
var load = require('./load');
var getPicturesElement = require('./picture');
var PICTURE_LOAD_URL = 'http://localhost:1507/api/pictures';
var gallery = require('./gallery.js');

var container = document.querySelector('.pictures');
filters.classList.add('hidden');

var renderPictures = function(_pictures) {
  _pictures.forEach(function(picture) {
    container.appendChild(getPicturesElement(picture));
  });

  gallery.setPictures(_pictures);
  filters.classList.remove('hidden');
};

load(PICTURE_LOAD_URL, renderPictures);

module.exports = renderPictures;
