import { tpProducts } from "../Home Page/tp-products.js";
let favorites_id = JSON.parse(localStorage.getItem("favorites_idArr")) || [];
let cart_id_qty = JSON.parse(localStorage.getItem("cart_idArr")) || [];

const query_string = window.location.search;

const url_parameters = new URLSearchParams(query_string);

const product_url_id = url_parameters.get("id");

const product = tpProducts.find((tpProduct) => tpProduct.id === product_url_id);

const grid = $("#product-grid");

const product_display = `<img
          id="product-img"
          src="${product.img}"
          alt="product-img"
        />

        <div id="product-info-container">
          <h1 id="product-name">
            ${product.name}
          </h1>
          <div id="product-rating-sold-review-container">
            <p id="product-rating">
              <img
                id="star"
                src="/Home Page/one review star 1.png"
                alt="Star"
              />
              ${product.rating}
            </p>
            <p id="product-sold">${product.sold} Sold</p>
            <p id="product-review-count">2 Reviews</p>
          </div>
          <div id="product-price-favorite-btn-container">
            <h2 id="product-price">Php ${product.price}</h2>
            <div id="favorite-btn-container">
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
              <p id="add-to-favorite-text">Add to Favorites</p>
            </div>
          </div>
          <p id="quantity-title-text">Quantity</p>
          <select id="product-quantity-selector">
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
          <div id="add-to-cart-btn-container">
            <button id="add-to-cart-btn">Add to Cart</button>
          </div>
          <hr />
          <div id="product-description-feature-container" class="line-limit">
          <h3 id="about-this-item-title-text">About this item</h3>
          <p id="product-description">
            ${product.description}
          </p>
          <ul id="product-feature-ul">
          </ul>
          </div>
          <button id="read-more-btn">Read More</button>
        </div>`;

grid.append(product_display);

const ul = $("#product-feature-ul");
const desc_feat_con = $("#product-description-feature-container");

product.features.forEach((feature) => {
  const li = $(`<li>${feature}</li>`);
  console.log(li);
  ul.append(li);
});

grid.on("click", "#read-more-btn", function () {
  if ($(this).html() === "Read More") {
    desc_feat_con.removeClass("line-limit");
    $(this).html("Read Less");
  } else {
    desc_feat_con.addClass("line-limit");
    $(this).html("Read More");
  }
});

//functionalities for the heart, quantity and add to cart buttns start diri

const fav_product_exist = favorites_id.find((id) => id === product_url_id);

if (fav_product_exist) {
  $(".style_icon__KAdjP").attr("fill", "red");
}

grid.on("click", ".style_icon__KAdjP", function (event) {
  event.stopPropagation();
  if ($(this).attr("fill") === "red") {
    $(this).attr("fill", "none");

    var index = favorites_id.indexOf(product_url_id);
    favorites_id.splice(index, 1);
  } else {
    $(this).attr("fill", "red");
    favorites_id.unshift(product_url_id);
  }

  localStorage.setItem("favorites_idArr", JSON.stringify(favorites_id));
});

grid.on("click", "#add-to-cart-btn", function () {
  const product_qty = parseInt($("#product-quantity-selector").val());

  let product = { id: product_url_id, qty: product_qty };

  $(this).html("Added to Cart");

  setTimeout(() => {
    $(this).html("Add to Cart");
  }, 1700);

  function cart_obj_maker(p_id, p_qty) {
    //p_id stands for product id and p_qty for product quantity
    return {
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
      cart_id_qty.unshift(cart_obj_maker(product_url_id, product_qty));
    }
  }

  check_duplicate(cart_id_qty, product);

  localStorage.setItem("cart_idArr", JSON.stringify(cart_id_qty));
});
