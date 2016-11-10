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
var THROTTLE_DELAY = 100;
var allPictures = [];
var lastCall = Date.now();

var getParams = function() {
  return {
    from: currentPage * PAGE_SIZE,
    to: currentPage * PAGE_SIZE + PAGE_SIZE,
    filter: 'filter-popular'
  };
};

var container = document.querySelector('.pictures');
filters.classList.add('hidden');

var renderPictures = function(_picture, allPictures, replace) {
  if (currentPage === 0) {
    container.innerHTML = '';
  }
  if(currentPage === 0) {
    allPictures = [];
  }
  _picture.forEach(function(picture, imageId) {
    container.appendChild( new Picture(picture, currentPage * PAGE_SIZE + imageId).element);
  });

  gallery.setPictures(allPictures);
  filters.classList.remove('hidden');
};

var isBottomReached = function() {
  var GAP = 150;
  var footerElement = document.querySelector('footer');
  var footerPosition = footerElement.getBoundingClientRect();
  return footerPosition.top - window.innerHeight - GAP <= 0;
};

var processData = function(data, _pictures) {
  if(data.length < PAGE_SIZE) {
    lastPageReached = true;
  }

  console.log(currentPage);
  if(currentPage === 0) {
    allPictures = [];
  } else {
    allPictures = allPictures.concat(_pictures);
  }

  renderPictures(data, allPictures);
  console.log(renderPictures);

};

var loadMorePictures = function() {
  if (isBottomReached() && !lastPageReached) {
    currentPage++;
    load(PICTURE_LOAD_URL, getParams(), function(data) {
      processData(data);
      loadMorePictures();
    });
  }
};

window.addEventListener('scroll', function() {
  if (Date.now() - lastCall >= THROTTLE_DELAY) {
    loadMorePictures();
    lastCall = Date.now();
  }
});

/*var changeFilter = function(filterID) {
 container.innerHTML = '';
 activeFilter = filterID;
 currentPage = 0;
 getParams(filterID, currentPage);
 };

 filters.addEventListener('change', function(evt) {
 if(evt.target.classList.contains('filters-radio')) {
 changeFilter(evt.target.id);
 }
 }, true);*/

load(PICTURE_LOAD_URL, getParams(), processData);

loadMorePictures();
