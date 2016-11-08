'use strict';

var getStringSearch = function(params) {
  return Object.keys(params).map(function(param) {
    return [param, params(param)].join('=');
  }).join('&');
};

var load = function(url, callback, callbackName, params) {
  callbackName = 'cb';
  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    var loadData = JSON.parse(evt.target.response);
    callback(loadData);
  };

  xhr.open('GET', url);
  xhr.send();

  window[callbackName] = function(data) {
    callback(data);
  };
/*
  var script = document.createElement('script');
  script.src = url + '?callback=' + callbackName;
  document.body.appendChild(script);*/
};

module.exports = load;


