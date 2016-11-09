'use strict';


var getStringSearch = function(params) {
  return Object.keys(params).map(function(param) {
    return [param, params(param)].join('=');
  }).join('&');
};
var load = function(url, params, callback ) {
  var xhr = new XMLHttpRequest();
  url += '?' + getStringSearch(params);
  xhr.onload = function(evt) {
    var loadData = JSON.parse(evt.target.response);
    callback(loadData);
  };

  xhr.open('GET', url);
  xhr.send();
/*
  var script = document.createElement('script');
  script.src = url + '?callback=' + callbackName;
  document.body.appendChild(script);*/
};

module.exports = load;


