/* Footer.js
 *
 * This is code that helps run the footer, which is mostly pulled from Learn.
 * Despite the filename, there is code in here for header functionality.
 *
 * A number of these things are taken directly from /js/all.js
 *
 */

// checks screen size
var isMobile = {
  any: function() {
    return($(window).width()<=599);
    // nexus7 width is 600 (window.innerWidth)
    // this will not run any reformatting for the phone layout on nexus
  }
};

// checks device
var isMobileDevice = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobileDevice.Android() || isMobileDevice.BlackBerry() || isMobileDevice.iOS() || isMobileDevice.Opera() || isMobileDevice.Windows());
  }
};

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function numValid(number) {
  number.replace(/[^\d]/g,'');
  if(number && (number.length===9||number.length===0)) {
    return number;
  }
}

// Format a number with commas representing the thousandth place
function formalNumber(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Find a word in a string and bold it (for search results)
function boldWord(input, query) {
  return input.replace(new RegExp('(^|.)(' + query + ')(.|$)','ig'), '$1<b>$2</b>$3');
}

$(function() {
  /*
    Custom behavior for 'Get Answers' dropdown. Need a delay because you
    can also just click on the button to get to the page, but also want
    people to be able to navigate around on the big megamenu dropdown.
  */
  var hovering = false,
    showTimeout;
  var dropdownShow = function() {
    $('.dropdown-megamenu').toggleClass('active', true);
  };
  var dropdownHide = function() {
    if (hovering) {
      $('.dropdown-menu').mouseleave(function() {
        hovering = false;
        setTimeout(dropdownHide, 500);
      });
    }
    else {
      $('.dropdown-megamenu').toggleClass('active', false);
    }
  };

  $('.dropdown-toggle').mouseover(function() {
    $('.dropdown-menu').mouseenter(function() {
      hovering = true;
    });
    clearTimeout(showTimeout);
    showTimeout = setTimeout(dropdownShow, 500);
  }).mouseout(function() {
    setTimeout(dropdownHide, 500);
  });

  /*
    Custom behavior for the 'sidr' Side rail navigation.
    This is the hamburger menu that shows up on small screens
  */
  $('.header-actions a').click(function(e) {
    var isIndividual = $(e.target).hasClass('individual-link');

    $('#sidr').toggleClass('business', !isIndividual);
    $('#sidr').toggleClass('individual', isIndividual);

    $('.individual-links').toggleClass('hidden', !isIndividual);
    $('.business-links').toggleClass('hidden', isIndividual);
  });

  /*
    Hacky insert of javascript to make the create-account page agnostic to
    whether the user is coming through Individuals & Families or Small
    Businesses. Placed here because other header related javascript is here.
  */
  if (window.location.href.indexOf('/create-account') > -1) {
    /* Deselect the Individuals & Families tab */
    $('.header-actions .individual-link').removeClass('active');

    /* Hiding the 'Get Coverage', etc and Search bar */
    $('.utility-section').hide();

    /* Add the bottom border to #header instead of .utility-section */
    $('#header').addClass('header-bottom');
  }

  // Custom behavior for the Open Enrollment clock on the footer, copied from
  // Aquilent JS.
  $(document).ready(function() {
    var oeEnds,oneDay=1e3*60*60*24,ecDate,daysRemaining,today;
    var spans=$(".enrollment-clock").find("span");
    ecDate = $(spans[0]).attr("data-oeDate");
    if (ecDate) {
      oeEnds = new Date(ecDate);
      oeEnds.setHours(0, 0, 0, 0);
      today = new Date;
      today.setHours(0, 0, 0, 0);
      daysRemaining = (Date.UTC(oeEnds.getYear(), oeEnds.getMonth(), oeEnds.getDate()) - Date.UTC(today.getYear(), today.getMonth(), today.getDate())) / oneDay;
      daysRemaining = daysRemaining < 0 ? 0 : daysRemaining;
      $(spans[0]).text(daysRemaining);
      if (daysRemaining === 1) {
        var arr = $(spans[1]).text().toLowerCase().split("s");
        var str = "";
        for (var i = 0; i < arr.length; i++) str += arr[i] + (i > 0 && i < arr.length - 1 ? "s" : "");
        $(spans[1]).text(str)
      }
    }
  });
});

// Via https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
    'use strict';
    if (this == null) {
      throw new TypeError();
    }
    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0) {
      return -1;
    }
    var n = 0;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) { // shortcut for verifying if it's NaN
        n = 0;
      } else if (n != 0 && n != Infinity && n != -Infinity) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }
    if (n >= len) {
      return -1;
    }
    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
    for (; k < len; k++) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  }
}

$(function() {
  if ('ontouchstart' in document.documentElement) {
    $('body').removeClass('no-touch');
  };
  if (isMobileDevice.any()) {
    $('.btn-grey.print').remove();
  }
  if (!isMobile.any()) {
    $('form .signup').removeAttr('href').attr('data-toggle','modal').attr('data-target','#subscribe-modal');
    $(".g-plus").attr('data-width','272');
  } else {
    $(".g-plus").attr('data-width','100');
    $(".g-plus").attr('data-height','131');
  }

  key1 = 'BpbEyi2zDJAVbeyHJ11vzg1GETQHU6yj';
  key2 = 'gs2wYNwY8VvAsYcW1RB12CwovPgx3TWB';

  //TODO: LDC just hide the webchat for now
  $('#webchat').hide();

});
