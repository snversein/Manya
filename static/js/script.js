document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // New Hero Section Animations
    const heroSection = document.querySelector('.hero-section-new');
    if (heroSection) {
        // Parallax effect for floating shapes
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Dynamic feature item animation
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
            item.classList.add('slideInLeft');
            
            // Add active class after slideIn animation completes to trigger border animation
            setTimeout(() => {
                item.classList.add('active');
                
                // Remove active class after 4 seconds to stop the border animation
                setTimeout(() => {
                    item.classList.remove('active');
                }, 4000);
            }, (index * 200) + 800);
        });

        // Medical Showcase Interactions
        const medicalShowcase = document.querySelector('.medical-showcase');
        if (medicalShowcase) {
            const serviceCards = document.querySelectorAll('.service-card');
            
            // Add hover effects for service cards
            serviceCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const icon = this.querySelector('.service-icon');
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.transition = 'transform 0.3s ease';
                });
                
                card.addEventListener('mouseleave', function() {
                    const icon = this.querySelector('.service-icon');
                    icon.style.transform = 'scale(1) rotate(0deg)';
                });
                
                // Click interaction for service cards
                card.addEventListener('click', function() {
                    const service = this.getAttribute('data-service');
                    
                    // Highlight animation
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                    
                    // Flash scanner ring
                    const scannerRing = document.querySelector('.scanner-ring');
                    if (scannerRing) {
                        scannerRing.style.animation = 'none';
                        setTimeout(() => {
                            scannerRing.style.animation = 'ringPulse 3s ease-in-out infinite';
                        }, 10);
                    }
                });
            });

            // Auto-rotate through services
            let currentService = 0;
            setInterval(() => {
                serviceCards.forEach(card => card.style.transform = '');
                serviceCards[currentService].style.transform = 'scale(1.05)';
                setTimeout(() => {
                    serviceCards[currentService].style.transform = '';
                }, 2000);
                currentService = (currentService + 1) % serviceCards.length;
            }, 4000);
        }
    }

    // Testimonial Slider
    const testimonialTexts = document.querySelectorAll('.testimonial-text');
    let currentIndex = 0;

    function showTestimonial(index) {
        // Remove active class from all and add exit-left to current
        testimonialTexts.forEach((text, i) => {
            text.classList.remove('active');
            if (i === currentIndex) {
                text.classList.add('exit-left');
            }
        });
        
        setTimeout(() => {
            testimonialTexts.forEach((text, i) => {
                text.classList.remove('exit-left');
            });
            testimonialTexts[index].classList.add('active');
        }, 300);
    }

    function nextTestimonial() {
        const nextIndex = (currentIndex + 1) % testimonialTexts.length;
        showTestimonial(nextIndex);
        currentIndex = nextIndex;
    }

    // Initialize first testimonial
    if (testimonialTexts.length > 0) {
        showTestimonial(0);
        setInterval(nextTestimonial, 3000); // Change every 3 seconds
    }

    // Sticky Navbar Logic
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Chatbot FAB Logic
    const chatbotFab = document.getElementById('chatbot-fab');

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Lower inc to slow and higher to slow
                const inc = target / speed;

                // Check if target is reached
                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                    // Append '+' if it's the 50000 one (hacky but works for demo)
                    if (target === 50000) counter.innerText += '+';
                }
            };
            updateCount();
        });
    };

    // Trigger counter animation using Intersection Observer
    let counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect(); // Run once
            }
        });
    }, { threshold: 0.5 });

    if (document.querySelector('.counter')) {
        counterObserver.observe(document.querySelector('.counter'));
    }

    // Smooth scrolling for anchor links (if any internal links are added)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Submission Handling for Book Test
    const bookTestForm = document.querySelector('form[action="/book-test-submit"]'); // Placeholder selector
    if (bookTestForm) {
        bookTestForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you! We will contact you soon.');
            bookTestForm.reset();
        });
    }

    // Generic Contact Form handling if selector differs
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thanks — we will contact you soon.');
            contactForm.reset();
        });
    }

    // Chatbot Logic
    const chatForm = document.getElementById('chatForm');
    const chatBox = document.getElementById('chatBox');
    const chatInput = document.getElementById('chatInput');

    if (chatForm) {
        chatForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message) {
                // Add User Message
                addMessage(message, 'sent');
                chatInput.value = '';

                // Simulate AI Response (Simple Timeout)
                setTimeout(() => {
                    const responses = [
                        "Thank you for your message. How else can I assist you?",
                        "Our center is open from 8 AM to 9 PM.",
                        "You can book a test using the 'Book Test' page.",
                        "We offer MRI, CT Scan, Ultrasound, and Pathology services.",
                        "Please contact +91 98765 43210 for immediate assistance."
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addMessage(randomResponse, 'received');
                }, 1000);
            }
        });
    }

    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `d-flex mb-3 ${type === 'sent' ? 'justify-content-end' : 'justify-content-start'}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = `p-3 rounded-3 shadow-sm ${type === 'sent' ? 'bg-primary text-white' : 'bg-white'}`;
        contentDiv.style.maxWidth = '80%';
        contentDiv.textContent = text;

        messageDiv.appendChild(contentDiv);
        chatBox.appendChild(messageDiv);

        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    }

});
