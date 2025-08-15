// Projects Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initProjectsPage();
});

function initProjectsPage() {
  // Initialize components
  initNavbar();
  initHeroAnimations();
  initCategoryFilter();
  initProjectCards();
  initModal();
  initGalleryModal();
  initLoadingAnimation();
  initScrollAnimations();
  initStatsCounter();
  initMobileMenu();
}

// Navbar functionality
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const themeToggle = document.getElementById('themeToggle');
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      themeToggle.textContent = isLight ? '🌙' : '🌓';
    });
  }
}

// Hero section animations
function initHeroAnimations() {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroStats = document.querySelector('.hero-stats');
  
  // Animate title lines
  const titleLines = document.querySelectorAll('.title-line');
  titleLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, index * 200);
  });
  
  // Animate subtitle
  setTimeout(() => {
    heroSubtitle.style.opacity = '1';
    heroSubtitle.style.transform = 'translateY(0)';
  }, 600);
  
  // Animate stats
  setTimeout(() => {
    heroStats.style.opacity = '1';
    heroStats.style.transform = 'translateY(0)';
  }, 800);
}

// Category filtering
function initCategoryFilter() {
  const categoryTabs = document.querySelectorAll('.category-tab');
  const projectCards = document.querySelectorAll('.project-card');
  const projectGroups = document.querySelectorAll('.project-group');
  
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;
      
      // Update active tab
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Filter projects
      filterProjects(category, projectCards, projectGroups);
    });
  });
}

function filterProjects(category, projectCards, projectGroups) {
  const loadingOverlay = document.getElementById('loadingOverlay');
  
  // Show loading
  loadingOverlay.classList.add('active');
  
  setTimeout(() => {
    projectCards.forEach(card => {
      const cardCategories = card.dataset.category.split(' ');
      
      if (category === 'all' || cardCategories.includes(category)) {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.6s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Show/hide project groups
    projectGroups.forEach(group => {
      const groupCategory = group.dataset.category;
      const hasVisibleCards = Array.from(group.querySelectorAll('.project-card'))
        .some(card => card.style.display !== 'none');
      
      if (category === 'all' || groupCategory === category || hasVisibleCards) {
        group.style.display = 'block';
      } else {
        group.style.display = 'none';
      }
    });
    
    // Hide loading
    loadingOverlay.classList.remove('active');
  }, 300);
}

// Project cards interactions
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Hover effects
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
    
    // Click to open modal
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.btn')) {
        openProjectModal(card);
      }
    });
    
    // Button interactions
    const buttons = card.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleButtonClick(btn, card);
      });
    });
  });
}

function handleButtonClick(btn, card) {
  const buttonText = btn.textContent.trim();
  const projectTitle = card.querySelector('h3').textContent;
  
  // Show loading on button
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
  btn.disabled = true;
  
  setTimeout(() => {
    // Simulate action based on button type
    if (buttonText.includes('Demo') || buttonText.includes('Try')) {
      showNotification(`Opening demo for: ${projectTitle}`, 'success');
    } else if (buttonText.includes('Code') || buttonText.includes('GitHub')) {
      showNotification(`Opening repository for: ${projectTitle}`, 'success');
    } else if (buttonText.includes('Download')) {
      showNotification(`Starting download for: ${projectTitle}`, 'success');
    } else if (buttonText.includes('Documentation')) {
      showNotification(`Opening documentation for: ${projectTitle}`, 'success');
    }
    
    // Restore button
    btn.innerHTML = originalText;
    btn.disabled = false;
  }, 1500);
}

// Modal functionality
function initModal() {
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  
  // Close modal
  modalClose.addEventListener('click', closeProjectModal);
  
  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

function openProjectModal(card) {
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalLinks = document.getElementById('modalLinks');
  
  // Get project data
  const title = card.querySelector('h3').textContent;
  const description = card.querySelector('p').textContent;
  const image = card.querySelector('img');
  const techTags = card.querySelectorAll('.tech-tag');
  const buttons = card.querySelectorAll('.btn');
  
  // Populate modal
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  
  if (image) {
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalImage.style.display = 'block';
  } else {
    modalImage.style.display = 'none';
  }
  
  // Tech stack
  modalTechStack.innerHTML = '';
  techTags.forEach(tag => {
    const techTag = document.createElement('span');
    techTag.className = 'tech-tag';
    techTag.textContent = tag.textContent;
    modalTechStack.appendChild(techTag);
  });
  
  // Features (simulated based on project type)
  modalFeatures.innerHTML = '';
  const features = getProjectFeatures(title);
  features.forEach(feature => {
    const li = document.createElement('li');
    li.textContent = feature;
    modalFeatures.appendChild(li);
  });
  
  // Links
  modalLinks.innerHTML = '';
  buttons.forEach(btn => {
    const linkBtn = btn.cloneNode(true);
    linkBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleButtonClick(linkBtn, card);
    });
    modalLinks.appendChild(linkBtn);
  });
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Gallery Modal functionality
function initGalleryModal() {
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalClose = document.getElementById('galleryModalClose');
  
  // Close gallery modal
  galleryModalClose.addEventListener('click', closeGalleryModal);
  
  // Close on outside click
  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      closeGalleryModal();
    }
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
      closeGalleryModal();
    }
  });
}

