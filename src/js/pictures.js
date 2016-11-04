'use strict';
var filters = document.querySelector('.filters');
var load = require('./load');
var Picture = require('./picture');
var PICTURE_LOAD_URL = 'http://localhost:1507/api/pictures';
var gallery = require('./gallery.js');

var container = document.querySelector('.pictures');
filters.classList.add('hidden');

var renderPictures = function(_pictures) {
  _pictures.forEach(function(picture, imageId) {
    container.appendChild(new Picture(picture, imageId).element);
  });

  gallery.setPictures(_pictures);
  filters.classList.remove('hidden');
};

load(PICTURE_LOAD_URL, renderPictures);

