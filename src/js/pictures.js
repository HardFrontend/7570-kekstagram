'use strict';


var filters = document.querySelector('.filters');

//var pictures = [];

var container = document.querySelector('.pictures');
var template = document.querySelector('template');
var templateContainer = 'content' in template ? template.content : template;
filters.classList.add('hidden');

var getPicturesElement = function(picture) {

  var pictureElement = templateContainer.querySelector('.picture').cloneNode(true);
  var imgEl = pictureElement.querySelector('img');
  pictureElement.querySelector('.picture-comments').textContent = picture.comments;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;

  var image = new Image(182, 182);

  image.onload = function() {
    pictureElement.replaceChild(image, imgEl);
  };

  image.onerror = function() {
    pictureElement.classList.add('picture-load-failure');
  };
  image.src = picture.preview ? picture.preview : picture.url;
  return pictureElement;
};

var renderPictures = function(_pictures) {
  _pictures.forEach(function(picture) {
    container.appendChild(getPicturesElement(picture));
  });
};

/*renderPictures(pictures);*/

var PICTURE_LOAD_URL = 'http://localhost:1507/api/pictures?callback=callbackName';

var load = function(url, callback) {
  window.callbackName = function(data) {
    callback(data);
  };

  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);

};

load(PICTURE_LOAD_URL, renderPictures);
filters.classList.remove('hidden');
