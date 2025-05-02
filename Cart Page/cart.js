import { tpProducts } from "../Home Page/tp-products.js";

let cart_id_date = JSON.parse(localStorage.getItem("cart_idArr")) || [];
console.log(cart_id_date);

let display_cart = cart_id_date.map((cart) =>
  tpProducts.find((tpProduct) => tpProduct.id === cart.id)
);

console.log(display_cart);
