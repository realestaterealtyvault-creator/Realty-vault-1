$(".mobile-trigger").click(function(){
    $("body").toggleClass("mobile-open");
  });
  
  $(".has_submenu>a ").each(function(){
    $(this).click(function(){
      $(this).parent().toggleClass("submenu-open");
      $(this).next("ul").slideToggle();
      $(this).parent().siblings(".parent").children("ul").slideUp();
    });
  });


  $(window).scroll((function() {
    $(window).scrollTop() >= 50 ? $(".navbar-area").addClass("fixed-header") : $(".navbar-area").removeClass("fixed-header")
}
));
  