/**
 * Created by Administrator on 07/10/16.
 */
'use strict';

window.getMessage = function(a, b) {
  if (typeof a === 'boolean') {
    if (a) {
      return 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров';
    } else {
      return 'Переданное GIF-изображение не анимировано';
    }
  } else if (typeof a === 'number') {
    return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов';
  } else if (Array.isArray(a)) {

    if ( Array.isArray(b)) {
      var artifactsSquare = 0;
      for (var i = 0; i < a.length; i++) {
        var c = a[i] * b[i];
        artifactsSquare += c;
      }
      return 'Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей';
    } else {
      var amountOfRedPoints = 0;
      for (var j = 0; j < a.length; j++) {
        amountOfRedPoints += a[j];
      }
      return 'Количество красных точек во всех строчках изображения: ' + amountOfRedPoints;
    }
  } else {
    return 'Переданы некорректные данные';
  }
};



