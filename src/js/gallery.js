'use strict';

var activePicture = 0;
var gallery = document.querySelector('.gallery-overlay');
var galleryClose = document.querySelector('.gallery-overlay-close');
var galleryImage = document.querySelector('.gallery-overlay-image');
var galleryPreview = document.querySelector('.gallery-overlay-preview');

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
    if(gallery.setActivePicture <= (index + 1)) {
      index = 0;
    } else {
      self.setActivePicture(index++);
      console.log(index);
    }
  };

  this.setActivePicture(index);
};

Gallery.prototype.hide = function() {
  gallery.classList.add('invisible');
};

Gallery.prototype.setActivePicture = function(index) {
  activePicture = index;

  galleryImage.src = this.pictures[activePicture].preview ? this.pictures[activePicture].preview : this.pictures[activePicture].url;
  galleryImage.textContent = this.pictures[activePicture].likes;
  galleryImage.textContent = this.pictures[activePicture].comments;

};

module.exports = new Gallery();

