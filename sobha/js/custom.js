// body toggle class
$(".mobile-trigger").click(function () {
    $("body").toggleClass("mobile-open");
});

$(".has-submenu").click(function () {
  $(this).toggleClass("child-open");
  $(this).children(".submenu").slideToggle();
});

// header fixed
$(window).scroll((function () {
    $(window).scrollTop() >= 50 ? $("header").addClass("fixed-header") : $("header").removeClass("fixed-header")
}
));

// read more button
$(".moreless-button").click(function () {
    $(".moretext").slideToggle(10);
    if ($(".moreless-button").text() == "Read more") {
        $(this).text("Read less");
    } else {
        $(this).text("Read more");
    }
});

// popup js
$('.without-caption').magnificPopup({
  type: 'image',
  closeOnContentClick: true,
  closeBtnInside: false,
  mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
  image: {
    verticalFit: true
  },
  zoom: {
    enabled: true,
    duration: 300 // don't foget to change the duration also in CSS
  }
});

$('.with-caption').magnificPopup({
  type: 'image',
  closeOnContentClick: true,
  closeBtnInside: false,
  mainClass: 'mfp-with-zoom mfp-img-mobile',
  image: {
    verticalFit: true,
    titleSrc: function (item) {
      return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank"></a>';
    }
  },
  zoom: {
    enabled: true
  }
});


// floor plan tab js
if ($(".tabs-box").length) {
  $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
    e.preventDefault();
    var target = $($(this).attr("data-tab"));

    if ($(target).is(":visible")) {
      return false;
    } else {
      target
        .parents(".tabs-box")
        .find(".tab-buttons")
        .find(".tab-btn")
        .removeClass("active-btn");
      $(this).addClass("active-btn");
      target
        .parents(".tabs-box")
        .find(".tabs-content")
        .find(".tab")
        .fadeOut(0);
      target
        .parents(".tabs-box")
        .find(".tabs-content")
        .find(".tab")
        .removeClass("active-tab");
      $(target).fadeIn(300);
      $(target).addClass("active-tab");
    }
  });
}


$(document).ready(function () {
  if (window.matchMedia("(min-width: 769px)").matches) {
    $('.banner-form .close_outer').on('click', function () {
      $(this).closest('.banner-form').addClass('bottom');
      $(".lower-form-part").slideUp(500);
    })

    setTimeout(function () {
      $('.banner-form').addClass('active');
    }, 3000)
  }

})


// FORM SLIDE UP & DOWN

$(document).ready(function () {
  $(window).scroll(function () {

    if (window.matchMedia("(min-width: 769px)").matches) {
      if ($(window).width() > 768 && $(this).scrollTop() > 200) {
        $(".lower-form-part").slideUp(500);
        $('.banner-form').addClass('bottom');
      }
      else {
        $(".lower-form-part").slideDown(500);
        $('.banner-form').removeClass('bottom');
      }
    }

  });

  $(".form-top").click(function () {
    if (window.matchMedia("(min-width: 769px)").matches) {
      $(".lower-form-part").slideToggle();
    }
  });
});



