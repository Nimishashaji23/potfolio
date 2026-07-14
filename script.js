document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    
    // Create an array of all sections including header
    const allSections = [header, ...Array.from(sections)];

    window.addEventListener('scroll', () => {
        let current = '';
        
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust the offset for the fixed navbar
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Skill Bar Animation on Scroll ---
    const skillSection = document.getElementById('skills');
    const skillLevels = document.querySelectorAll('.skill-level');
    let animated = false;

    // We store the target width in a data attribute or read it from the inline style,
    // then set it to 0 initially.
    skillLevels.forEach(skill => {
        skill.dataset.width = skill.style.width;
        skill.style.width = '0';
    });

    const animateSkills = () => {
        if (animated) return;
        
        const sectionPos = skillSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos) {
            skillLevels.forEach(skill => {
                skill.style.width = skill.dataset.width;
            });
            animated = true;
        }
    };

    window.addEventListener('scroll', animateSkills);
    
    // Trigger once on load in case it's already in view
    animateSkills();

    // --- Reveal Elements on Scroll (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.project-card, .timeline-item, .cert-card, .contact-card, .highlight-item, .soft-skill-card');
    
    // Initial state
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
