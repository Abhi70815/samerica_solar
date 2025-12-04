// =============================================
// HAMBURGER MENU TOGGLE
// =============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// =============================================
// SMOOTH SCROLLING
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =============================================
// SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
// =============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    observer.observe(element);
});

// =============================================
// HERO SLIDER
// =============================================

const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('sliderDots');
let currentSlide = 0;

// Create dots
if (dotsContainer && slides.length > 0) {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Auto-advance slider
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }, 8000);
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// =============================================
// STAT COUNTER ANIMATION
// =============================================

const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target + (entry.target.getAttribute('data-target').includes('.') ? '' : '');
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.floor(current) + (entry.target.getAttribute('data-target').includes('.') ? '' : '');
                }
            }, 50);
            entry.target.setAttribute('data-counted', 'true');
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// =============================================
// FAQ ACCORDION
// =============================================

function toggleFAQ(header) {
    const faqItem = header.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Toggle current FAQ
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// =============================================
// LIGHTBOX GALLERY
// =============================================

const galleryImages = [
    { src: 'assets/bg.jpg', caption: '50kW Residential Installation' },
    { src: '/assets/bg1.jpg', caption: '100kW Hospital Installation' },
    { src: '/assets/bg2.jpg', caption: '75kW School Installation' },
    { src: '/assets/bg4.jpg', caption: '200kW Factory Installation' },
    { src: '/assets/bg1.jpg', caption: '150kW Apartment Complex' },
    { src: '/assets/bg.jpg', caption: '80kW Commercial Building' }
];

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const caption = document.getElementById('caption');

    if (lightbox && galleryImages[index]) {
        lightbox.style.display = 'block';
        lightboxImg.src = galleryImages[index].src;
        caption.textContent = galleryImages[index].caption;
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close lightbox on outside click
document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// =============================================
// CONTACT FORM SUBMISSION TO GOOGLE FORM
// =============================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Google Form Configuration
// Google Form ID: 1FAIpQLSf0bRoE1_WfKPCGHDMdlTFlBLec6nTk4k1wF2NeFBPqfFgiEw

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf0bRoE1_WfKPCGHDMdlTFlBLec6nTk4k1wF2NeFBPqfFgiEw/formResponse';

// IMPORTANT: Update these entry IDs with your actual Google Form field IDs
// To find your entry IDs:
// 1. Open form in edit mode
// 2. Right-click "Inspect" on each field
// 3. Look for name="entry.XXXXX"
// 4. Update the numbers below

const FIELD_MAP = {
    name: 'entry.1019117584',        // Name field entry ID
    phone: 'entry.1379853284',       // Phone field entry ID
    message: 'entry.56109829'      // Message field entry ID
};

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !phone || !message) {
            showFormMessage('Please fill all fields', 'error');
            return;
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone.replace(/[^\d]/g, ''))) {
            showFormMessage('Please enter a valid 10-digit phone number', 'error');
            return;
        }

        // Show loading message
        showFormMessage('Sending your information...', 'success');

        // Send data to Google Form
        submitToGoogleForm(name, phone, message);
    });
}

function submitToGoogleForm(name, phone, message) {
    // Create FormData object
    const formData = new FormData();
    formData.append(FIELD_MAP.name, name);
    formData.append(FIELD_MAP.phone, phone);
    formData.append(FIELD_MAP.message, message);
    // Submit to Google Form using fetch API with timeout and fallback
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

    fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
        signal: controller.signal
    })
    .then(() => {
        clearTimeout(timeout);
        // Success - Google Forms doesn't return data, so we assume success
        showFormMessage(
            `Thank you ${name}! We'll contact you shortly at ${phone}. Check your WhatsApp for updates.`,
            'success'
        );

        // Reset form after short delay
        setTimeout(() => {
            contactForm.reset();
            formMessage.style.display = 'none';
        }, 3000);
    })
    .catch(error => {
        clearTimeout(timeout);
        console.error('Error submitting form:', error);

        // Show a clear error message and provide direct contact options
        const waLink = 'https://wa.me/917081583323?text=' + encodeURIComponent(`Hi, my name is ${name}. Phone: ${phone}. Message: ${message}`);
        const callLink = 'tel:917081583323';

        const errorHtml = `
            <strong>Could not submit the form.</strong>
            <p>Please contact us directly so we can assist you immediately:</p>
            <p>
                <a href="${waLink}" class="btn btn-primary" target="_blank" rel="noopener"> <i class='fab fa-whatsapp'></i> Message on WhatsApp</a>
                &nbsp;
                <a href="${callLink}" class="btn btn-secondary"> <i class='fas fa-phone'></i> Call Now</a>
            </p>
            <p>If you prefer, try submitting the form again or email us at <a href="mailto:info@Samericaenergy.com">info@Samericaenergy.com</a>.</p>
        `;

        showFormMessage(errorHtml, 'error');

        // Do not immediately clear the form so the user can copy details if needed
    });
}

