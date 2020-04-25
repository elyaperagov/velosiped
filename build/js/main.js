'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var navMain = document.querySelector('.main-nav');
  var navToggle = document.querySelector('.main-nav__toggle');
  var input = document.querySelectorAll('input');
  var button = document.querySelector('.button--submit');
  var main = document.querySelector('main');
  var navItems = document.querySelectorAll('.main-nav__item');
  var aboutLink = document.querySelector('.main-nav__item--about');
  var typesLink = document.querySelector('.main-nav__item--types');
  var videoLink = document.querySelector('.main-nav__item--video');
  var locationLink = document.querySelector('.main-nav__item--location');
  var about = document.querySelector('.about');
  var types = document.querySelector('.types');
  var video = document.querySelector('.video');
  var location = document.querySelector('.location');

  var scroll = function (link, div) {
    link.addEventListener('click', function () {
      div.scrollIntoView({
        block: 'center', behavior: 'smooth'}
      );
    });
  }

  scroll(aboutLink, about);
  scroll(videoLink, video);
  scroll(locationLink, location);
  scroll(typesLink, types);

  var changeFormState = function (object, newState) {
    for (var i = 0; i < object.length; i++) {
      object[i].disabled = newState;
    }
  };

  if (navMain) {
    navMain.classList.remove('main-nav--nojs');
    navMain.classList.add('main-nav--closed');
  }


  var toggle = function () {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
      changeFormState(input, true);
      document.addEventListener('keydown', isEscEvent);
      button.setAttribute('disabled', '');
      document.body.style.overflow = 'hidden';
      main.style.opacity = '0.7';
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
      document.removeEventListener('keydown', isEscEvent);
      document.body.style.overflow = 'visible';
      main.style.opacity = '1';
      changeFormState(input, false);
      button.removeAttribute('disabled', '');
    }
  };

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      toggle();
    });
  }

  for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', function () {
      if (document.documentElement.clientWidth < 1024) {
        toggle();
      } else {
        return;
      };
    })
  }

  window.addEventListener("resize", function () {
    if (document.documentElement.clientWidth < 1024 && navMain.classList.contains('main-nav--opened')) {
      toggle();
    }
  })

  var isEscEvent = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      toggle();
    }
  };

  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map('map', {
      center: [59.938635, 30.323118],
      zoom: 16
    });
    window.myMap = myMap;
  }

})();
