import { tpProducts } from "../Home Page/tp-products.js";

let cart_id_qty = JSON.parse(localStorage.getItem("cart_idArr")) || [];

//used map method to make a new array which stores the products added to cart
let display_cart = cart_id_qty.map((cart) =>
  tpProducts.find((tpProduct) => tpProduct.id === cart.id)
);

// if cart_id_qty is empty (no products added to cart, a message is displayed)
const cart_grid_container = $("#cart-grid-container");
const empty_cart_err = $("#no-cart-text-section");

const cart_card_container = $("#cart-item-card-container");

function string_date(days) {
  let option = { year: "numeric", month: "long", day: "numeric" };
  let curr_date = new Date();
  let delivery_date = new Date(curr_date);
  delivery_date.setDate(delivery_date.getDate() + days);

  //para ni ma format ang date into a string for displey
  return delivery_date.toLocaleDateString("en-US", option);
}

function item_counter() {
  return cart_id_qty.reduce((acc, cv) => {
    return acc + cv.qty;
  }, 0);
}

function update_shipping_option_date() {
  $(".free-shipping-option-container")
    .find(".shipping-option-date")
    .html(string_date(7));

  $(".second-shipping-option-container")
    .find(".shipping-option-date")
    .html(string_date(5));

  $(".third-shipping-option-container")
    .find(".shipping-option-date")
    .html(string_date(3));
}

function updateCheckoutCount() {
  const item_count = item_counter();

  item_count > 1
    ? $("#checkout-count").html(`Checkout ${item_count} items:`)
    : $("#checkout-count").html(`Checkout ${item_count} item:`);
}

function update_order_summary() {
  cart_id_qty.length > 1
    ? $("#total-items-text").html(`Total items: ${cart_id_qty.length}`)
    : $("#total-items-text").html(`Total item: ${cart_id_qty.length}`);

  const item_count = item_counter();

  item_count > 1
    ? $("#total-items-text").html(`Total items: ${item_count}`)
    : $("#total-items-text").html(`Total item: ${item_count}`);

  const total_items_price = cart_id_qty.reduce(function (total, currentValue) {
    return total + currentValue.price * currentValue.qty;
  }, 0);

  const total_ship_cost = cart_id_qty.reduce(function (total, currentValue) {
    return total + parseInt(currentValue.ship_cost);
  }, 0);

  const total_cost = total_items_price + total_ship_cost;

  const string_total_items_price = total_items_price.toLocaleString();
  const string_total_ship_cost = total_ship_cost.toLocaleString();
  const string_total_cost = total_cost.toLocaleString();

  $("#total-items-price").html(`Php ${string_total_items_price}.00`);
  $("#shipping-cost-price").html(`Php ${string_total_ship_cost}.00`);
  $("#total-cost-price").html(`Php ${string_total_cost}.00`);
}

