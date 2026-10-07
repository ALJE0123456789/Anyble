// === Loader ===
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1800);
});
document.body.style.overflow = 'hidden';

// === Custom Cursor ===
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover states
document.querySelectorAll('a, button, .feature-card, .floating-tag, .step').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// === Scroll Progress ===
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// === Navbar Scroll ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// === Hamburger ===
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
    });
});

// === Scroll Animate ===
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// === Counter ===
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.dataset.count;
            const duration = 1800;
            const start = performance.now();

            const update = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(update);
                else counter.textContent = target;
            };
            requestAnimationFrame(update);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// === Magnetic Buttons ===
document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = '';
    });
});

// === Phone Tilt ===
const phoneScene = document.getElementById('phoneScene');
const phoneTilt = document.getElementById('phoneTilt');
if (phoneScene && phoneTilt && window.innerWidth > 900) {
    phoneScene.addEventListener('mousemove', (e) => {
        const rect = phoneScene.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        phoneTilt.style.transform = `rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
    });
    phoneScene.addEventListener('mouseleave', () => {
        phoneTilt.style.transform = 'rotateY(0) rotateX(0)';
    });
}

// === Phone Feed Cycling ===
const products = [
    { name: 'iPhone 12', price: '₹35,000', loc: '1.2 km away', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop' },
    { name: 'Bicycle', price: '₹5,500', loc: '2 km away', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=100&h=100&fit=crop' },
    { name: 'Study Table', price: '₹2,000', loc: '800 m away', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
    { name: 'Denim Jacket', price: '₹800', loc: '500 m away', img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=100&h=100&fit=crop' },
    { name: 'Gaming Console', price: '₹18,000', loc: '3 km away', img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=100&h=100&fit=crop' },
    { name: 'Books Set', price: '₹450', loc: '1 km away', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop' },
    { name: 'Camera', price: '₹22,000', loc: '1.5 km away', img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop' },
    { name: 'Headphones', price: '₹1,500', loc: '700 m away', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' }
];

const feed = document.getElementById('appFeed');
let feedIndex = 0;
let feedItems = [];

function createFeedItem(product, index) {
    const el = document.createElement('div');
    el.className = 'feed-item';
    el.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <div class="feed-item-text">
            <strong>${product.name}</strong>
            <small>${product.price}</small>
            <span class="loc">${product.loc}</span>
        </div>
    `;
    return el;
}

function initFeed() {
    feed.innerHTML = '';
    feedItems = [];
    for (let i = 0; i < 4; i++) {
        const product = products[(feedIndex + i) % products.length];
        const el = createFeedItem(product, i);
        el.style.top = `${12 + i * 76}px`;
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        feed.appendChild(el);
        feedItems.push(el);
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 + i * 120);
    }
}

function cycleFeed() {
    const first = feedItems[0];
    if (first) {
        first.style.opacity = '0';
        first.style.transform = 'translateX(-120%)';
        setTimeout(() => {
            first.remove();
            feedItems.shift();
            feedIndex = (feedIndex + 1) % products.length;
            const newProduct = products[(feedIndex + 3) % products.length];
            const newEl = createFeedItem(newProduct);
            newEl.style.top = `${12 + 3 * 76}px`;
            newEl.style.opacity = '0';
            newEl.style.transform = 'translateY(20px)';
            feed.appendChild(newEl);
            feedItems.push(newEl);
            setTimeout(() => {
                newEl.style.opacity = '1';
                newEl.style.transform = 'translateY(0)';
            }, 50);
        }, 400);
    }
}

initFeed();
setInterval(cycleFeed, 2600);

// === Console Signature ===
console.log('%c🚀 Anyble', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #7C5CFF, #FF6B9D); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cDesigned & built by Aadhil Junise', 'font-size: 13px; color: #8A8AA0;');