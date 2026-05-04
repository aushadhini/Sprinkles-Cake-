// Cart management
function getCart() {
  return JSON.parse(localStorage.getItem('sprinkles_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('sprinkles_cart', JSON.stringify(cart));
}

function addToCart(name, price, emoji) {
  const cart = getCart();
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, emoji: emoji || '🎂', qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
  showToast(`${name} added to cart!`);
}

function removeFromCart(name) {
  let cart = getCart().filter(i => i.name !== name);
  saveCart(cart);
  displayCart();
  updateCartCount();
}

function clearCart() {
  saveCart([]);
  displayCart();
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count > 0 ? count : '';
    el.style.display = count > 0 ? 'inline' : 'none';
  });
}

function displayCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total-amount');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <span class="empty-icon">🛒</span>
        <p>Your cart is empty</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top:20px">Browse Cakes</a>
      </div>`;
    if (totalEl) totalEl.textContent = 'LKR 0';
    return;
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  container.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${cart.map(item => `
          <tr>
            <td><span style="font-size:1.4rem;margin-right:10px">${item.emoji}</span>${item.name}</td>
            <td>LKR ${item.price.toLocaleString()}</td>
            <td>${item.qty}</td>
            <td>LKR ${(item.price * item.qty).toLocaleString()}</td>
            <td><button onclick="removeFromCart('${item.name}')" style="background:transparent;color:#C96840;border:1px solid #C96840;padding:6px 12px;border-radius:50px;cursor:pointer;font-size:0.8rem">Remove</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="cart-summary">
      <h3>Total: LKR ${total.toLocaleString()}</h3>
      <div style="display:flex;gap:12px;justify-content:flex-end;flex-wrap:wrap">
        <button class="btn btn-secondary" onclick="clearCart()">Clear Cart</button>
        <button class="btn btn-primary" onclick="showToast('Order placed! We will contact you soon 🎂')">Place Order</button>
      </div>
    </div>`;
}

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

document.addEventListener('DOMContentLoaded', updateCartCount);