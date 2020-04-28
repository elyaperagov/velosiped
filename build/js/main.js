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


  function fname(link) {
    $(link).on('click', function() {
      var href = $(link).attr('href');

      $('html, body').animate({
          scrollTop: $(href).offset().top
      }, {
          duration: 800,   // по умолчанию «400»
          easing: "linear" // по умолчанию «swing»
      });
      // return false;
    });
  }

  fname(aboutLink);
  fname(typesLink);
  fname(videoLink);
  fname(locationLink);

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


  var toggle = function () {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
      changeFormState(input, true);
      document.addEventListener('keydown', isEscEvent);
      button.setAttribute('disabled', '');
      offScroll();
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
      document.removeEventListener('keydown', isEscEvent);
      $(window).unbind('scroll');
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
        phoneNumber.setCustomValidity('Это обязательное поле');
      } else {
        phoneNumber.setCustomValidity('');
      }
    });
  });

})();
