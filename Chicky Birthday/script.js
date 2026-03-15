// Password Check System
let passwordTries = 0;

function showPopup(message) {
    const popup = document.getElementById('success-popup');
    if (!popup) return;
    popup.querySelector('.popup-message').innerText = message;
    popup.classList.add('visible');
    setTimeout(() => popup.classList.remove('visible'), 4000);
}

function checkPassword() {
    const password = document.getElementById('password-input').value.trim();
    passwordTries++;
    
    // Accept variations of Chicky (case insensitive)
    if (password.toLowerCase() === 'chicky') {
        document.getElementById('password-overlay').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('password-overlay').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            createRomanticElements();
            setupScrollAnimations();
        }, 500); // fade out effect duration

        showPopup('Welcome to your special place, my love. 🌹');
    } else {
        const errorMsg = document.getElementById('error-message');
        errorMsg.style.display = 'block';
        
        // Playful error messages depending on tries
        if (passwordTries === 2) errorMsg.innerText = "Come on beautiful, you know this...";
        if (passwordTries >= 3) errorMsg.innerText = "Hint: The cutest nickname ever. Begins with C.";
        
        // Shake animation for wrong password
        const box = document.querySelector('.password-box');
        box.style.transform = "translateX(-10px)";
        setTimeout(() => box.style.transform = "translateX(10px)", 100);
        setTimeout(() => box.style.transform = "translateX(-10px)", 200);
        setTimeout(() => box.style.transform = "translateX(0)", 300);
    }
}

// Add enter key support
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkPassword();
            }
        });
    }
});

// Start Celebration (Transition)
function startCelebration() {
    // Elegant fade out before navigating
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    setTimeout(() => {
        window.location.href = 'memories.html';
    }, 1000);
}

// Playful Hidden Trackers
function trackerClick(id) {
    if (id === 1) {
        showPopup("✨ You found a secret! I'm thinking about you right now.");
    } else if (id === 2) {
        showPopup("💖 Another secret! Here's a million virtual kisses! 😘");
    }
}

// Generate Beautiful Floating Romantic Elements
function createRomanticElements() {
    const container = document.getElementById('hearts-container');
    if (!container) return; 
    
    // Mix of hearts, sparkles, and petals
    const symbols = ['❤️', '💖', '✨', '🌸', '💕', '🤍'];
    
    for (let i = 0; i < 15; i++) {
        const el = document.createElement('div');
        el.classList.add('floating-element');
        el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Randomize positioning and animation
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (Math.random() * 12 + 8) + 's'; // Slower, dreamier
        el.style.animationDelay = Math.random() * 5 + 's';
        el.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
        
        container.appendChild(el);
    }
}

// Intersection Observer for Scroll Animations
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated to keep them visible
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 }); // Trigger slightly later for better effect

    elements.forEach(el => observer.observe(el));
}

// Initialization on load
window.onload = () => {
    // Smooth page load fade-in
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);

    if (document.getElementById('hearts-container')) {
        createRomanticElements();
    }
    if (document.querySelectorAll('.fade-up').length > 0) {
        setupScrollAnimations();
    }
};