// top picks section for the home page JS file

import { tpProducts } from "./tp-products.js";

tpProducts.forEach(function (product) {
  //product card template that i made and will be used to dynamically add top picks products
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
          <div class="added-to-cart-indicator-container">
            <p class="added-to-cart-indicator">Added to Cart</p>
          </div>
          <button class="add-to-cart-button">Add to Cart</button>
        </div>`;

  const topPicksProductsContainer = $("#top-picks-products-container");
  topPicksProductsContainer.append(productCard);
});

//event delegation para ma target ang mga product cards inside the top picks products container
// $("#top-picks-products-container").on("click", ".product-card", function () {
//   const productId = $(this).data("id"); //kuhaon ang data-id sa clicked product
//   // window.location.href = `/trial.html?id=${productId}`;
// });
