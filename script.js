// Theme Management
class ThemeManager {
    constructor() {
        this.theme = this.getSystemTheme();
        this.init();
    }

    getSystemTheme() {
        // Check if user has a saved preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        
        // Otherwise, use system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        return 'light';
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeToggle();
    }

    updateThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        const icon = toggle.querySelector('i');
        
        if (this.theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    bindEvents() {
        const toggle = document.getElementById('theme-toggle');
        toggle.addEventListener('click', () => this.toggleTheme());
    }
}

// Smooth Scrolling for Navigation
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateActiveLink();
    }

    bindEvents() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update active navigation link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Scroll to Top Button
class ScrollToTop {
    constructor() {
        this.createButton();
        this.bindEvents();
    }

    createButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(button);
        this.button = button;
    }

    bindEvents() {
        window.addEventListener('scroll', () => this.toggleVisibility());
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    toggleVisibility() {
        if (window.scrollY > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Image Loading with Lazy Loading
class ImageLoader {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.preloadImages();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all images
        document.querySelectorAll('img').forEach(img => {
            this.observer.observe(img);
        });
    }

    loadImage(img) {
        if (img.src) {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+';
                img.classList.add('loaded');
            });
        }
    }

    preloadImages() {
        // Preload hero section images for better performance
        const heroImages = [
            'https://pixabay.com/get/gee1feee9785eb6973f706ad356a4d00319fbe77648e3bab88b2d1d0a40e167e7ecb8a0d6190912d0fcbc6ed5c1a7f93e7d508305a62f7a18292caf192b9dd651_1280.jpg',
        ];

        heroImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    setupScrollAnimations() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, options);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.work-card, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    setupHoverEffects() {
        // Enhanced hover effects for work cards
        document.querySelectorAll('.work-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
}

// Contact Form Handler (if needed for future expansion)
class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEmailEvents();
        this.bindVCardEvents();
    }

    bindEmailEvents() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Analytics tracking could be added here
                console.log('Email link clicked');
            });
        });
    }

    bindVCardEvents() {
        const vcardLinks = document.querySelectorAll('a[href$=".vcf"]');
        vcardLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Analytics tracking could be added here
                console.log('VCard downloaded');
            });
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.monitorPageLoad();
        this.monitorScrollPerformance();
    }

    monitorPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        });
    }

    monitorScrollPerformance() {
        let ticking = false;

        function updateScrollEffects() {
            // Throttle scroll events for better performance
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }
}

// Utility Functions
class Utils {
    static getCurrentYear() {
        return new Date().getFullYear();
    }

    static formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long'
        }).format(date);
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Main Application
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        // Initialize all managers
        this.themeManager = new ThemeManager();
        this.navigationManager = new NavigationManager();
        this.scrollToTop = new ScrollToTop();
        this.imageLoader = new ImageLoader();
        this.animationManager = new AnimationManager();
        this.contactManager = new ContactManager();
        this.performanceMonitor = new PerformanceMonitor();

        // Set current year in footer
        this.setCurrentYear();

        // Initialize additional features
        this.initializeAdditionalFeatures();
    }

    setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = Utils.getCurrentYear();
        }
    }

    initializeAdditionalFeatures() {
        // Add keyboard navigation
        this.setupKeyboardNavigation();
        
        // Add focus management for accessibility
        this.setupFocusManagement();
        
        // Add reduced motion support
        this.setupReducedMotion();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key to close any open modals (future expansion)
            if (e.key === 'Escape') {
                // Handle escape key
            }
            
            // Arrow keys for navigation (future expansion)
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                // Handle arrow key navigation
            }
        });
    }

    setupFocusManagement() {
        // Ensure focus is visible for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    setupReducedMotion() {
        // Respect user's motion preferences
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleMotionPreference = (e) => {
            if (e.matches) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        };

        mediaQuery.addListener(handleMotionPreference);
        handleMotionPreference(mediaQuery);
    }
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// Initialize the application
const app = new PortfolioApp();

// Export for testing purposes (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PortfolioApp,
        ThemeManager,
        NavigationManager,
        Utils
    };
}
