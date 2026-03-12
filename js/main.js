document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Scroll effect for navbar
    const navbar = document.getElementById('navbar');
    const heroBg = document.querySelector('.hero-bg-parallax');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Navbar scroll state
        if (scrolled > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.6)';
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
            navbar.style.height = '70px'; // Shrink on scroll
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            navbar.style.height = 'var(--nav-height)';
        }

        // Parallax effect
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });

    // Intersection Observer for scroll animations
    const fadeElements = document.querySelectorAll('.animate-on-scroll');
    
    const fadeOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px" // Better reveal timing
    };
    
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeOptions);
    
    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });
});
