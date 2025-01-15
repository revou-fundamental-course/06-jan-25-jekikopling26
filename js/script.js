// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Get visitor name
function getVisitorName() {
    const visitorName = localStorage.getItem('visitorName') || prompt('Please enter your name:', '');
    if (visitorName) {
        localStorage.setItem('visitorName', visitorName);
        const nameElement = document.getElementById('visitor-name');
        if (nameElement) {
            nameElement.textContent = visitorName;
        }
    }
}

// Form validation
function validateForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const formResult = document.getElementById('form-result');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormResult('Please enter a valid email address', 'error');
        return false;
    }
    
    // Phone validation (simple format: minimum 10 digits)
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
        showFormResult('Please enter a valid phone number (minimum 10 digits)', 'error');
        return false;
    }
    
    const successMessage = `
        Form submitted successfully!
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
    `;
    
    showFormResult(successMessage, 'success');
    document.getElementById('contact-form').reset();
    return false;
}

function showFormResult(message, type) {
    const formResult = document.getElementById('form-result');
    formResult.textContent = message;
    formResult.className = type;
    formResult.classList.remove('hidden');
}

class ImageSlider {
    constructor() {
        this.slider = document.querySelector('.slider');
        if (!this.slider) return;

        this.slides = this.slider.querySelector('.slides');
        this.slideElements = this.slider.querySelectorAll('.slide');
        this.prevButton = this.slider.querySelector('.prev');
        this.nextButton = this.slider.querySelector('.next');
        this.dotsContainer = this.slider.querySelector('.slider-dots');
        
        this.currentSlide = 0;
        this.slideCount = this.slideElements.length;
        
        this.init();
    }

    init() {
        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }

        this.prevButton.addEventListener('click', () => this.prevSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());

        this.startAutoSlide();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.updateSlider();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slideCount;
        this.updateSlider();
    }

    updateSlider() {
        this.slides.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        const dots = this.dotsContainer.children;
        Array.from(dots).forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoSlide() {
        setInterval(() => this.nextSlide(), 5000); // Change slide every 5 seconds
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider();
    
    if (document.querySelector('.hero')) {
        getVisitorName();
    }
});

document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        this.classList.add('active');

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });

        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});