document.addEventListener('DOMContentLoaded', () => {
    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const activateNavLink = () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active-link');
            }
        });
    };

    window.addEventListener('scroll', activateNavLink);

    // ===== SCROLL REVEAL ANIMATIONS =====
    const revealItems = document.querySelectorAll(
        '.reveal-text, .reveal-text-delay, .portfolio-card, .service-card, .reveal, .reveal-delay'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // animate once only
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach(item => revealObserver.observe(item));

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close nav when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // ===== CONTACT FORM =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.textContent = 'Message Sent ✓';
            btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = 'Send Message';
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }

    // ===== SMOOTH SCROLL for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
