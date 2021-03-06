'use strict';
var gallery = require('./gallery');

var getPicturesElement = function(picture) {
  var template = document.querySelector('template');
  var templateContainer = 'content' in template ? template.content : template;
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

  image.src = picture.preview || picture.url;
  return pictureElement;
};

var Picture = function(image, imageId) {
  this.data = image;
  this.element = getPicturesElement(this.data, imageId);
  this.element.onclick = function(event) {
    event.preventDefault();
    if(!this.classList.contains('picture-load-failure')) {
      gallery.show(imageId);
    }
  };

  this.remove = function() {
    this.element.onclick = null;
  };
};

module.exports = Picture;
