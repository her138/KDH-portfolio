/**
 * AR AUTOWORKS - MAIN JAVASCRIPT
 * Modern, Optimized, Interactive Features
 */

// ===== REVIEWS DATA =====
// All your real Google Reviews
const reviewsData = [
    { name: "Jamie Okies", initials: "JO", rating: 5, date: "2 months ago", text: "Great service from Ashley and his team. I would definitely highly recommend AR auto works should your Mini or BMW need any repairs or a service. Their communication is great, they listen well and more importantly they don't try to upsell unnecessary work.", car: "BMW/Mini", isLocalGuide: true },
    { name: "Lee Van Kesteren", initials: "LV", rating: 5, date: "2 months ago", text: "This shop is knowledgeable in Mini/BMW and it shows by the cars in the shop. I got exceptional service at an affordable price, way below the 3 other quotes for the same work. I'll definitely be back when I need assistance with my car in the future.", car: "BMW/Mini" },
    { name: "Zack Humphreys", initials: "ZH", rating: 5, date: "7 months ago", text: "My wife and I have had our cars (BMW and Mini) serviced and looked after by Ashley and his team since July 2023. Always professional, transparent, and the quality of work is exceptional. Highly recommended!", car: "BMW & Mini" },
    { name: "Jerome Knipe", initials: "JK", rating: 5, date: "5 months ago", text: "By far the best in the business for any BMW owner. Ashley goes out of his way to make sure his customers are happy. Not letting anyone else touch my vehicle again. Well done AR Autoworks you deserve 10 stars.", car: "BMW", isLocalGuide: true },
    { name: "Rowan Van Vuuren", initials: "RV", rating: 5, date: "10 months ago", text: "I ended up at AR Autoworks by mistake, looking for a different auto repair shop - and I'm very happy I did. Ashley was honest, professional, and the work was done quickly at a fair price. Will definitely be back.", car: "BMW" },
    { name: "Natalie Retief", initials: "NR", rating: 5, date: "8 months ago", text: "Awesome workshop for BMW, MINI repairs and services - any brand for that matter they have no limits. Efficient, friendly, honest, and affordable. Doesn't get better than that. Well done keep it up!", car: "BMW/Mini" },
    { name: "Heidi La Grange", initials: "HL", rating: 5, date: "11 months ago", text: "Ashley and his team rendered an excellent service; always keeping me informed and updated in layman's terms which is very empowering. Keeping to their promises by providing quality service at affordable prices that aims to please their clients.", car: "BMW", isLocalGuide: true },
    { name: "Meghan Oddy", initials: "MO", rating: 5, date: "a year ago", text: "Took my VW Golf 7 for new brake pads and disks. They were efficient, friendly and cheaper than any other quote I received. I got my car back within a couple of hours and they even cleaned the entire car. I am very happy with my experience and would highly recommend.", car: "VW Golf 7" },
    { name: "Gavin Jooste", initials: "GJ", rating: 5, date: "a year ago", text: "Ashley was very helpful. Sorted my car in less than 2 hours and he even got his team to give the car a clean. Straight forward and no sad story. Keep up the great work guys.", car: "BMW", isLocalGuide: true },
    { name: "Merle Samuels-Green", initials: "MS", rating: 5, date: "a year ago", text: "Excellent, very professional service. Ashley is extremely helpful sorted out my vehicle within a day... will definitely recommend AR Auto works to any BMW owner.", car: "BMW" },
    { name: "nabiehl bester", initials: "NB", rating: 5, date: "a year ago", text: "Excellent service, been using these guys for the past year and received excellent service. They took good care of my vehicle and communication is excellent too. Would highly recommend anyone to them.", car: "BMW" },
    { name: "Dirk Neethling", initials: "DN", rating: 5, date: "a year ago", text: "Excellent service! I can really recommend them on any BMW work!", car: "BMW", isLocalGuide: true },
    { name: "saadiq mohamed", initials: "SM", rating: 5, date: "2 years ago", text: "Exceptional and Very knowledgeable and always trying to use original BMW parts.", car: "BMW", isLocalGuide: true },
    { name: "Tauriqe Geland", initials: "TG", rating: 5, date: "2 years ago", text: "The place was very easy to find, the staff is friendly and I am extremely happy with the service... Will recommend to anyone.", car: "BMW" },
    { name: "Marvin Jacobs", initials: "MJ", rating: 5, date: "a week ago", text: "The best in the business... nothing seemed too big to do and very professional. Would highly recommend!", car: "BMW" }
];

