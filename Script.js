// === Mobile Menu Toggle ===
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// === Smooth Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// === Navbar Scroll Effect ===
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 26, 0.95)';
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.background = 'rgba(15, 15, 26, 0.7)';
        navbar.style.padding = '16px 0';
    }
});

// === Scroll Animation Observer ===
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, delay);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// === Counter Animation ===
const counters = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.dataset.count;
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// === Phone Mockup: Auto-Cycling Items ===
const products = [
    { name: 'iPhone 12', price: '₹35,000', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop' },
    { name: 'Bicycle', price: '₹5,500', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=100&h=100&fit=crop' },
    { name: 'Study Table', price: '₹2,000', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
    { name: 'Denim Jacket', price: '₹800', img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=100&h=100&fit=crop' },
    { name: 'Gaming Console', price: '₹18,000', img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=100&h=100&fit=crop' },
    { name: 'Books Set', price: '₹450', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop' },
    { name: 'Camera', price: '₹22,000', img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop' },
    { name: 'Headphones', price: '₹1,500', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' }
];

const appItemsContainer = document.getElementById('appItems');
let currentIndex = 0;

function createItemCard(product) {
    const item = document.createElement('div');
    item.className = 'app-item';
    item.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <div class="app-item-text">
            <strong>${product.name}</strong>
            <small>${product.price}</small>
        </div>
    `;
    return item;
}

function renderItems() {
    appItemsContainer.innerHTML = '';
    // Show 5 items at a time
    for (let i = 0; i < 5; i++) {
        const product = products[(currentIndex + i) % products.length];
        const item = createItemCard(product);
        item.style.top = `${i * 80}px`;
        appItemsContainer.appendChild(item);
    }
}

function cycleItems() {
    const items = appItemsContainer.querySelectorAll('.app-item');
    // Animate out the first item
    if (items[0]) {
        items[0].style.transition = 'all 0.5s ease';
        items[0].style.transform = 'translateX(-120%)';
        items[0].style.opacity = '0';
    }

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % products.length;
        renderItems();
    }, 500);
}

// Initial render
renderItems();
// Cycle every 2.5 seconds
setInterval(cycleItems, 2500);

// === Floating Card Hover Tilt Effect ===
document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// === Parallax Effect on Hero ===
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const phone = document.querySelector('.phone-wrapper');
    if (phone && scrolled < 800) {
        phone.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

// === Console Easter Egg ===
console.log('%c🚀 Anyble Showcase', 'font-size: 20px; color: #6C3CE1; font-weight: bold;');
console.log('%cBuilt by Aadhil Junise', 'font-size: 14px; color: #A0A0B0;');
