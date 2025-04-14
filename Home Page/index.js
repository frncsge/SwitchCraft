const bannerImages = {
  1: "/banner images/keyboard sale - switchCraft.png",
  2: "/banner images/switch sale - switchCraft.png",
};

const dot = $(".dot");
const bannerImg = $(".banner-img");

function bannerImgSelector(selectedDot) {
  dot.removeClass("active");
  $(`[onclick="bannerImgSelector('${selectedDot}')"]`).addClass("active");

  switch (selectedDot) {
    case "1":
      bannerImg.attr("src", bannerImages[1]);
      break;
    case "2":
      bannerImg.attr("src", bannerImages[2]);
      break;
    case "3":
      bannerImg.attr("src", bannerImages[1]);
      break;
  }
}
