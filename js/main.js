document.addEventListener('DOMContentLoaded', () => {

    // ─────────────────────────────────────────
    // Mobile Menu Toggle
    // ─────────────────────────────────────────
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks  = document.getElementById('nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // ─────────────────────────────────────────
    // Navbar scroll + Parallax
    // ─────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    const heroBg = document.querySelector('.hero-bg-parallax');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        if (scrolled > 50) {
            navbar.style.boxShadow       = '0 4px 30px rgba(0,0,0,0.6)';
            navbar.style.backgroundColor = 'rgba(10,10,10,0.98)';
            navbar.style.height          = '70px';
        } else {
            navbar.style.boxShadow       = 'none';
            navbar.style.backgroundColor = 'rgba(10,10,10,0.95)';
            navbar.style.height          = 'var(--nav-height)';
        }

        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });

    // ─────────────────────────────────────────
    // Scroll Animations (IntersectionObserver)
    // ─────────────────────────────────────────
    const fadeObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => fadeObserver.observe(el));

    // ─────────────────────────────────────────
    // Products — Filter Tabs
    // ─────────────────────────────────────────
    const filterBtns  = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            productCards.forEach(card => {
                const show = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('hidden', !show);
                // Re-trigger scroll animation on revealed cards
                if (show && !card.classList.contains('fade-in')) {
                    card.classList.add('fade-in');
                }
            });
        });
    });

    // ─────────────────────────────────────────
    // Products — Per-product Quick Inquire → WhatsApp
    // ─────────────────────────────────────────
    document.querySelectorAll('.product-quick-inquire').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.dataset.product || 'a product';
            const msg = `Hi Dazzle Place Studio 👋\n\nI'm interested in *${product}* and would like more details (availability, sizes, pricing, etc.).\n\nPlease let me know!`;
            window.open(`https://wa.me/2348130098015?text=${encodeURIComponent(msg)}`, '_blank');
        });
    });

    // ─────────────────────────────────────────
    // Main Booking Form → WhatsApp
    // ─────────────────────────────────────────
    const bookingForm = document.getElementById('whatsapp-booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name    = document.getElementById('form-name').value.trim();
            const phone   = document.getElementById('form-phone').value.trim();
            const type    = document.getElementById('form-type').value;
            const date    = document.getElementById('form-date').value;
            const message = document.getElementById('form-message').value.trim();

            // Simple validation
            let valid = true;
            ['form-name', 'form-phone', 'form-type', 'form-message'].forEach(id => {
                const el = document.getElementById(id);
                if (!el.value.trim()) {
                    el.classList.add('error');
                    valid = false;
                    el.addEventListener('input', () => el.classList.remove('error'), { once: true });
                }
            });
            if (!valid) return;

            // Build WhatsApp message
            let msg = `Hello Dazzle Place Studio! 🌟\n\n`;
            msg += `*Name:* ${name}\n`;
            msg += `*WhatsApp:* ${phone}\n`;
            msg += `*Reason:* ${type}\n`;
            if (date) msg += `*Preferred Date:* ${date}\n`;
            msg += `\n*Details:*\n${message}\n\n`;
            msg += `Looking forward to hearing from you! 😊`;

            window.open(`https://wa.me/2348130098015?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    // ─────────────────────────────────────────
    // Quick Inquiry Panel (floating pill)
    // ─────────────────────────────────────────
    const trigger  = document.getElementById('quick-inquiry-trigger');
    const panel    = document.getElementById('quick-inquiry-panel');
    const closeBtn = document.getElementById('qip-close');
    const backdrop = document.getElementById('qip-backdrop');
    const qipForm  = document.getElementById('quick-inquiry-form');

    function openPanel() {
        panel.classList.add('open');
        backdrop.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closePanel() {
        panel.classList.remove('open');
        backdrop.classList.remove('visible');
        document.body.style.overflow = '';
    }

    if (trigger) trigger.addEventListener('click', openPanel);
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    if (backdrop) backdrop.addEventListener('click', closePanel);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel && panel.classList.contains('open')) closePanel();
    });

    if (qipForm) {
        qipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('qip-name').value.trim();
            const question = document.getElementById('qip-question').value.trim();

            if (!name || !question) {
                if (!name) document.getElementById('qip-name').classList.add('error');
                if (!question) document.getElementById('qip-question').classList.add('error');
                ['qip-name','qip-question'].forEach(id => {
                    document.getElementById(id).addEventListener('input', () =>
                        document.getElementById(id).classList.remove('error'), { once: true });
                });
                return;
            }

            let msg = `Hi Dazzle Place Studio! 👋\n\n*Name:* ${name}\n\n*Question:*\n${question}\n\nThanks!`;
            window.open(`https://wa.me/2348130098015?text=${encodeURIComponent(msg)}`, '_blank');
            closePanel();
            qipForm.reset();
        });
    }

});
