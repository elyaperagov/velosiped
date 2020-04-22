'use strict';
ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map('map', {
    center: [59.938635, 30.323118],
    zoom: 16
  });
}


var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var header = document.querySelector('.header');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    header.classList.remove('page-header--absolute');
    header.classList.add('page-header--relative');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    header.classList.add('page-header--absolute')
    header.classList.remove('page-header--relative');
  }
});
