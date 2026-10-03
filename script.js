const products = [
  {
    id: 1,
    name: "Pink Floral 2 Piece Suit",
    price: 3290,
    category: "2 Piece",
    description: "A soft pink floral printed shirt paired with matching trousers, perfect for a graceful everyday look.",
    image: "https://nishatlinen.com/cdn/shop/files/U2ST-NISHA26WV1-17-_12.jpg?v=1788861822&width=500"
  },

  {
    id: 2,
    name: "Blue Printed 2 Piece Suit",
    price: 3490,
    category: "2 Piece",
    description: "A beautiful blue printed lawn shirt with coordinated trousers for a fresh and comfortable summer outfit.",
    image: "https://nishatlinen.com/cdn/shop/files/U2ST-NISHA26WV1-23-_6.jpg?v=1788861151&width=500"
  },

  {
    id: 3,
    name: "Green Embroidered 2 Piece Suit",
    price: 3990,
    category: "2 Piece",
    description: "A rich green embroidered shirt with matching trousers, combining traditional detail with a modern modest style.",
    image: "https://nishatlinen.com/cdn/shop/files/U2ST-NISHA26WV1-26-_7.jpg?v=1788856016&width=500"
  },

  {
    id: 4,
    name: "Peach Floral 1 Piece Shirt",
    price: 2590,
    category: "1 Piece",
    description: "A long peach floral printed shirt with a relaxed silhouette, ideal for a simple and elegant everyday outfit.",
    image: "https://nishatlinen.com/cdn/shop/files/U2STE-NISHA26WV1-25-_6.jpg?v=1788785390&width=500"
  },

  {
    id: 5,
    name: "White Embroidered 1 Piece Shirt",
    price: 2890,
    category: "1 Piece",
    description: "A classic white long shirt featuring delicate embroidery for a clean and sophisticated Pakistani look.",
    image: "https://nishatlinen.com/cdn/shop/files/U2STE-NISHA26WV1-27-_7.jpg?v=1788785269&width=500"
  },

  {
    id: 6,
    name: "Maroon Printed 1 Piece Shirt",
    price: 2790,
    category: "1 Piece",
    description: "A deep maroon printed long shirt with elegant traditional-inspired patterns and a comfortable modest fit.",
    image: "https://nishatlinen.com/cdn/shop/files/FTB-TRO-10-_1.jpg?v=1788771971&width=500"
  },

  {
    id: 7,
    name: "Pastel Pink 3 Piece Suit",
    price: 5490,
    category: "3 Piece",
    description: "A pastel pink printed shirt with matching trousers and a coordinated dupatta for a complete feminine look.",
    image: "https://nishatlinen.com/cdn/shop/files/U3PE-NISHA26WV1-58-_11.jpg?v=1788935362&width=500"
  },

  {
    id: 8,
    name: "Black Embroidered 3 Piece Suit",
    price: 6290,
    category: "3 Piece",
    description: "A sophisticated black embroidered shirt with matching trousers and dupatta, perfect for an elegant occasion.",
    image: "https://nishatlinen.com/cdn/shop/files/U3PE-NISHA26WV1-6-_7.jpg?v=1788867266&width=500"
  },

  {
    id: 9,
    name: "Sage Green 3 Piece Suit",
    price: 5790,
    category: "3 Piece",
    description: "A soft sage green printed shirt paired with matching trousers and a lightweight dupatta for a graceful look.",
    image: "https://nishatlinen.com/cdn/shop/files/U3P-NISHA26WV1-61-_2.jpg?v=1788950371&width=500"
  },

  {
    id: 10,
    name: "Beige Floral 3 Piece Suit",
    price: 5990,
    category: "3 Piece",
    description: "A neutral beige floral printed shirt with matching trousers and dupatta, designed for an elegant modest style.",
    image: "https://nishatlinen.com/cdn/shop/files/U3P-NISHA26WV1-17-_4.jpg?v=1788851742&width=500"
  }
];


// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts(list = products) {

  const productsContainer = document.getElementById("products");

  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  list.forEach(product => {

    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.src='https://placehold.co/800x1000/f0ebe5/6b5b50?text=Rameen+Store'"
        >

        <span class="product-tag">
          ${product.category}
        </span>

        <button
          class="quick-add"
          onclick="addToCart(${product.id})"
        >
          Add to Cart
        </button>

      </div>

      <div class="product-info">

        <p class="product-category">
          Pakistani Collection
        </p>

        <h3>${product.name}</h3>

        <p class="product-description">
          ${product.description}
        </p>

        <div class="product-bottom">

          <strong>
            Rs. ${product.price.toLocaleString()}
          </strong>

          <button
            class="add-button"
            onclick="addToCart(${product.id})"
          >
            +
          </button>

        </div>

      </div>
    `;

    productsContainer.appendChild(card);
  });
}


// ===============================
// FILTER
// ===============================

function filterProducts(category, button) {

  if (button) {

    document
      .querySelectorAll(".filter")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
  }

  if (category.toLowerCase() === "all") {

    displayProducts(products);

    return;
  }

  const filtered = products.filter(
    product => product.category === category
  );

  displayProducts(filtered);
}


// ===============================
// SEARCH
// ===============================

function searchProducts() {

  const input = document.getElementById("searchInput");

  if (!input) return;

  const search = input.value.toLowerCase().trim();

  const results = products.filter(product =>
    product.name.toLowerCase().includes(search) ||
    product.category.toLowerCase().includes(search) ||
    product.description.toLowerCase().includes(search)
  );

  displayProducts(results);
}


// ===============================
// CART
// ===============================

let cart = JSON.parse(
  localStorage.getItem("rameenCart")
) || [];


// ADD TO CART

function addToCart(productId) {

  const product = products.find(
    product => product.id === productId
  );

  if (!product) return;

  const existing = cart.find(
    item => item.id === productId
  );

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  updateCart();
  openCart();
}


// SAVE CART

function saveCart() {

  localStorage.setItem(
    "rameenCart",
    JSON.stringify(cart)
  );
}


// UPDATE CART

function updateCart() {

  const cartItems =
    document.getElementById("cartItems");

  const cartCount =
    document.getElementById("cartCount");

  const cartTotal =
    document.getElementById("cartTotal");

  if (!cartItems) return;

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {

    total += item.price * item.quantity;

    count += item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">

        <img
          src="${item.image}"
          alt="${item.name}"
          onerror="this.src='https://placehold.co/200x250/f0ebe5/6b5b50?text=Rameen'"
        >

        <div class="cart-item-info">

          <h4>
            ${item.name}
          </h4>

          <p>
            Rs. ${item.price.toLocaleString()}
          </p>

          <div class="quantity-controls">

            <button
              onclick="changeQuantity(${item.id}, -1)"
            >
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              onclick="changeQuantity(${item.id}, 1)"
            >
              +
            </button>

          </div>

        </div>

        <button
          class="remove-item"
          onclick="removeItem(${item.id})"
        >
          ×
        </button>

      </div>
    `;
  });


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">

        <h3>
          Your cart is empty
        </h3>

        <p>
          Explore our Pakistani collection.
        </p>

      </div>
    `;
  }


  if (cartCount) {
    cartCount.textContent = count;
  }


  if (cartTotal) {

    cartTotal.textContent =
      `Rs. ${total.toLocaleString()}`;
  }
}


// CHANGE QUANTITY

function changeQuantity(productId, change) {

  const item = cart.find(
    item => item.id === productId
  );

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {

    cart = cart.filter(
      item => item.id !== productId
    );
  }

  saveCart();
  updateCart();
}


// REMOVE ITEM

function removeItem(productId) {

  cart = cart.filter(
    item => item.id !== productId
  );

  saveCart();
  updateCart();
}


// ===============================
// CART OPEN / CLOSE
// ===============================

function openCart() {

  document
    .getElementById("overlay")
    ?.classList.add("active");

  document
    .getElementById("cart")
    ?.classList.add("active");
}


function closeCart() {

  document
    .getElementById("overlay")
    ?.classList.remove("active");

  document
    .getElementById("cart")
    ?.classList.remove("active");
}


// ===============================
// CHECKOUT
// ===============================

function checkout() {

  if (cart.length === 0) {

    alert("Your cart is empty.");

    return;
  }

  document
    .getElementById("checkoutModal")
    ?.classList.add("active");
}


function closeCheckout() {

  document
    .getElementById("checkoutModal")
    ?.classList.remove("active");
}


function placeOrder(event) {

  if (event) {
    event.preventDefault();
  }

  if (cart.length === 0) {

    alert("Your cart is empty.");

    return;
  }

  alert(
    "Thank you for shopping at Rameen Store! Your order has been placed."
  );

  cart = [];

  saveCart();
  updateCart();
  closeCheckout();
  closeCart();
}


// ===============================
// START WEBSITE
// ===============================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    displayProducts();

    updateCart();

    const searchInput =
      document.getElementById("searchInput");

    if (searchInput) {

      searchInput.addEventListener(
        "input",
        searchProducts
      );
    }

  }
);