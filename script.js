document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu (Hamburger) Logic ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const slideMenu = document.getElementById('slide-menu');
  
    if (menuToggle && slideMenu) {
      menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); 
        slideMenu.classList.toggle('active'); 
      });
  
      document.addEventListener('click', (e) => {
        if (!slideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
          slideMenu.classList.remove('active');
        }
      });
    }

    // --- 2. Dark/Light Mode Switch ---
    const modeSwitch = document.getElementById('mode-switch');
  
    if (modeSwitch) {
      modeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
  
        if(document.body.classList.contains('light-mode')){
          modeSwitch.textContent = '🌞';
        } else {
          modeSwitch.textContent = '🌙';
        }
      });
    }
    
    // --- 3. FULL-WIDTH SEARCH BAR LOGIC (NEW FEATURES) ---
    const searchToggle = document.getElementById('search-toggle');
    const searchBarOverlay = document.getElementById('search-bar-overlay');
    const searchBarInput = document.getElementById('overlay-search-input');
    const searchBarClose = document.getElementById('search-bar-close');
    const searchForm = document.querySelector('#search-bar-overlay .search-bar-form'); // Select the form element

    if (searchToggle && searchBarOverlay && searchBarClose && searchBarInput && searchForm) {
        
        const closeSearch = () => {
            searchBarOverlay.classList.remove('active');
            searchBarOverlay.setAttribute('aria-hidden', 'true');
        };

        const openSearch = () => {
            searchBarOverlay.classList.add('active');
            searchBarOverlay.setAttribute('aria-hidden', 'false');
            setTimeout(() => searchBarInput.focus(), 200);
        }

        // FEATURE: Alert on Form Submission (Hitting Enter/Clicking Magnifying Glass)
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop the page from reloading
            alert('Legend say the search feature is coming soon!');
            closeSearch(); // Close the bar after showing the message
        });
        
        // FEATURE: Close on Click Outside
        document.addEventListener('click', (e) => {
            // Check if the overlay is open, and if the click target is NOT the search button and NOT inside the overlay itself
            const isClickOutside = !searchBarOverlay.contains(e.target) && !searchToggle.contains(e.target);
            
            if (searchBarOverlay.classList.contains('active') && isClickOutside) {
                closeSearch();
            }
        });
        
        // Existing Open/Close Logic
        searchToggle.addEventListener('click', openSearch);
        searchBarClose.addEventListener('click', closeSearch);

        // Close on Escape key (Existing logic)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchBarOverlay.classList.contains('active')) {
                closeSearch();
            }
        });
    }
    
    // --- 4. Logo Refresh Fix ---
    const logoLink = document.querySelector('.nav-center-logo a');

    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            window.location.href = '/'; 
        });
    }

});