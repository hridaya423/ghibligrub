document.addEventListener('DOMContentLoaded', () => {
  
  let cart = JSON.parse(localStorage.getItem('ghibliCart')) || [];
  
  const updateCartCount = () => {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      cartCountElement.textContent = itemCount;
      
      
      if (itemCount > 0) {
        cartCountElement.classList.add('has-items');
      } else {
        cartCountElement.classList.remove('has-items');
      }
    }
  };
  
  const saveCart = () => {
    localStorage.setItem('ghibliCart', JSON.stringify(cart));
    updateCartCount();
  };
  
  window.addToCart = (name, price) => {
    
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        name,
        price,
        quantity: 1
      });
    }
    
    
    showNotification(`${name} added to cart!`);
    
    
    saveCart();
  };
  
  window.removeFromCart = (index) => {
    if (index >= 0 && index < cart.length) {
      const removedItem = cart[index];
      cart.splice(index, 1);
      saveCart();
      
      if (window.location.pathname.includes('cart.html')) {
        renderCartItems();
        updateCartTotal();
      }
      
      showNotification(`${removedItem.name} removed from cart`);
    }
  };
  

  window.updateQuantity = (index, change) => {
    if (index >= 0 && index < cart.length) {
      cart[index].quantity += change;
      
      if (cart[index].quantity <= 0) {
        window.removeFromCart(index);
        return;
      }
      
      saveCart();
      
      if (window.location.pathname.includes('cart.html')) {
        renderCartItems();
        updateCartTotal();
      }
    }
  };
  
  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  };
  
  window.renderCartItems = () => {
    const cartItemsElement = document.getElementById('cart-items');
    if (!cartItemsElement) return;
    
    if (cart.length === 0) {
      cartItemsElement.innerHTML = `
        <div class="empty-cart">
          <p>Your cart is empty</p>
          <div class="soot-sprite"></div>
          <a href="menu.html" class="btn">Browse Menu</a>
        </div>
      `;
      return;
    }
    
    cartItemsElement.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>$${item.price} each</p>
        </div>
        <div class="item-quantity">
          <button onclick="updateQuantity(${index}, -1)" class="quantity-btn">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${index}, 1)" class="quantity-btn">+</button>
        </div>
        <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        <button onclick="removeFromCart(${index})" class="remove-btn">×</button>
      </div>
    `).join('');
  };
  
  window.updateCartTotal = () => {
    const totalElement = document.getElementById('cart-total');
    if (!totalElement) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = `$${total.toFixed(2)}`;
    
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.style.display = cart.length > 0 ? 'block' : 'none';
    }
  };
  
  updateCartCount();
  
  if (window.location.pathname.includes('cart.html')) {
    window.renderCartItems();
    window.updateCartTotal();
  }
  
  window.clearCart = () => {
    if (cart.length === 0) return;
    
    const confirmOverlay = document.createElement('div');
    confirmOverlay.className = 'checkout-overlay';
    confirmOverlay.innerHTML = `
      <div class="checkout-animation confirm-clear">
        <h2>Clear your cart?</h2>
        <p>All items will be removed.</p>
        <div class="confirm-buttons">
          <button class="btn-outline cancel-btn">Cancel</button>
          <button class="btn confirm-btn">Yes, Clear Cart</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(confirmOverlay);
    
    const cancelBtn = confirmOverlay.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', () => {
      document.body.removeChild(confirmOverlay);
    });
    
    const confirmBtn = confirmOverlay.querySelector('.confirm-btn');
    confirmBtn.addEventListener('click', () => {

      cart = [];
      saveCart();
      
      if (window.location.pathname.includes('cart.html')) {
        renderCartItems();
        updateCartTotal();
      }
      
      showNotification('Cart has been cleared!');
      
      document.body.removeChild(confirmOverlay);
    });
  };
  
  window.checkout = () => {
    if (cart.length === 0) return;
    
    const checkoutOverlay = document.createElement('div');
    checkoutOverlay.className = 'checkout-overlay';
    checkoutOverlay.innerHTML = `
      <div class="checkout-animation">
        <div class="totoro-loader"></div>
        <p>Processing your order...</p>
      </div>
    `;
    
    document.body.appendChild(checkoutOverlay);
    
    setTimeout(() => {
      cart = [];
      saveCart();
      
      checkoutOverlay.innerHTML = `
        <div class="checkout-success">
          <div class="success-icon">✓</div>
          <h2>Order Complete!</h2>
          <p>Your magical feast will be ready soon.</p>
          <button onclick="window.location.href='menu.html'" class="btn">Return to Menu</button>
        </div>
      `;
      
      const returnBtn = checkoutOverlay.querySelector('.btn');
      returnBtn.addEventListener('click', () => {
        document.body.removeChild(checkoutOverlay);
      });
      
    }, 2000);
  };
});