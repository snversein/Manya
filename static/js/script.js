document.addEventListener('DOMContentLoaded', function () {

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
