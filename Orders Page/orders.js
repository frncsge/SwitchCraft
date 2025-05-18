import { tpProducts } from "../Home Page/tp-products.js";
const product_orders = JSON.parse(localStorage.getItem("orders_by_id")) || {};
let cart_id_qty = JSON.parse(localStorage.getItem("cart_idArr")) || [];

$(document).ready(function () {
  // localStorage.removeItem("orders_by_id");
  // localStorage.removeItem("uniqueId");
  // localStorage.removeItem("trackOrderStorage");

  if (Object.keys(product_orders).length === 0) {
    $("#no-orders-text-section").css("display", "flex");
  } else {
    $("#no-orders-text-section").css("display", "none");
    console.log("huhay", product_orders);

    for (let Oid in product_orders) {
      console.log("huhay", product_orders);
      console.log("Oid", Oid);
      const orders_card_container = $("#orders-card-container");
      const orders_card_grid = $(`<div class="orders-card">
              <div class="order-info-container">
                <section class="left-order-info">
                  <div class="order-placed">
                    <h4>Order Placed:</h4>
                    <p>${product_orders[Oid][0].checkout_date}</p>
                  </div>
                  <div class="total">
                    <h4>Total:</h4>
                    <p class="total-amount">Php 0.00</p>
                  </div>
                </section>
                <section class="right-order-info">
                  <div class="order-id">
                    <h4>Order ID:</h4>
                    <p>${Oid}fK2bX9q</p>
                  </div>
                </section>
              </div>
              <hr />
            </div>`);

      orders_card_container.prepend(orders_card_grid);
      const orders_card = orders_card_grid;

      let total_cost = 0;
      let total_cost_string;

      product_orders[Oid].forEach((order) => {
        let index = tpProducts.findIndex(
          (tpProduct) => tpProduct.id === order.id
        );

        const price = order.price;
        const qty = order.qty;

        total_cost += price * qty;
        total_cost_string = total_cost.toLocaleString();

        const product_grid = `<div class="product-grid" data-id="${order.id}">
                <img
                  class="product-img"
                  src="${tpProducts[index].img}"
                  alt="Product Img"
                />
                <div class="product-info-grid">
                  <div class="product-details-container">
                    <h4 class="product-name">
                      ${tpProducts[index].name}
                    </h4>
                    <p class="product-expected-arrival">
                      Expected arrival: ${order.delivery_date}
                    </p>
                    <p class="address">Francis Ge Amoncio 09606161926 Cogo...</p>
                    <p class="product-qty">Quantity: ${order.qty}</p>
                    <p class="product-price">Php ${tpProducts[index].price}.00</p>
                    <div class="buy-again-btn-container">
                      <button class="buy-again-btn">Buy Again</button>
                    </div>
                  </div>
                  <div class="track-cancel-order-container">
                    <div class="track-order-btn-container">
                      <button class="track-order-btn">Track Order</button>
                    </div>
                    <div class="cancel-order-btn-container">
                      <button class="cancel-order-btn">Cancel Order</button>
                    </div>
                  </div>
                </div>
              </div>`;

        orders_card.append(product_grid);
      });

      orders_card.find(".total-amount").text(`Php ${total_cost_string}`);

      const orders_product_container = $(".product-grid");

      orders_product_container.on("click", ".buy-again-btn", function () {
        const data_id = $(this).closest(".product-grid").data("id");

        const product = { id: data_id, qty: 1 };

        $(this).css("width", "130px");
        $(this).html("Added to Cart");

        setTimeout(() => {
          $(this).css("width", "110px");
          $(this).html("Buy Again");
        }, 1700);

        function cart_obj_maker(p_id, p_qty) {
          //p_id stands for product id and p_qty for product quantity
          return {
            order_id: null,
            id: p_id,
            qty: p_qty,
            price: null,
            ship_cost: 0, //zero means the cost of the shipping
            ship_days: 7,
            checkout_date: null,
            delivery_date: null, //gets the current date when a product gets added to the cart
          };
        }

        function check_duplicate(cart_arr, product) {
          let p_exists = cart_arr.find((cart) => cart.id === product.id);
          if (p_exists) {
            p_exists.qty = p_exists.qty + product.qty;
          } else {
            cart_id_qty.unshift(cart_obj_maker(data_id, 1));
          }
        }

        check_duplicate(cart_id_qty, product);
        localStorage.setItem("cart_idArr", JSON.stringify(cart_id_qty)); //stores the cart_id_qty using localStorage
      });

      orders_product_container.on("click", ".track-order-btn", function () {
        const product_id = $(this).closest(".product-grid").data("id");
        window.location.href = `/Track Order Page/track.html?id=${product_id}`;
      });
    }
  }
});
