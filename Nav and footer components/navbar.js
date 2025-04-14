const navIconsContainer = $("#nav-icons-container");
const menuButton = $("#menu-button");
const logo = $("#logo");

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
  }
}

$(document).ready(() => {
  navigationBarResize();
});

$(window).resize(navigationBarResize);

// this part below is for the menu button functionality na

const smallScreenCover = $("#small-screen-cover");
const smallScreenNavContainer = $("#small-screen-nav-container");
const exitButton = $("#exit-icon-container");

function removeSmallNav() {
  smallScreenNavContainer.css("display", "none");
  smallScreenCover.css("display", "none");
}

menuButton.click(() => {
  smallScreenCover.css("display", "block");
  smallScreenNavContainer.css("display", "block");
});

smallScreenCover.click(removeSmallNav);
exitButton.click(removeSmallNav);
