import products from "./products.js";

let cart = JSON.parse(localStorage.getItem('myCart')) || [];

const productsList = document.getElementById('products-list');
const cartItemsContainer = document.getElementById('cart-items');
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const cartSummary = document.getElementById('cart-summary');

function renderProducts(productsToRender) {
    productsList.innerHTML = '';

    productsToRender.forEach(product => {
        const prodCard = document.createElement('div');
        prodCard.classList.add('product-card');

        const discountedPrice = (product.price * (1 - product.discount / 100));

        prodCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
        <div class="price-section">

            <span class="current-price">₹${Number(discountedPrice).toLocaleString('en-IN')}</span>

            ${product.discount > 0 ? `<span class="original-price">₹${product.price.toLocaleString('en-IN')}</span>` : ''}

            ${product.discount > 0 ? `<span class="discount-tag">${product.discount}% OFF</span>` : ''}

        </div>

                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>`;
        productsList.appendChild(prodCard);
    });
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || p.category === category;
        return matchesSearch && matchesCategory;
    });

    renderProducts(filtered);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCart();
}

function updateCart() {
    localStorage.setItem('myCart', JSON.stringify(cart));

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartToggle.innerText = `Cart (${totalItems})`;

    renderCartItems();
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    let totalGST = 0;

    cart.forEach(item => {
        const finalPrice = item.price * (1 - item.discount / 100);
        const itemTotal = finalPrice * item.quantity;
        subtotal += itemTotal;
        totalGST += (itemTotal * (item.gst / 100));

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${finalPrice.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div>
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>
            </div>`;
    });

    cartSummary.innerHTML = `
        <hr>
        <p>Subtotal: ₹${subtotal.toLocaleString('en-IN')}</p>
        <p>GST: ₹${totalGST.toLocaleString('en-IN')}</p>
        <h3>Total: ₹${(subtotal + totalGST).toLocaleString('en-IN')}</h3>
    `;
}

cartToggle.addEventListener('click', () => cartSidebar.classList.add('active'));
closeCart.addEventListener('click', () => cartSidebar.classList.remove('active'));

searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const id = parseInt(e.target.dataset.id);
        addToCart(id);
    }
});

window.changeQty = (id, delta) => updateQuantity(id, delta);

renderProducts(products);
updateCart();