function openGalleryModal(imageSrc, title) {
  const modal = document.getElementById('galleryModal');
  const modalTitle = document.getElementById('galleryModalTitle');
  const modalImage = document.getElementById('galleryModalImage');
  const modalDescription = document.getElementById('galleryModalDescription');
  const modalDetails = document.getElementById('galleryModalDetails');
  
  // Populate modal
  modalTitle.textContent = title;
  modalImage.src = imageSrc;
  modalImage.alt = title;
  
  // Get gallery details based on title
  const galleryDetails = getGalleryDetails(title);
  modalDescription.textContent = galleryDetails.description;
  
  // Populate details
  modalDetails.innerHTML = '';
  galleryDetails.details.forEach(detail => {
    const li = document.createElement('li');
    li.textContent = detail;
    modalDetails.appendChild(li);
  });
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
  const modal = document.getElementById('galleryModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function getGalleryDetails(title) {
  const detailsMap = {
    'AI Development Workspace': {
      description: 'My dedicated workspace for AI and machine learning development, equipped with powerful hardware and development tools.',
      details: [
        'High-performance GPU setup for ML training',
        'Multiple monitor configuration for efficient coding',
        'Organized development environment',
        'Real-time model monitoring tools'
      ]
    },
    'Coding Session': {
      description: 'Intensive coding sessions where I develop and debug complex applications and algorithms.',
      details: [
        'Pair programming sessions',
        'Code review and optimization',
        'Debugging complex issues',
        'Performance optimization'
      ]
    },
    'Project Planning': {
      description: 'Strategic planning phase where I design architecture, create roadmaps, and define project milestones.',
      details: [
        'Architecture design and planning',
        'Technology stack selection',
        'Timeline and milestone creation',
        'Resource allocation planning'
      ]
    },
    'Team Collaboration': {
      description: 'Collaborative development sessions with team members, stakeholders, and clients.',
      details: [
        'Agile development meetings',
        'Code collaboration and review',
        'Client requirement discussions',
        'Team knowledge sharing'
      ]
    },
    'Testing Phase': {
      description: 'Comprehensive testing phase including unit tests, integration tests, and user acceptance testing.',
      details: [
        'Automated testing implementation',
        'Manual testing procedures',
        'Performance testing',
        'Security testing'
      ]
    },
    'Final Deployment': {
      description: 'Production deployment phase with monitoring, documentation, and maintenance planning.',
      details: [
        'Production environment setup',
        'Deployment automation',
        'Monitoring and logging',
        'Documentation completion'
      ]
    }
  };
  
  return detailsMap[title] || {
    description: 'Project development phase showcasing the development process.',
    details: ['Development phase', 'Testing phase', 'Deployment phase']
  };
}

function getProjectFeatures(projectTitle) {
  const featuresMap = {
    'AI-Powered Resume Analyzer': [
      'Advanced NLP processing',
      'Machine learning scoring',
      'PDF parsing and analysis',
      'Custom scoring algorithms',
      'Export to multiple formats'
    ],
    'Research Auto-Assistant': [
      'Paper summarization',
      'Reference extraction',
      'Citation management',
      'Research trend analysis',
      'Automated literature review'
    ],
    'RentCare - Car Rental System': [
      'User authentication system',
      'Booking management',
      'Admin dashboard',
      'Payment processing',
      'Inventory tracking'
    ],
    'Excel Automation Tool': [
      'Bulk data processing',
      'Format standardization',
      'Data validation',
      'Custom macros',
      'Error reporting'
    ],
    'Product Price Scraper': [
      'Multi-site monitoring',
      'Price change alerts',
      'CSV export functionality',
      'Historical data tracking',
      'Automated scheduling'
    ]
  };
  
  return featuresMap[projectTitle] || [
    'Feature 1',
    'Feature 2',
    'Feature 3'
  ];
}

// Loading animation
function initLoadingAnimation() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  
  // Hide loading after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingOverlay.classList.remove('active');
    }, 1000);
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, observerOptions);
  
  // Observe elements
  const animatedElements = document.querySelectorAll('.project-card, .project-group, .category-tab');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Stats counter animation
function initStatsCounter() {
  const statItems = document.querySelectorAll('.stat-item');
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.stat-number');
        const target = parseInt(entry.target.dataset.count);
        animateCounter(statNumber, target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statItems.forEach(item => {
    statsObserver.observe(item);
  });
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 50);
}

// Mobile menu
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      mobileMenuToggle.classList.toggle('active');
      
      // Animate hamburger
      const spans = mobileMenuToggle.querySelectorAll('span');
      spans.forEach((span, index) => {
        if (mobileMenuToggle.classList.contains('active')) {
          if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
          if (index === 1) span.style.opacity = '0';
          if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
          span.style.transform = 'none';
          span.style.opacity = '1';
        }
      });
    });
  }
  
  // Close mobile menu on link click
  const mobileLinks = navLinks.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-active');
      mobileMenuToggle.classList.remove('active');
    });
  });
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification
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
  
  // Close button
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Auto remove
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Add notification styles
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
  
  @media (max-width: 768px) {
    .nav-links.mobile-active {
      display: flex !important;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(22, 27, 34, 0.98);
      backdrop-filter: blur(10px);
      border-top: 1px solid #30363d;
      padding: 1rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    
    .nav-links.mobile-active li {
      margin: 0.5rem 0;
    }
    
    .nav-links.mobile-active a {
      display: block;
      padding: 0.8rem 1rem;
      border-radius: 8px;
    }
  }
`;
document.head.appendChild(notificationStyles);

// Performance optimization
function debounce(func, wait) {
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

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
  // Scroll-based animations can be added here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Preload images for better performance
function preloadImages() {
  const images = document.querySelectorAll('img[src]');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const preloadImg = new Image();
      preloadImg.src = src;
    }
  });
}

// Initialize preloading
preloadImages(); 