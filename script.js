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
        observer.unobserve(entry.target); 
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
     6. MOBILE DROPDOWN ACCORDION - FIXED FOR CLICKABILITY
     ----------------------------------------------------------- */
  document.querySelectorAll('.mobile-has-dropdown').forEach(dropdownParent => {
    const mainLink = dropdownParent.querySelector('.slide-menu-link');
    const toggleBtn = dropdownParent.querySelector('.mobile-dropdown-btn');
    const submenu = dropdownParent.querySelector('.mobile-dropdown-menu');

    // CRITICAL: Only the button toggles dropdown, NOT the link
    if (toggleBtn && submenu) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';

        // Close all other dropdowns
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

        // Toggle current dropdown
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

    // Main link is FULLY clickable for navigation
    if (mainLink) {
      mainLink.addEventListener('click', (e) => {
        // DO NOT prevent default - allow navigation
        // Just close menu after a brief delay
        setTimeout(() => {
          closeMenu();
        }, 200);
      });
    }

    // Submenu links also close the menu
    if (submenu) {
      submenu.querySelectorAll('a').forEach(subLink => {
        subLink.addEventListener('click', (e) => {
          // DO NOT prevent default - allow navigation
          setTimeout(() => {
            closeMenu();
          }, 200);
        });
      });
    }
  });

  // Regular mobile nav links close menu
  document.querySelectorAll('.slide-nav-links > li > a.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => {
        closeMenu();
      }, 200);
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

}); // END