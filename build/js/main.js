'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var navMain = document.querySelector('.main-nav');
  var navToggle = document.querySelector('.main-nav__toggle');
  var input = document.querySelectorAll('input');
  var button = document.querySelector('.button--submit');
  var navItems = document.querySelectorAll('.main-nav__item');
  var phoneNumber = document.querySelector('#feedback__phone-input');
  var aboutLink = document.querySelector('.main-nav__item--about a');
  var typesLink = document.querySelector('.main-nav__item--types a');
  var videoLink = document.querySelector('.main-nav__item--video a');
  var locationLink = document.querySelector('.main-nav__item--location a');
  var content = document.querySelector('.content');
  var general = document.querySelector('.general');

  var scroll = function(link) {
    $(link).on('click', function () {
      var href = $(link).attr('href');

      $('html, body').animate({
        scrollTop: $(href).offset().top
      }, {
        duration: 800,
        easing: 'linear'
      });
      // return false;
    });
  }

  scroll(aboutLink);
  scroll(typesLink);
  scroll(videoLink);
  scroll(locationLink);

  var changeFormState = function (object, newState) {
    for (var i = 0; i < object.length; i++) {
      object[i].disabled = newState;
    }
  };

  if (navMain) {
    navMain.classList.remove('main-nav--nojs');
    navMain.classList.add('main-nav--closed');
  }

  var offScroll = function () {
    var winScrollTop = $(window).scrollTop();
    $(window).bind('scroll', function () {
      $(window).scrollTop(winScrollTop);
    });
  };

  var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  var preventDefault = function (e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
      e.returnValue = false;
    }
  };

  var preventDefaultForScrollKeys = function (e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
    return true;
  };

  var disableScroll = function () {
    if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', preventDefault, false);
      document.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove = preventDefault; // mobile
      document.onkeydown = preventDefaultForScrollKeys;
    }
  };

  var enableScroll = function () {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
      document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
    }
  };


  var toggle = function () {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
      content.classList.add('content--faded');
      general.classList.add('general--faded');
      changeFormState(input, true);
      document.addEventListener('keydown', isEscEvent);
      button.setAttribute('disabled', '');
      offScroll();
      disableScroll();
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
      content.classList.remove('content--faded');
      general.classList.remove('general--faded');
      document.removeEventListener('keydown', isEscEvent);
      $(window).unbind('scroll');
      enableScroll();
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
      }
    });
  }

  window.addEventListener('resize', function () {
    if (navMain) {
      if (document.documentElement.clientWidth >= 1024 && navMain.classList.contains('main-nav--opened')) {
        toggle();
      }
    }
  });

  var isEscEvent = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      toggle();
    }
  };

  $(function () {
    $(phoneNumber).mask('+7(999) 999-9999');

    phoneNumber.addEventListener('invalid', function () {
      if (phoneNumber.validity.valueMissing) {
        phoneNumber.setCustomValidity('Это обязательное поле. Нужно ввести номер телефона полностью');
      } else {
        phoneNumber.setCustomValidity('');
      }
    });
  });

})();
