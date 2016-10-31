'use strict';

var activePicture = 0;
var gallery = document.querySelector('.gallery-overlay');
var galleryClose = document.querySelector('.gallery-overlay-close');
var galleryImage = document.querySelector('.gallery-overlay-image');
var getPicturesElement = require('./picture');


var Gallery = function() {};

Gallery.prototype.setPictures = function(pictures) {
  this.pictures = pictures;
};

Gallery.prototype.show = function(index) {

  var self = this;
  galleryClose.onclick = function() {
    self.hide();
  };

  gallery.classList.remove('invisible');

  galleryImage.onclick = function() {
    if(self.pictures.length <= (index + 1)) {
      index = 0;
      self.setActivePicture(index);
    } else {
      self.setActivePicture(index++);
    }
  };
  this.setActivePicture(index);
};

Gallery.prototype.show = function(index) {
  var self = this;
  galleryClose.onclick = function() {
    self.hide();
  };
  gallery.classList.remove('invisible');

  getPicturesElement.onclick = function() {
    if(self.pictures.length <= (index + 1)) {
      index = 0;
      self.setActivePicture(index);
    } else {
      self.setActivePicture(index++);
    }
  };

  this.setActivePicture(index);
};

Gallery.prototype.hide = function() {
  gallery.classList.add('invisible');
};

Gallery.prototype.setActivePicture = function(index) {
  activePicture = index;

  galleryImage.src = this.pictures[activePicture].url;
  galleryImage.textContent = this.pictures[activePicture].likes;
  galleryImage.textContent = this.pictures[activePicture].comments;
};


var renderPictures = require('./pictures');
var imageId = require('./pictures');

renderPictures.onclick = function() {
  gallery.show(imageId);
};

module.exports = new Gallery();

