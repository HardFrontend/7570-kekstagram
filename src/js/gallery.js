'use strict';

var activePicture = 0;
var gallery = document.querySelector('.gallery-overlay');
var galleryClose = document.querySelector('.gallery-overlay-close');
var galleryImage = document.querySelector('.gallery-overlay-image');
var galleryPreview = document.querySelector('.gallery-overlay-preview');

var Gallery = function() {
};

Gallery.prototype.setPictures = function(pictures) {
  this.pictures = pictures;
};


Gallery.prototype.show = function(activePicture) {
  var self = this;
  galleryClose.onclick = function() {
    self.hide();
  };
  gallery.classList.remove('invisible');

  galleryImage.onclick = function() {
    if(activePicture < self.pictures.length - 1) {
      self.setActivePicture(++activePicture);
    } else {
      activePicture = 0;
      self.setActivePicture(0);
    }
    console.log(activePicture);
  };
  this.setActivePicture(activePicture);

};


Gallery.prototype.hide = function() {
  gallery.classList.add('invisible');
  this.closeElement.onclick = null;
  this.galleryImage.onclick = null;
  this.galleryImage.onerror = null;
};

Gallery.prototype.setActivePicture = function(index) {
  activePicture = index;

  galleryImage.src = this.pictures[index].preview || this.pictures[index].url;
  gallery.querySelector('.likes-count').textContent = this.pictures[index].likes;
  gallery.querySelector('.comments-count').textContent = this.pictures[index].comments;

};

module.exports = new Gallery();

