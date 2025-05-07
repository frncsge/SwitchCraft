import { tpProducts } from "../Home Page/tp-products.js";
let track_order_storage =
  JSON.parse(localStorage.getItem("trackOrderStorage")) || [];

//localStorage.removeItem("trackOrderStorage");

let query_string = window.location.search;
let params = new URLSearchParams(query_string);
let product_id = params.get("id");

let order_index = track_order_storage.findIndex(
  (product) => product.id === product_id
);
let tpProduct_index = tpProducts.findIndex(
  (product) => product.id === product_id
);

let { price, qty, ship_cost } = track_order_storage[order_index];

let total_price = price;
let total_price_string = total_price.toLocaleString();

console.log(total_price_string);

const product_container = `<div id="product-container">
        <p id="delivery-date">Expected Arrival: ${track_order_storage[order_index].delivery_date}</p>
        <p id="address">
          Francis Ge Amoncio 09606161926 Cogon, Tagbilaran City, Bohol, Region
          VII, Central Visayas
        </p>
        <p id="product-name">${tpProducts[tpProduct_index].name}</p>
        <p id="quantity">Quantity: ${qty}</p>
        <p id="product-price">Php ${total_price_string}.00</p>
        <img
          id="product-img"
          src="${tpProducts[tpProduct_index].img}"
          alt="Product img"
        />
        <div id="loading-bar">
          <div id="loading-progress"></div>
        </div>
        <div id="loading-indicator-container">
          <p>Preparing</p>
          <p>Shipped</p>
          <p>Delivered</p>
        </div>
      </div>`;

$("main").append(product_container);
