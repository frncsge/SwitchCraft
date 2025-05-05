import { tpProducts } from "../Home Page/tp-products.js";
const product_orders = JSON.parse(localStorage.getItem("orders_by_date")) || {};

$(document).ready(function () {
  //   localStorage.removeItem("orders_by_date");

  if (Object.keys(product_orders).length === 0) {
    $("#no-orders-text-section").css("display", "flex");
  } else {
    $("#no-orders-text-section").css("display", "none");
    for (let date in product_orders) {
      const orders_card_container = $("#orders-card-container");
      const orders_card_grid = $(`<div class="orders-card">
              <div class="order-info-container">
                <section class="left-order-info">
                  <div class="order-placed">
                    <h4>Order Placed:</h4>
                    <p>${date}</p>
                  </div>
                  <div class="total">
                    <h4>Total:</h4>
                    <p class="total-amount">Php 0.00</p>
                  </div>
                </section>
                <section class="right-order-info">
                  <div class="order-id">
                    <h4>Order ID:</h4>
                    <p>123adAEW123</p>
                  </div>
                </section>
              </div>
              <hr />
            </div>`);

      orders_card_container.append(orders_card_grid);
      const orders_card = $(".orders-card");

      let total_cost = 0;
      let total_cost_string;

      product_orders[date].forEach((order) => {
        let index = tpProducts.findIndex(
          (tpProduct) => tpProduct.id === order.id
        );

        const price = order.price;
        const qty = order.qty;

        total_cost += price * qty;
        total_cost_string = total_cost.toLocaleString();

        const product_grid = `<div class="product-grid">
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
    }
  }
});
