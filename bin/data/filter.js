'use strict';

module.exports = function(list, filterID) {

  var outList = list;

  switch(filterID) {
    case 'filter-popular':
      outList = list.sort(sortByPopular);
      break;
    case 'filter-new':
      outList = list.filter(filterByDays);
      outList = outList.sort(sortByDate);
      break;
    case 'filter-discussed':
      outList = list.sort(sortByDiscussed);
      break;
  }

  return outList;
};

function filterByDays(item) {
  var DAYS_AGO = 3;
  var daysAgoDate = new Date();

  daysAgoDate.setDate(daysAgoDate.getDate() - DAYS_AGO);
  daysAgoDate.setHours(0, 0, 0, 0);

  return item.created > daysAgoDate;
}

function sortByPopular(a, b) {
  return b.likes - a.likes;
}

function sortByDate(a, b) {
  return new Date(b.created) - new Date(a.created);
}
