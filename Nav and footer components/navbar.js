const navIconsContainer = $("#nav-icons-container");
const menuButton = $("#menu-button");
const logo = $("#logo");

const smallScreenCover = $("#small-screen-cover");
const smallScreenNavContainer = $("#small-screen-nav-container");
const exitButton = $("#exit-icon-container");

function removeSmallNav() {
  smallScreenNavContainer.css("display", "none");
  smallScreenCover.css("display", "none");
}

function navigationBarResize() {
  let screenWidth = window.innerWidth;

  if (screenWidth <= 780) {
    logo.attr("src", "/Nav and footer components/logo/logo narrow.svg");
    logo.css("width", "40px");
    navIconsContainer.css("display", "none");
    menuButton.css("display", "block");
  } else {
    logo.attr("src", "/Nav and footer components/logo/logo wide.svg");
    logo.css("width", "100px");
    navIconsContainer.css("display", "flex");
    menuButton.css("display", "none");
    removeSmallNav();
  }
}

$(document).ready(() => {
  navigationBarResize();
});

$(window).resize(navigationBarResize);

smallScreenCover.click(removeSmallNav);
exitButton.click(removeSmallNav);

//section for making the navigation bar sticky
$(window).scroll(() => {
  var scrollY = window.scrollY;
  if (scrollY >= 300) {
    $("#navbar").addClass("sticky-nav"); //the #navbar came from the index.html file (homepage html file)
  } else if (scrollY < 200) {
    $("#navbar").removeClass("sticky-nav");
  }
});

menuButton.click(() => {
  smallScreenCover.css("display", "block");
  smallScreenNavContainer.css("display", "block");
});
