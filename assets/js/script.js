// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check if theme toggle exists
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
    });
  }

  // Contact form handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const service = formData.get('service');
      const budget = formData.get('budget');
      const message = formData.get('message');
      
      // Simple validation
      if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.', 'success');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .process-step');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Service card hover effects
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Portfolio item click handlers
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
      const title = this.querySelector('h3').textContent;
      showNotification(`Viewing project: ${title}`, 'info');
    });
  });

  // Testimonial carousel (if multiple testimonials)
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  if (testimonialCards.length > 1) {
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
      testimonialCards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
      });
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }

  // Stats counter animation
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => {
    const target = parseInt(stat.textContent);
    const increment = target / 50;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
    }, 50);
  });

  // Service selection in contact form
  const serviceSelect = document.getElementById('service');
  const budgetSelect = document.getElementById('budget');
  
  if (serviceSelect && budgetSelect) {
    serviceSelect.addEventListener('change', function() {
      const selectedService = this.value;
      
      // Update budget options based on service
      const budgetOptions = {
        'web-scraping': ['100-500', '500-1000', '1000-2500'],
        'excel-tools': ['100-500', '500-1000'],
        'web-development': ['500-1000', '1000-2500', '2500+'],
        'cybersecurity': ['500-1000', '1000-2500', '2500+'],
        'ai-ml': ['1000-2500', '2500+'],
        'integration': ['500-1000', '1000-2500', '2500+']
      };
      
      if (budgetOptions[selectedService]) {
        budgetSelect.innerHTML = '<option value="">Select budget range</option>';
        budgetOptions[selectedService].forEach(budget => {
          const option = document.createElement('option');
          option.value = budget;
          option.textContent = budget === '100-500' ? '$100 - $500' :
                             budget === '500-1000' ? '$500 - $1,000' :
                             budget === '1000-2500' ? '$1,000 - $2,500' : '$2,500+';
          budgetSelect.appendChild(option);
        });
      }
    });
  }
});

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 1000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: auto;
  }
  
  .notification-close:hover {
    opacity: 0.8;
  }
`;
document.head.appendChild(notificationStyles);

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('mobile-active');
}

// Add mobile menu styles
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
  @media (max-width: 768px) {
    .nav-links.mobile-active {
      display: flex !important;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #161b22;
      border-top: 1px solid #30363d;
      padding: 1rem;
    }
    
    .nav-links.mobile-active li {
      margin: 0.5rem 0;
    }
  }
`;
document.head.appendChild(mobileStyles);