function toggleSideBar() {
  $('#toggleSideBar').toggleClass( "toggle" )
}
function showSidebar(){
  $('#toggleSideBar').toggleClass("sidebar")
}

function spinnerLoad() {
  document.getElementById("btn_login").style.display = "none";
  document.getElementById("btn_spinner").style.display = "block";
}

function returnForm() {
  document.getElementById("btn_spinner").style.display = "none";
  document.getElementById("btn_login").style.display = "block";
}


