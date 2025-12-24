/* ==================== RISEUP FARMS - COMPLETE FIXED JAVASCRIPT ==================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------
     1. ANIMATION OBSERVER
     ----------------------------------------------------------- */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry); 
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .stagger').forEach(el => {
    observer.observe(el);
  });

  /* -----------------------------------------------------------
     2. MOBILE MENU LOGIC + OVERLAY
     ----------------------------------------------------------- */
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const slideMenu = document.getElementById('slide-menu');
  const mobileSlideClose = document.getElementById('mobile-slide-close');
  
  // Create overlay
  let menuOverlay = document.querySelector('.menu-overlay');
  if (!menuOverlay) {
    menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
  }

  function openMenu() {
    if (slideMenu) {
      slideMenu.classList.add('active');
      menuOverlay.classList.add('active');
      document.body.classList.add('menu-open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
      slideMenu.setAttribute('aria-hidden', 'false');
    }
  }

  function closeMenu() {
    if (slideMenu) {
      slideMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      slideMenu.setAttribute('aria-hidden', 'true');
    }
  }

  if (menuToggle && slideMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (slideMenu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (mobileSlideClose) {
      mobileSlideClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenu();
      });
    }

    menuOverlay.addEventListener('click', () => {
      closeMenu();
    });

    document.addEventListener('click', (e) => {
      if (slideMenu.classList.contains('active') && 
          !slideMenu.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* -----------------------------------------------------------
     3. DARK/LIGHT MODE
     ----------------------------------------------------------- */
  const modeSwitch = document.getElementById('mode-switch');
  const mobileModeSwitch = document.getElementById('mobile-mode-switch');

  function toggleMode() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    const icon = isLight ? '🌞' : '🌙';
    
    if (modeSwitch) {
      const img = modeSwitch.querySelector('img');
      if (img) {
        img.src = isLight 
          ? 'https://img.icons8.com/ios/50/D4AF37/sun.png' 
          : 'https://img.icons8.com/ios/50/D4AF37/moon-symbol.png';
      } else {
        modeSwitch.textContent = icon;
      }
    }
    if (mobileModeSwitch) mobileModeSwitch.textContent = icon;
  }

  if (modeSwitch) modeSwitch.addEventListener('click', toggleMode);
  if (mobileModeSwitch) mobileModeSwitch.addEventListener('click', toggleMode);

  /* -----------------------------------------------------------
     4. SEARCH BAR LOGIC
     ----------------------------------------------------------- */
  const searchToggle = document.getElementById('search-toggle');
  const mobileSearchToggle = document.getElementById('mobile-search-toggle');
  const searchOverlay = document.getElementById('search-bar-overlay');
  const searchClose = document.getElementById('search-bar-close');
  const searchInput = document.getElementById('overlay-search-input');

  function openSearch(e) {
    if (e) e.stopPropagation();
    if (searchOverlay) {
      searchOverlay.classList.add('active');
      setTimeout(() => searchInput && searchInput.focus(), 100);
      closeMenu();
    }
  }
  
  function closeSearch() {
    if (searchOverlay) searchOverlay.classList.remove('active');
  }

  if (searchToggle) searchToggle.addEventListener('click', openSearch);
  if (mobileSearchToggle) {
    mobileSearchToggle.addEventListener('click', (e) => {
      openSearch(e);
      closeMenu();
    });
  }
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeMenu();
      hideAuthModal();
    }
  });

  /* -----------------------------------------------------------
     5. DESKTOP DROPDOWNS
     ----------------------------------------------------------- */
  document.querySelectorAll('.nav-item.has-dropdown').forEach(dropdownParent => {
    const toggle = dropdownParent.querySelector('.dropdown-toggle') || dropdownParent.querySelector('a');
    const dropdownMenu = dropdownParent.querySelector('.dropdown-menu');

    if (toggle && dropdownMenu) {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault(); 
          e.stopPropagation();

          const isOpen = dropdownParent.classList.contains('active');

          document.querySelectorAll('.nav-item.has-dropdown.active').forEach(item => {
            if (item !== dropdownParent) {
              item.classList.remove('active');
            }
          });

          dropdownParent.classList.toggle('active', !isOpen);
        }
      });
    }
  });

  document.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-item.has-dropdown.active').forEach(item => {
      if (!item.contains(e.target)) {
        item.classList.remove('active');
      }
    });
  });

  /* -----------------------------------------------------------
     6. MOBILE DROPDOWN ACCORDION
     ----------------------------------------------------------- */
  document.querySelectorAll('.mobile-has-dropdown').forEach(dropdownParent => {
    const mainLink = dropdownParent.querySelector('.slide-menu-link');
    const toggleBtn = dropdownParent.querySelector('.mobile-dropdown-btn');
    const submenu = dropdownParent.querySelector('.mobile-dropdown-menu');

    if (toggleBtn && submenu) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';

        document.querySelectorAll('.mobile-has-dropdown').forEach(otherDropdown => {
          if (otherDropdown !== dropdownParent) {
            const otherBtn = otherDropdown.querySelector('.mobile-dropdown-btn');
            const otherMenu = otherDropdown.querySelector('.mobile-dropdown-menu');
            if (otherBtn && otherMenu) {
              otherBtn.setAttribute('aria-expanded', 'false');
              otherMenu.setAttribute('aria-hidden', 'true');
              otherMenu.classList.remove('open');
              otherMenu.style.maxHeight = "0";
            }
          }
        });

        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        submenu.setAttribute('aria-hidden', isExpanded);
        submenu.classList.toggle('open', !isExpanded);

        if (!isExpanded) {
          submenu.style.maxHeight = submenu.scrollHeight + "px";
        } else {
          submenu.style.maxHeight = "0";
        }
      });
    }

    if (mainLink) {
      mainLink.addEventListener('click', () => {
        setTimeout(() => closeMenu(), 200);
      });
    }

    if (submenu) {
      submenu.querySelectorAll('a').forEach(subLink => {
        subLink.addEventListener('click', () => {
          setTimeout(() => closeMenu(), 200);
        });
      });
    }
  });

  document.querySelectorAll('.slide-nav-links > li > a.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => closeMenu(), 200);
    });
  });

  /* -----------------------------------------------------------
     7. AUTO-CLOSE ON SCROLL
     ----------------------------------------------------------- */
  window.addEventListener('scroll', () => {
    if (slideMenu && slideMenu.classList.contains('active')) {
      closeMenu();
    }

    if (searchOverlay && searchOverlay.classList.contains('active')) {
      searchOverlay.classList.remove('active');
      searchOverlay.setAttribute('aria-hidden', 'true');
    }
  }, { passive: true });

  // Initialize authentication and cart systems
  initAuth();
  initCart();

}); // END DOMContentLoaded

