'use strict';

var load = function(url, callback, callbackName) {
  callbackName = 'cb';

  window[callbackName] = function(data) {
    callback(data);
  };

  var script = document.createElement('script');
  script.src = url + '?callback=' + callbackName;
  document.body.appendChild(script);
};

module.exports = load;