function showFormMessage(message, type) {
    // Allow HTML in message (for links/buttons)
    formMessage.innerHTML = message;
    // Reset classes and apply the type as a class
    formMessage.className = '';
    if (type) formMessage.classList.add(type);
    formMessage.style.display = 'block';
}

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    if (navbar) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
});

// =============================================
// ACTIVE SECTION HIGHLIGHT IN NAVBAR
// =============================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = 'var(--text-light)';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--primary-color)';
                    link.style.fontWeight = '700';
                } else {
                    link.style.fontWeight = '500';
                }
            });
        }
    });
});

// =============================================
// LAZY LOADING IMAGES
// =============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// =============================================
// CLICK TO COPY PHONE NUMBER
// =============================================

document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Allow default behavior on mobile
        if (!navigator.share && !isMobileDevice()) {
            e.preventDefault();
            const phone = link.getAttribute('href').replace('tel:', '');
            copyToClipboard(phone);
        }
    });
});

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Phone number copied to clipboard!');
    }).catch(() => {
        showNotification('Failed to copy');
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #0f7d3f;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// =============================================
// PERFORMANCE OPTIMIZATION
// =============================================

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Optimize scroll listeners
const handleScroll = debounce(() => {
    // Any heavy scroll operations can go here
}, 100);

window.addEventListener('scroll', handleScroll);

// =============================================
// ACCESSIBILITY ENHANCEMENTS
// =============================================

// Add keyboard support for FAQ
document.querySelectorAll('.faq-header').forEach(header => {
    header.setAttribute('tabindex', '0');
    header.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFAQ(header);
        }
    });
});

// =============================================
// PAGE LOAD ANIMATION
// =============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// =============================================
// PRELOAD CRITICAL IMAGES
// =============================================

function preloadImage(src) {
    const img = new Image();
    img.src = src;
}

// Preload hero images
preloadImage('https://images.unsplash.com/photo-1558618047-3c8c76bbb17e?w=1200&h=800&fit=crop');
preloadImage('https://images.unsplash.com/photo-1509391366360-2e938m2af4aa?w=1200&h=800&fit=crop');

// =============================================
// FORM VALIDATION HELPERS
// =============================================

function validatePhone(phone) {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });

    // Log initialization
    console.log('Samerika Energy Website Loaded Successfully ✓');
});

// =============================================
// SERVICE WORKER FOR OFFLINE SUPPORT (Optional)
// ============================================= 

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js').catch(err => {
//             console.log('ServiceWorker registration failed: ', err);
//         });
//     });
// }

// =============================================
// HELPER: Google Form Entry ID Extractor
// =============================================
// Run this in browser console to find your entry IDs:
// window.extractGoogleFormEntryIds()

window.extractGoogleFormEntryIds = function() {
    console.log('%c=== Google Form Entry ID Extractor ===', 'color: #0f7d3f; font-weight: bold; font-size: 14px;');
    
    // Fetch the edit view of the form
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSf0bRoE1_WfKPCGHDMdlTFlBLec6nTk4k1wF2NeFBPqfFgiEw/edit')
        .then(r => r.text())
        .then(html => {
            // Extract all entry IDs from the HTML
            const matches = html.match(/entry\.(\d+)/g);
            const unique = [...new Set(matches)].sort();
            
            console.log('%cFound Entry IDs:', 'color: #0f7d3f; font-weight: bold;');
            unique.forEach((entry, i) => {
                console.log(`${i + 1}. ${entry}`);
            });
            
            console.log('%cUpdate FIELD_MAP in script.js with these values', 'color: #ffc107; font-weight: bold;');
        })
        .catch(err => console.error('Error fetching form:', err));
};

console.log('%cTip: Run window.extractGoogleFormEntryIds() in console to find your form entry IDs', 'color: #0f7d3f; font-style: italic;');