if (cart_id_qty.length === 0) {
  cart_grid_container.css("display", "none");
  empty_cart_err.css("display", "flex");
} else {
  cart_grid_container.css("display", "flex");
  empty_cart_err.css("display", "none");

  display_cart.forEach(function (cart_product, i) {
    let display_delivery_date = string_date(cart_id_qty[i].ship_days);

    // purpose ani kay ma store ang delivery date into the local storage
    cart_id_qty[i].delivery_date = display_delivery_date;

    console.log(typeof cart_id_qty[i].qty);

    //this is to turn the string price of the products into an INT (Int nalang ako gi gamit since walay .00 akoa prices - I know bad practice pero karun ra ni T_T)
    let string_price = cart_product.price;
    let int_price = parseInt(string_price.replace(/,/g, "")); //What's inside the replace method is called regex (regular expression).. daw T_T hahaha I just discovered it

    cart_id_qty[i].price = int_price;

    let display_price_string =
      int_price * cart_id_qty[i].qty + cart_id_qty[i].ship_cost;

    updateCheckoutCount();

    const cart_card = `<div class="cart-item-card" data-id="${cart_product.id}">
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
    update_shipping_option_date();

    //   para ma set ang free shipping option as default
    const check_radio = $(
      `.product-shipping-option-radio[name="${i}"][value="${cart_id_qty[i].ship_cost}"]`
    ).prop("checked", true);
  });
}

cart_card_container.on("change", ".product-shipping-option-radio", function () {
  let cart_id = $(this).closest(".cart-item-card").data("id");
  let i = cart_id_qty.findIndex((product) => product.id === cart_id); //im taking the product index of the radio button that was changed

  console.log(i);

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

  let display_delivery_date = string_date(cart_id_qty[i].ship_days);
  cart_id_qty[i].delivery_date = display_delivery_date;

  //when shipping option is changed, this changes the delivery date display pud!!
  $(this)
    .closest(".cart-item-card")
    .find(".delivery-date")
    .html(`Delivery date: ${display_delivery_date}`);

  update_order_summary();

  localStorage.setItem("cart_idArr", JSON.stringify(cart_id_qty));
});

const qty_selector = `Quantity: <select class="product-quantity-selector">
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
            </select>`;

cart_card_container.on("click", ".update-btn", function () {
  let cart_id = $(this).closest(".cart-item-card").data("id");
  let i = cart_id_qty.findIndex((product) => product.id === cart_id);

  if ($(this).html() === "UPDATE") {
    // purpose ani is to show the qty selector if the user clicks "update"
    $(this)
      .closest(".product-qty-container")
      .find(".product-qty")
      .html(qty_selector);
    // purpose ani is to give the selector a selected value based on the stored qty of the product
    $(this)
      .closest(".product-qty-container")
      .find(".product-quantity-selector")
      .find(`option[value="${cart_id_qty[i].qty}"]`)
      .prop("selected", true);

    $(this).html("SAVE");
  } else {
    let new_qty = parseInt(
      $(this)
        .closest(".product-qty-container")
        .find(".product-quantity-selector")
        .val()
    );

    cart_id_qty[i].qty = new_qty;

    $(this)
      .closest(".product-qty-container")
      .find(".product-qty")
      .html(`Quantity: ${cart_id_qty[i].qty}`);

    $(this).html("UPDATE");
    updateCheckoutCount();
    console.log(cart_id_qty);
    localStorage.setItem("cart_idArr", JSON.stringify(cart_id_qty));
  }

  update_order_summary();

  console.log(cart_id_qty);
});

cart_card_container.on("click", ".remove-btn", function () {
  let cart_item_card = $(this).closest(".cart-item-card");
  let cart_id = $(this).closest(".cart-item-card").data("id");

  let i = cart_id_qty.findIndex((product) => product.id === cart_id);

  cart_id_qty.splice(i, 1);
  cart_item_card.remove();

  if (cart_id_qty.length === 0) {
    cart_grid_container.css("display", "none");
    empty_cart_err.css("display", "flex");
  }

  console.log("length " + cart_id_qty.length);
  console.log("index " + i);

  update_order_summary();
  updateCheckoutCount();

  localStorage.setItem("cart_idArr", JSON.stringify(cart_id_qty));
});

//here starts the JS for the order summaryyyyyyy HOOO hahahaha

update_order_summary();
updateCheckoutCount();

function get_curr_date() {
  var curr_date_format = { year: "numeric", month: "long", day: "numeric" };
  var curr_date = new Date();

  return curr_date.toLocaleDateString("en-US", curr_date_format);
}

let order_aydi = parseInt(localStorage.getItem("uniqueId")) || 1;

cart_grid_container.on("click", "#place-order-btn", function () {
  // const order_placed_date = get_curr_date();
  cart_id_qty.forEach((product) => {
    product.checkout_date = get_curr_date();
    product.order_id = order_aydi;
  });

  order_aydi += 1;

  const product_orders = cart_id_qty.reduce((acc, cv) => {
    const { order_id } = cv;

    if (!acc[order_id]) {
      acc[order_id] = [];
    }

    acc[order_id].push(cv);
    return acc;
  }, {});

  // localStorage.setItem("cart_idArr", JSON.stringify(cart_id_qty));
  let cartStorageBackUp =
    JSON.parse(localStorage.getItem("trackOrderStorage")) || [];
  if (cartStorageBackUp.length === 0) {
    cartStorageBackUp = cart_id_qty;
  } else {
    cartStorageBackUp = cartStorageBackUp.concat(cart_id_qty);
  }
  console.log("kulira", cart_id_qty);
  console.log("pisti", cartStorageBackUp);
  localStorage.setItem("trackOrderStorage", JSON.stringify(cartStorageBackUp));
  localStorage.setItem("uniqueId", order_aydi);

  localStorage.removeItem("cart_idArr");

  const existingOrders = JSON.parse(localStorage.getItem("orders_by_id")) || {};

  for (const Oid in product_orders) {
    if (!existingOrders[Oid]) {
      existingOrders[Oid] = [];
    }
    existingOrders[Oid] = existingOrders[Oid].concat(product_orders[Oid]);
  }

  localStorage.setItem("orders_by_id", JSON.stringify(existingOrders));

  window.location.href = "/Orders Page/orders.html";
});
