import { tpProducts } from "../Home Page/tp-products.js";

let cart_id_date = JSON.parse(localStorage.getItem("cart_idArr")) || [];
console.log(cart_id_date);

//used map method to make a new array which stores the products added to cart
let display_cart = cart_id_date.map((cart) =>
  tpProducts.find((tpProduct) => tpProduct.id === cart.id)
);

console.log(display_cart);

// if cart_id_date is empty (no products added to cart, a message is displayed)
const cart_grid_container = $("#cart-grid-container");
const empty_cart_err = $("#no-cart-text-section");

if (cart_id_date.length === 0) {
  cart_grid_container.css("display", "none");
  empty_cart_err.css("display", "flex");
} else {
  cart_grid_container.css("display", "flex");
  empty_cart_err.css("display", "none");
}

const cart_card_container = $("#cart-item-card-container");
let option = { year: "numeric", month: "long", day: "numeric" };
let curr_date = new Date();
let display_curr_date = curr_date.toLocaleDateString("en-US", option);

console.log(display_curr_date);

display_cart.forEach(function (cart_product, i) {
  cart_id_date.length > 1
    ? $("#checkout-count").html(`Checkout ${cart_id_date.length} items:`)
    : $("#checkout-count").html(`Checkout ${cart_id_date.length} item:`);

  const cart_card = `<div class="cart-item-card">
            <h3 class="delivery-date">Delivery date: ${display_curr_date}</h3>
            <div class="cart-item-card-spec-grid">
              <img
                class="cart-img"
                src="${cart_product.img}"
                alt="product-img"
              />
              <div class="cart-item-spec">
                <p class="product-name">
                  ${cart_product.name}
                </p>
                <p class="product-price">Php ${cart_product.price}</p>
                <div class="product-qty-container">
                  <p class="product-qty">Quantity: ${cart_id_date[i].qty}</p>
                  <button class="update-btn">UPDATE</button>
                  <button class="remove-btn">REMOVE</button>
                </div>
              </div>
              <div class="product-shipping-option-container">
                <p class="shipping-option-text">Pick a shipping option:</p>
                <div class="free-shipping-option-container">
                  <input
                    class="product-shipping-option-radio"
                    type="radio"
                    checked
                    name="${i}"
                    value="0"
                  />
                  <div class="free-shipping-text">
                    <p class="shipping-option-date">May 13, 2025</p>
                    <p class="shipping-option-price">Free Shipping</p>
                  </div>
                </div>
                <div class="second-shipping-option-container">
                  <input
                    class="product-shipping-option-radio"
                    type="radio"
                    name="${i}"
                    value="150"
                  />
                  <div class="second-shipping-text">
                    <p class="shipping-option-date">May 11, 2025</p>
                    <p class="shipping-option-price">Php 150.00 - Shipping</p>
                  </div>
                </div>
                <div class="third-shipping-option-container">
                  <input
                    class="product-shipping-option-radio"
                    type="radio"
                    name="${i}"
                    value="200"
                  />
                  <div class="second-shipping-text">
                    <p class="shipping-option-date">May 8, 2025</p>
                    <p class="shipping-option-price">Php 200.00 - Shipping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

  cart_card_container.append(cart_card);
});