// ===== RENDER CAROUSEL REVIEWS =====
let currentSlide = 0;
let autoPlayInterval;
let slidesCount = 0;

function renderCarouselReviews() {
    const track = document.getElementById('reviewsTrack');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track || !dotsContainer) return;
    
    slidesCount = reviewsData.length;
    
    // Render slides
    track.innerHTML = reviewsData.map((review, index) => `
        <div class="review-slide" data-index="${index}">
            <div class="review-slide-header">
                <div class="review-slide-avatar">${review.initials}</div>
                <div class="review-slide-info">
                    <h4>${review.name} ${review.isLocalGuide ? '⭐ Local Guide' : ''}</h4>
                    <div class="review-slide-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                    <div class="review-slide-date">${review.date}</div>
                </div>
            </div>
            <div class="review-slide-text">"${review.text}"</div>
            <div class="review-slide-car">${review.car}</div>
        </div>
    `).join('');
    
    // Render dots
    dotsContainer.innerHTML = reviewsData.map((_, index) => `
        <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>
    `).join('');
    
    // Add dot click handlers
    document.querySelectorAll('.carousel-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            goToSlide(slideIndex);
            resetAutoPlay();
        });
    });
}

function goToSlide(index) {
    if (index < 0) index = slidesCount - 1;
    if (index >= slidesCount) index = 0;
    
    currentSlide = index;
    const track = document.getElementById('reviewsTrack');
    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Update active dot
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        if (i === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 6000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('menuClose');
    const overlay = document.getElementById('overlay');
    
    if (!menuBtn || !mobileMenu) return;
    
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    menuBtn.addEventListener('click', toggleMenu);
    if (menuClose) menuClose.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a nav link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}

// ===== ACTIVE NAVIGATION =====
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length || !navLinks.length) return;
    
    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== ANIMATE ON SCROLL =====
function initScrollAnimation() {
    const animateElements = document.querySelectorAll('.animate');
    
    if (!animateElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => observer.observe(el));
}

// ===== HEADER HIDE/SHOW ON SCROLL =====
function initHeaderScroll() {
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        const name = this.querySelector('[name="name"]');
        const email = this.querySelector('[name="email"]');
        const service = this.querySelector('[name="service"]');
        
        if (!name.value.trim()) {
            e.preventDefault();
            alert('Please enter your name');
            name.focus();
            return;
        }
        
        if (!email.value.trim() || !email.value.includes('@')) {
            e.preventDefault();
            alert('Please enter a valid email address');
            email.focus();
            return;
        }
        
        if (!service.value) {
            e.preventDefault();
            alert('Please select a service');
            service.focus();
            return;
        }
    });
}

// ===== LAZY LOAD IMAGES =====
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (!images.length) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== INITIALIZE CAROUSEL CONTROLS =====
function initCarouselControls() {
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const carouselContainer = document.querySelector('.reviews-carousel-container');
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
    
    // Pause auto-play on hover
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
}

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', function() {
    renderCarouselReviews();
    initCarouselControls();
    initMobileMenu();
    initActiveNav();
    initSmoothScroll();
    initScrollAnimation();
    initHeaderScroll();
    initFormValidation();
    initLazyLoad();
    
    // Start auto-play after rendering
    setTimeout(() => {
        startAutoPlay();
    }, 500);
});