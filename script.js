/* ==========================================
   TOLLIVER'S TREATS
   WEBSITE FUNCTIONALITY
========================================== */

// EDIT THE COOKIE NAMES, PRICES, DESCRIPTIONS,
// AND IMAGE FILES HERE WHEN NEEDED.

const products = [
  {
    id: "strawberry-lemonade",
    name: "Strawberry Lemonade",
    description:
      "A sweet strawberry-and-lemon cookie finished with a smooth white drizzle.",
    image: "assets/strawberry-lemonade.jpeg",
    price: 24,
    unit: "dozen"
  },

  {
    id: "cookies-and-cream",
    name: "Cookies & Cream",
    description:
      "A soft cookies-and-cream cookie packed with Oreo pieces and finished with white drizzle.",
    image: "assets/assorted-cookies.jpeg",
    price: 24,
    unit: "dozen"
  }
];

/*
  IMPORTANT:

  Replace the link below with a real secure checkout link
  from Stripe, Square, Shopify, or another payment provider.

  Example:

  const SECURE_PAYMENT_LINK =
    "https://buy.stripe.com/your-payment-link";
*/

const SECURE_PAYMENT_LINK =
  "https://example.com/replace-with-your-secure-payment-link";

/* ==========================================
   CART STORAGE
========================================== */

let cart =
  JSON.parse(localStorage.getItem("tolliversTreatsCart")) || [];

/* ==========================================
   PAGE ELEMENTS
========================================== */

const productGrid = document.getElementById("productGrid");

const cartDrawer = document.getElementById("cartDrawer");

const drawerBackdrop =
  document.getElementById("drawerBackdrop");

const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

const reviewDialog =
  document.getElementById("reviewDialog");

const orderSummary =
  document.getElementById("orderSummary");

/* ==========================================
   MONEY FORMATTER
========================================== */

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

/* ==========================================
   DISPLAY COOKIE PRODUCTS
========================================== */

function renderProducts() {
  productGrid.innerHTML = products
    .map((product) => {
      return `
        <article class="product-card">

          <img
            class="product-image"
            src="${product.image}"
            alt="${product.name} cookies"
          />

          <div class="product-content">

            <p class="eyebrow">
              Signature flavor
            </p>

            <h3>
              ${product.name}
            </h3>

            <p>
              ${product.description}
            </p>

            <span class="product-price">
              ${formatMoney(product.price)} per ${product.unit}
            </span>

            <div class="quantity-row">

              <label>

                Quantity

                <select
                  id="qty-${product.id}"
                  aria-label="Quantity for ${product.name}"
                >

                  <option value="1">
                    1
                  </option>

                  <option value="2">
                    2
                  </option>

                  <option value="3">
                    3
                  </option>

                  <option value="4">
                    4
                  </option>

                  <option value="5">
                    5
                  </option>

                </select>

              </label>

              <button
                class="button primary"
                onclick="addToCart('${product.id}')"
              >
                Add to cart
              </button>

            </div>

          </div>

        </article>
      `;
    })
    .join("");
}

/* ==========================================
   ADD PRODUCT TO CART
========================================== */

function addToCart(productId) {
  const product = products.find(
    (item) => item.id === productId
  );

  const quantitySelect = document.getElementById(
    `qty-${productId}`
  );

  const quantity = Number(quantitySelect.value);

  const existingItem = cart.find(
    (item) => item.id === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity: quantity
    });
  }

  saveCart();

  openCart();
}

/* ==========================================
   REMOVE PRODUCT FROM CART
========================================== */

function removeFromCart(productId) {
  cart = cart.filter(
    (item) => item.id !== productId
  );

  saveCart();
}

/* ==========================================
   CLEAR CART
========================================== */

function clearCart() {
  const confirmed = confirm(
    "Are you sure you want to clear your cart?"
  );

  if (!confirmed) {
    return;
  }

  cart = [];

  saveCart();
}

/* ==========================================
   SAVE CART
========================================== */

function saveCart() {
  localStorage.setItem(
    "tolliversTreatsCart",
    JSON.stringify(cart)
  );

  renderCart();
}

/* ==========================================
   DISPLAY CART
========================================== */

