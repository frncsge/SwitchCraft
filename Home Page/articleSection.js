const readMore = $("#read-more-button");
const articleTxt = $("#article-text");

readMore.click(() => {
  if (readMore.text() === "Read More") {
    articleTxt.removeClass("article-line-limit");
    readMore.html("Read Less");
  } else {
    articleTxt.addClass("article-line-limit");
    readMore.html("Read More");
  }
});