/* ==================== AUTHENTICATION SYSTEM ==================== */

let currentUser = null;

function loadUser() {
  const savedUser = localStorage.getItem('riseupUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    updateUIForLoggedInUser();
  }
}

function saveUser(user) {
  localStorage.setItem('riseupUser', JSON.stringify(user));
  currentUser = user;
}

function isLoggedIn() {
  return currentUser !== null;
}

function showAuthModal() {
  const authModal = document.getElementById('auth-modal');
  const authOverlay = document.getElementById('auth-overlay');
  
  if (authModal && authOverlay) {
    authModal.classList.add('active');
    authOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    showSignInForm();
  }
}

function hideAuthModal() {
  const authModal = document.getElementById('auth-modal');
  const authOverlay = document.getElementById('auth-overlay');
  
  if (authModal && authOverlay) {
    authModal.classList.remove('active');
    authOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function showSignInForm() {
  const signinForm = document.getElementById('signin-form');
  const signupForm = document.getElementById('signup-form');
  
  if (signinForm && signupForm) {
    signinForm.classList.add('active');
    signupForm.classList.remove('active');
  }
}

function showSignUpForm() {
  const signinForm = document.getElementById('signin-form');
  const signupForm = document.getElementById('signup-form');
  
  if (signinForm && signupForm) {
    signinForm.classList.remove('active');
    signupForm.classList.add('active');
  }
}

function handleSignIn(e) {
  e.preventDefault();
  
  const email = document.getElementById('signin-email').value.trim();
  const password = document.getElementById('signin-password').value;
  
  if (!email || !password) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  const users = JSON.parse(localStorage.getItem('riseupUsers') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const safeUser = { name: user.name, email: user.email };
    saveUser(safeUser);
    hideAuthModal();
    showNotification(`Welcome back, ${user.name}! 🎉`, 'success');
    updateUIForLoggedInUser();
    e.target.reset();
  } else {
    showNotification('Invalid email or password. Please try again.', 'error');
  }
}

function handleSignUp(e) {
  e.preventDefault();
  
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;
  
  if (!name || !email || !password || !confirmPassword) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showNotification('Passwords do not match!', 'error');
    return;
  }
  
  if (password.length < 8) {
    showNotification('Password must be at least 8 characters!', 'error');
    return;
  }
  
  const users = JSON.parse(localStorage.getItem('riseupUsers') || '[]');
  
  if (users.find(u => u.email === email)) {
    showNotification('An account with this email already exists!', 'error');
    return;
  }
  
  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem('riseupUsers', JSON.stringify(users));
  
  const safeUser = { name, email };
  saveUser(safeUser);
  hideAuthModal();
  showNotification(`Welcome to RiseUp Farms, ${name}! 🌱`, 'success');
  updateUIForLoggedInUser();
  e.target.reset();
}

function signOut() {
  if (confirm('Are you sure you want to sign out?')) {
    localStorage.removeItem('riseupUser');
    currentUser = null;
    showNotification('Signed out successfully', 'info');
    updateUIForLoggedOutUser();
  }
}

function updateUIForLoggedInUser() {
  const accountBtns = document.querySelectorAll('.nav-right .icon[aria-label="Account"]');
  accountBtns.forEach(accountBtn => {
    if (accountBtn && currentUser) {
      accountBtn.innerHTML = `<span style="font-size: 1.2rem; font-weight: 700; color: var(--gold);">${currentUser.name.charAt(0).toUpperCase()}</span>`;
      accountBtn.title = `${currentUser.name} - Click to sign out`;
      accountBtn.onclick = signOut;
    }
  });
}

function updateUIForLoggedOutUser() {
  const accountBtns = document.querySelectorAll('.nav-right .icon[aria-label="Account"]');
  accountBtns.forEach(accountBtn => {
    if (accountBtn) {
      accountBtn.innerHTML = `<img src="https://img.icons8.com/ios/50/D4AF37/user-male-circle.png" alt="Account" class="nav-icon-svg">`;
      accountBtn.title = 'Sign In';
      accountBtn.onclick = showAuthModal;
    }
  });
}

function showComingSoon(provider) {
  showNotification(`${provider} sign-in coming soon! 🚀`, 'info');
}

function initAuth() {
  loadUser();
  
  const closeAuthBtn = document.getElementById('close-auth-modal');
  const authOverlay = document.getElementById('auth-overlay');
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToSignin = document.getElementById('switch-to-signin');
  const signinFormElement = document.getElementById('signin-form-element');
  const signupFormElement = document.getElementById('signup-form-element');
  
  if (closeAuthBtn) closeAuthBtn.addEventListener('click', hideAuthModal);
  if (authOverlay) authOverlay.addEventListener('click', hideAuthModal);
  
  if (switchToSignup) {
    switchToSignup.addEventListener('click', (e) => {
      e.preventDefault();
      showSignUpForm();
    });
  }
  
  if (switchToSignin) {
    switchToSignin.addEventListener('click', (e) => {
      e.preventDefault();
      showSignInForm();
    });
  }
  
  if (signinFormElement) signinFormElement.addEventListener('submit', handleSignIn);
  if (signupFormElement) signupFormElement.addEventListener('submit', handleSignUp);
  
  const accountBtns = document.querySelectorAll('.nav-right .icon[aria-label="Account"]');
  accountBtns.forEach(accountBtn => {
    if (accountBtn) {
      accountBtn.addEventListener('click', () => {
        if (!isLoggedIn()) showAuthModal();
      });
    }
  });
}

/* ==================== SHOPPING CART SYSTEM ==================== */

let cart = [];

function loadCart() {
  const savedCart = localStorage.getItem('riseupCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem('riseupCart', JSON.stringify(cart));
}

function addToCart(productId, productName, productPrice, productImage) {
  if (!isLoggedIn()) {
    showAuthModal();
    showNotification('Please sign in to add items to cart', 'info');
    return;
  }
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: parseFloat(productPrice),
      image: productImage,
      quantity: 1
    });
  }
  
  saveCart();
  updateCartUI();
  showNotification(`${productName} added to cart!`, 'success');
}

