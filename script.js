// Blue Bananas FTC Team Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu-active');
            navToggle.classList.toggle('nav-toggle-active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('nav-menu-active')) {
                    navMenu.classList.remove('nav-menu-active');
                    navToggle.classList.remove('nav-toggle-active');
                }
            }
        });
    });
    
    // Header background opacity on scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .season-card, .role-card, .contact-card, .stat');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add some interactive features
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
    
    // Copyright year update
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.footer-text p');
    copyrightElements.forEach(element => {
        if (element.textContent.includes('2024')) {
            element.textContent = element.textContent.replace('2024', currentYear);
        }
    });
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Add CSS for animations and mobile menu
const additionalStyles = `
<style>
/* Mobile Navigation Styles */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .nav-menu-active {
        display: flex;
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    }
    
    .nav-toggle-active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle-active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle-active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}

/* Header scroll effect */
.header-scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Animation styles */
.feature-card,
.season-card,
.role-card,
.contact-card,
.stat {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Loading state */
body {
    opacity: 0;
    transition: opacity 0.3s ease;
}

body.loaded {
    opacity: 1;
}

/* Enhanced hover effects */
.social-link:hover .social-icon {
    transform: scale(1.2);
    transition: transform 0.3s ease;
}

.btn:hover {
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

/* Pulse animation for robot placeholder */
.robot-placeholder {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
}
</style>
`;

// Inject additional styles
if (document.head) {
    document.head.insertAdjacentHTML('beforeend', additionalStyles);
}