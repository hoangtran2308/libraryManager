function backtop() {
  $(window).scroll(function() {
    if ($(this).scrollTop()) {
      $('#backtop').fadeIn();
    } else {
      $('#backtop').fadeOut();
    }
  });
  // // $('#backtop').click(function() {
  // //   $('html, body').animate({
  // //     scrollTop: 0
  // //   }, 1000);
  // })
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
}


function spinnerLoad() {
  document.getElementById("btn_login").style.display = "none";
  document.getElementById("btn_spinner").style.display = "block";
}

function returnForm() {
  document.getElementById("btn_spinner").style.display = "none";
  document.getElementById("btn_login").style.display = "block";
}

