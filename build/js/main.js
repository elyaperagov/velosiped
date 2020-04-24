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
var input = document.querySelectorAll('input');
var button = document.querySelector('.button--submit');
var main = document.querySelector('main');

if (navMain) {
  navMain.classList.remove('main-nav--nojs');
  navMain.classList.add('main-nav--closed');
}

var changeFormState = function (object, newState) {
  for (var i = 0; i < object.length; i++) {
    object[i].disabled = newState;
  }
};

if (navToggle) {
  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
      changeFormState(input, true);
      button.setAttribute("disabled", "");
      document.body.style.position = 'hidden';
      main.style.opacity = '0.7';
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
      document.body.style.overflow = 'visible';
      main.style.opacity = '1';
      changeFormState(input, false);
      button.removeAttribute("disabled", "");
    }
  });
}
