import { tpProducts } from "../Home Page/tp-products.js";

let cart_id_qty = JSON.parse(localStorage.getItem("cart_idArr")) || [];

//used map method to make a new array which stores the products added to cart
let display_cart = cart_id_qty.map((cart) =>
  tpProducts.find((tpProduct) => tpProduct.id === cart.id)
);

// if cart_id_qty is empty (no products added to cart, a message is displayed)
const cart_grid_container = $("#cart-grid-container");
const empty_cart_err = $("#no-cart-text-section");

if (cart_id_qty.length === 0) {
  cart_grid_container.css("display", "none");
  empty_cart_err.css("display", "flex");
} else {
  cart_grid_container.css("display", "flex");
  empty_cart_err.css("display", "none");
}

const cart_card_container = $("#cart-item-card-container");

function date(i) {
  let option = { year: "numeric", month: "long", day: "numeric" };
  let curr_date = new Date();
  let delivery_date = new Date(curr_date);
  delivery_date.setDate(delivery_date.getDate() + cart_id_qty[i].ship_days);

  //para ni ma format ang date into a string for displey
  return delivery_date.toLocaleDateString("en-US", option);
}

display_cart.forEach(function (cart_product, i) {
  //   //option is like a format for turning the date into a string
  //   let option = { year: "numeric", month: "long", day: "numeric" };
  //   let curr_date = new Date();
  //   let delivery_date = new Date(curr_date);
  //   delivery_date.setDate(delivery_date.getDate() + cart_id_qty[i].ship_days);

  //   //para ni ma format ang date into a string for displey
  let display_delivery_date = date(i);

  cart_id_qty[i].delivery_date = display_delivery_date;

  console.log(cart_id_qty);

  cart_id_qty.length > 1
    ? $("#checkout-count").html(`Checkout ${cart_id_qty.length} items:`)
    : $("#checkout-count").html(`Checkout ${cart_id_qty.length} item:`);

  const cart_card = `<div class="cart-item-card">
            <h3 class="delivery-date">Delivery date: ${display_delivery_date}</h3>
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
                  <p class="product-qty">Quantity: ${cart_id_qty[i].qty}</p>
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

  //   para ma set ang free shipping option as default
  const check_radio = $(
    `.product-shipping-option-radio[name="${i}"][value="${cart_id_qty[i].ship_cost}"]`
  ).prop("checked", true);
});

cart_card_container.on("change", ".product-shipping-option-radio", function () {
  let i = $(this).attr("name"); //im taking the product index of the radio button that was changed
  let new_ship_cost = $(this).val();

  switch (new_ship_cost) {
    case "0":
      cart_id_qty[i].ship_days = 7;
      break;
    case "150":
      cart_id_qty[i].ship_days = 5;
      break;
    case "200":
      cart_id_qty[i].ship_days = 3;
      break;
  }

  cart_id_qty[i].ship_cost = new_ship_cost;

  let display_delivery_date = date(i);
  cart_id_qty[i].delivery_date = display_delivery_date;

  //when shipping option is changed, this changes the delivery date display pud!!
  $(this)
    .closest(".cart-item-card")
    .find(".delivery-date")
    .html(`Delivery date: ${display_delivery_date}`);

  console.log(cart_id_qty);
  localStorage.setItem("cart_idArr", JSON.stringify(cart_id_qty));
});