function removeFromCart(productId) {
  const item = cart.find(item => item.id === productId);
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  if (item) {
    showNotification(`${item.name} removed from cart`, 'info');
  }
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartUI();
    }
  }
}

function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartCount() {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

function updateCartUI() {
  const cartBadge = document.getElementById('cart-badge');
  const cartCount = getCartCount();
  
  if (cartBadge) {
    if (cartCount > 0) {
      cartBadge.textContent = cartCount;
      cartBadge.style.display = 'flex';
    } else {
      cartBadge.style.display = 'none';
    }
  }
  
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const cartFooter = document.getElementById('cart-footer');
  
  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '';
      if (emptyCartMessage) emptyCartMessage.style.display = 'flex';
      if (cartFooter) cartFooter.style.display = 'none';
    } else {
      if (emptyCartMessage) emptyCartMessage.style.display = 'none';
      if (cartFooter) cartFooter.style.display = 'block';
      
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://via.placeholder.com/80x80/0f1a13/D4AF37?text=Product'">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p class="cart-item-price">R${item.price.toFixed(2)}</p>
            <div class="cart-item-controls">
              <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">−</button>
              <span class="qty-display">${item.quantity}</span>
              <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">&times;</button>
        </div>
      `).join('');
    }
    
    if (cartTotal) {
      cartTotal.textContent = `R${getCartTotal().toFixed(2)}`;
    }
  }
}

function toggleCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  
  if (cartSidebar && cartOverlay) {
    const isOpen = cartSidebar.classList.contains('active');
    
    if (isOpen) {
      cartSidebar.classList.remove('active');
      cartOverlay.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      cartSidebar.classList.add('active');
      cartOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      updateCartUI();
    }
  }
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function initCart() {
  loadCart();
  
  const cartButtons = document.querySelectorAll('.add-to-cart-btn');
  cartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productCard = btn.closest('.product-card');
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      const image = productCard?.querySelector('img')?.src || 'https://via.placeholder.com/80x80/0f1a13/D4AF37?text=Product';
      
      addToCart(id, name, price, image);
    });
  });
  
  const cartOverlay = document.getElementById('cart-overlay');
  if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);
  
  const closeCartBtn = document.getElementById('close-cart');
  if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
  
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (!isLoggedIn()) {
        toggleCart();
        showAuthModal();
        showNotification('Please sign in to proceed to checkout', 'info');
      } else {
        showNotification('Checkout coming soon!', 'info');
      }
    });
  }
}

// Make functions globally accessible
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.toggleCart = toggleCart;
window.showAuthModal = showAuthModal;
window.hideAuthModal = hideAuthModal;
window.signOut = signOut;
window.showComingSoon = showComingSoon;