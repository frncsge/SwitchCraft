import { tpProducts } from "../Home Page/tp-products.js";

const grid = $("#favorite-products-grid");
// used JSON.parse method to turn my favorites_idArr local storage from a string to its array form (original)
let favorites_id = JSON.parse(localStorage.getItem("favorites_idArr")) || [];
// this is what I use to store the filtered tpProducts (to only display the favorite ones!)
let favorites_display = favorites_id.map((id) =>
  tpProducts.find((tpProduct) => tpProduct.id === id)
);

console.log(favorites_display);

if (favorites_display.length !== 0) {
  $("#no-favorites-text-section").css("display", "none");
  favorites_display.forEach(function (product) {
    const productCard = `<div class="product-card" data-id="${product.id}">
                <div class="product-img-container">
                  <img class="product-img" src="${product.img}" alt="Product Image" />
                </div>
                <div class="product-name-container">
                  <p class="product-name">${product.name}</p>
                </div>
                <p class="product-price">Php ${product.price}</p>
                <div class="rating-sold-container">
                  <div class="rating-container">
                    <img
                      class="star"
                      src="/Home Page/one review star 1.png"
                      alt="Star"
                    />
                    <p class="rating">${product.rating}</p>
                  </div>
                  <p class="sold">${product.sold} sold</p>
                </div>
                <div class="quantity-favorites-container">
                 <div class="product-quantity-selector-container">
                  <select class="product-quality-selector">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
      
                  <svg
              class="style_icon__KAdjP"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              ></path>
            </svg>
                </div>
                <div class="added-to-cart-indicator-container">
                  <p class="added-to-cart-indicator">Added to Cart</p>
                </div>
                <button class="add-to-cart-button">Add to Cart</button>
              </div>`;

    grid.append(productCard);
  });
} else {
  $("#no-favorites-text-section").css("display", "flex");
}

favorites_id.forEach(function (favProductId) {
  $(`[data-id="${favProductId}"] .style_icon__KAdjP`).attr("fill", "red");
});

grid.on("click", ".style_icon__KAdjP", function () {
  var favoriteProductId = $(this).closest(".product-card").data("id");

  if ($(this).attr("fill") === "red") {
    $(this).attr("fill", "none");

    var index = favorites_id.indexOf(favoriteProductId);
    favorites_id.splice(index, 1);
  } else {
    $(this).attr("fill", "red");
    favorites_id.unshift(favoriteProductId);
  }

  console.log(favorites_id);
  localStorage.setItem("favorites_idArr", JSON.stringify(favorites_id));
});