function renderCart() {
  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  cartCount.textContent = itemCount;

  cartTotal.textContent = formatMoney(totalPrice);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">

        <p>
          Your cart is empty.
        </p>

        <p>
          Add a cookie flavor to get started.
        </p>

      </div>
    `;

    return;
  }

  cartItems.innerHTML = cart
    .map((item) => {
      return `
        <div class="cart-item">

          <img
            src="${item.image}"
            alt="${item.name}"
          />

          <div>

            <h4>
              ${item.name}
            </h4>

            <p>
              ${item.quantity}
              ${item.unit}${item.quantity > 1 ? "s" : ""}
              ×
              ${formatMoney(item.price)}
            </p>

            <strong>
              ${formatMoney(item.price * item.quantity)}
            </strong>

          </div>

          <button
            class="remove-item"
            onclick="removeFromCart('${item.id}')"
          >
            Remove
          </button>

        </div>
      `;
    })
    .join("");
}

/* ==========================================
   OPEN CART
========================================== */

function openCart() {
  cartDrawer.classList.add("active");

  drawerBackdrop.classList.add("active");

  cartDrawer.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add("no-scroll");
}

/* ==========================================
   CLOSE CART
========================================== */

function closeCart() {
  cartDrawer.classList.remove("active");

  drawerBackdrop.classList.remove("active");

  cartDrawer.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove("no-scroll");
}

/* ==========================================
   CREATE ORDER SUMMARY
========================================== */

function buildOrderText() {
  const customerName =
    document.getElementById("customerName").value.trim();

  const customerPhone =
    document.getElementById("customerPhone").value.trim();

  const fulfillmentMethod =
    document.querySelector(
      'input[name="fulfillment"]:checked'
    ).value;

  const customerAddress =
    document.getElementById("customerAddress").value.trim();

  const requestedDate =
    document.getElementById("requestedDate").value;

  const orderNotes =
    document.getElementById("orderNotes").value.trim();

  const itemLines = cart
    .map((item) => {
      return (
        `• ${item.name}: ` +
        `${item.quantity} ` +
        `${item.unit}${item.quantity > 1 ? "s" : ""}` +
        ` — ${formatMoney(item.price * item.quantity)}`
      );
    })
    .join("\n");

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return `
TOLLIVER'S TREATS ORDER

Customer: ${customerName}
Phone: ${customerPhone}
Order method: ${fulfillmentMethod}
${
  fulfillmentMethod === "Delivery"
    ? `Delivery address: ${customerAddress}`
    : ""
}
Requested date: ${requestedDate}

ITEMS

${itemLines}

Estimated total: ${formatMoney(totalPrice)}

Notes: ${orderNotes || "None"}
  `.trim();
}

/* ==========================================
   OPEN AND CLOSE CART BUTTONS
========================================== */

document
  .getElementById("openCart")
  .addEventListener("click", openCart);

document
  .getElementById("closeCart")
  .addEventListener("click", closeCart);

drawerBackdrop.addEventListener(
  "click",
  closeCart
);

/* ==========================================
   CLEAR CART BUTTON
========================================== */

document
  .getElementById("clearCart")
  .addEventListener("click", clearCart);

/* ==========================================
   CONTINUE FROM CART TO ORDER FORM
========================================== */

document
  .getElementById("goToOrder")
  .addEventListener("click", () => {
    closeCart();

    document
      .getElementById("order")
      .scrollIntoView({
        behavior: "smooth"
      });
  });

/* ==========================================
   PICKUP OR DELIVERY
========================================== */

const fulfillmentOptions =
  document.querySelectorAll(
    'input[name="fulfillment"]'
  );

fulfillmentOptions.forEach((option) => {
  option.addEventListener(
    "change",
    (event) => {
      const addressField =
        document.getElementById("addressField");

      const addressInput =
        document.getElementById(
          "customerAddress"
        );

      const deliverySelected =
        event.target.value === "Delivery";

      addressField.classList.toggle(
        "hidden",
        !deliverySelected
      );

      addressInput.required =
        deliverySelected;
    }
  );
});

/* ==========================================
   REVIEW ORDER FORM
========================================== */

document
  .getElementById("orderForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      alert(
        "Your cart is empty. Add at least one cookie flavor first."
      );

      document
        .getElementById("menu")
        .scrollIntoView({
          behavior: "smooth"
        });

      return;
    }

    const selectedMethod =
      document.querySelector(
        'input[name="fulfillment"]:checked'
      ).value;

    const address =
      document.getElementById(
        "customerAddress"
      ).value.trim();

    if (
      selectedMethod === "Delivery" &&
      address === ""
    ) {
      alert(
        "Please enter a delivery address."
      );

      return;
    }

    const summary = buildOrderText();

    orderSummary.innerHTML = `
      <div class="summary-box">
        ${summary}
      </div>
    `;

    reviewDialog.showModal();
  });

/* ==========================================
   CLOSE ORDER REVIEW
========================================== */

document
  .getElementById("closeDialog")
  .addEventListener("click", () => {
    reviewDialog.close();
  });

/* ==========================================
   COPY ORDER DETAILS
========================================== */

document
  .getElementById("copyOrder")
  .addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(
        buildOrderText()
      );

      alert(
        "Order details copied."
      );
    } catch (error) {
      alert(
        "The order could not be copied automatically. Highlight the order details and copy them manually."
      );
    }
  });

/* ==========================================
   SECURE CHECKOUT
========================================== */

document
  .getElementById("secureCheckout")
  .addEventListener("click", () => {
    if (
      SECURE_PAYMENT_LINK.includes(
        "example.com"
      )
    ) {
      alert(
        "Payment is not connected yet. Open script.js and replace SECURE_PAYMENT_LINK with your Stripe, Square, or Shopify checkout link."
      );

      return;
    }

    window.location.href =
      SECURE_PAYMENT_LINK;
  });

/* ==========================================
   MOBILE MENU
========================================== */

const menuToggle =
  document.querySelector(".menu-toggle");

const navigation =
  document.querySelector(".nav-links");

menuToggle.addEventListener(
  "click",
  () => {
    const menuIsOpen =
      navigation.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(menuIsOpen)
    );
  }
);

document
  .querySelectorAll(".nav-links a")
  .forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    });
  });

/* ==========================================
   PREVENT PAST ORDER DATES
========================================== */

const requestedDateInput =
  document.getElementById("requestedDate");

const today =
  new Date().toISOString().split("T")[0];

requestedDateInput.min = today;

/* ==========================================
   FOOTER YEAR
========================================== */

document.getElementById(
  "year"
).textContent = new Date().getFullYear();

/* ==========================================
   INITIALIZE WEBSITE
========================================== */

renderProducts();

renderCart();
