/* ==========================================================================
   INSURIO - PREMIUM INSURANCE AGENCY CUSTOM JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- STICKY HEADER ---
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- MOBILE NAV MENU TOGGLE ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- HERO SLIDER ---
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-arrow-prev');
  const nextBtn = document.querySelector('.hero-arrow-next');
  let currentSlide = 0;
  const slideInterval = 6000;
  let slideTimer;

  if (slides.length > 0) {
    const showSlide = (index) => {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
      showSlide(currentSlide + 1);
    };

    const prevSlide = () => {
      showSlide(currentSlide - 1);
    };

    const startTimer = () => {
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, slideInterval);
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startTimer();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        startTimer();
      });
    });

    startTimer();
  }

  // --- FAQ ACCORDION ---
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.faq-body');
      const isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBody = otherItem.querySelector('.faq-body');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + "px";
      } else {
        item.classList.remove('active');
        body.style.maxHeight = null;
      }
    });
  });

  // Open first FAQ item by default on load if FAQ section exists
  const firstFaq = document.querySelector('.faq-item');
  if (firstFaq) {
    const firstFaqHeader = firstFaq.querySelector('.faq-header');
    if (firstFaqHeader) firstFaqHeader.click();
  }

  // --- PORTFOLIO FILTER ---
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // --- COUNTER UP ANIMATION ---
  const stats = document.querySelectorAll('.stat-number');
  const countSpeed = 200; // The lower the slower

  const startCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    let count = 0;
    const increment = Math.ceil(target / countSpeed);

    const updateCount = () => {
      count += increment;
      if (count < target) {
        el.innerText = count + suffix;
        setTimeout(updateCount, 1);
      } else {
        el.innerText = target + suffix;
      }
    };
    updateCount();
  };

  if (stats.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
      counterObserver.observe(stat);
    });
  }

  // --- TESTIMONIALS SLIDER ---
  const testimonials = document.querySelectorAll('.testimonial-card');
  const testimonialDots = document.querySelectorAll('.testimonials-dot');
  const testimonialsSlider = document.querySelector('.testimonials-slider');
  let currentTestimonialPage = 0;

  if (testimonialsSlider && testimonialDots.length > 0) {
    const showTestimonialPage = (index) => {
      testimonialDots.forEach(dot => dot.classList.remove('active'));
      
      const cardsPerPage = window.innerWidth > 768 ? 2 : 1;
      const totalPages = Math.ceil(testimonials.length / cardsPerPage);
      currentTestimonialPage = (index + totalPages) % totalPages;

      let offset = currentTestimonialPage * 100;
      if (window.innerWidth > 768) {
        offset = currentTestimonialPage * 50; // Translate 50% per page when showing 2 columns
      }
      
      testimonialsSlider.style.transform = `translateX(-${offset}%)`;
      if (testimonialDots[currentTestimonialPage]) {
        testimonialDots[currentTestimonialPage].classList.add('active');
      }
    };

    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonialPage(index);
      });
    });

    // Handle responsiveness on resize
    window.addEventListener('resize', () => {
      showTestimonialPage(currentTestimonialPage);
    });
  }

  // --- LOCALSTORAGE FORM HANDLING & DIALOGS ---
  const contactForm = document.getElementById('contact-form');
  const newsletterForms = document.querySelectorAll('.footer-newsletter-form');
  
  // Custom dialog injection
  const injectDialog = (title, message) => {
    // Create elements if not exist
    let overlay = document.querySelector('.dialog-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'dialog-overlay';
      overlay.innerHTML = `
        <div class="dialog-box">
          <div class="dialog-icon">
            <svg class="svg-icon" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          </div>
          <h3 class="dialog-title"></h3>
          <p class="dialog-desc"></p>
          <button class="btn btn-primary dialog-close-btn">Confirm</button>
        </div>
      `;
      document.body.appendChild(overlay);
      
      overlay.querySelector('.dialog-close-btn').addEventListener('click', () => {
        overlay.classList.remove('active');
      });
    }
    
    overlay.querySelector('.dialog-title').innerText = title;
    overlay.querySelector('.dialog-desc').innerText = message;
    
    // Trigger animation
    setTimeout(() => {
      overlay.classList.add('active');
    }, 10);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('form-name')?.value || '',
        email: document.getElementById('form-email')?.value || '',
        phone: document.getElementById('form-phone')?.value || '',
        subject: document.getElementById('form-subject')?.value || '',
        message: document.getElementById('form-message')?.value || '',
        timestamp: new Date().toISOString()
      };

      // Save to localStorage
      let submissions = JSON.parse(localStorage.getItem('insurio_contacts') || '[]');
      submissions.push(formData);
      localStorage.setItem('insurio_contacts', JSON.stringify(submissions));

      // Reset form
      contactForm.reset();

      // Show success modal
      injectDialog(
        "Message Sent Successfully!", 
        `Thank you, ${formData.name}. Our insurance consultants will review your inquiry regarding "${formData.subject}" and get back to you within 24 hours.`
      );
    });
  }

  if (newsletterForms.length > 0) {
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('.footer-newsletter-input');
        const email = emailInput?.value || '';

        if (email) {
          let subscribers = JSON.parse(localStorage.getItem('insurio_subscribers') || '[]');
          subscribers.push({ email, timestamp: new Date().toISOString() });
          localStorage.setItem('insurio_subscribers', JSON.stringify(subscribers));

          if (emailInput) emailInput.value = '';

          injectDialog(
            "Subscription Success!",
            `Your email address (${email}) has been successfully subscribed to Insurio Weekly Newsletter. Stay updated with latest insurance plans and market updates.`
          );
        }
      });
    });
  }

  // --- BLOG VIRTUAL PAGINATION ---
  const blogList = document.getElementById('blog-posts-list');
  const paginationContainer = document.getElementById('blog-pagination');

  if (blogList && paginationContainer) {
    const blogCards = blogList.querySelectorAll('.blog-card-item-wrapper');
    const itemsPerPage = 4;
    const totalPages = Math.ceil(blogCards.length / itemsPerPage);

    const renderPage = (pageIndex) => {
      const start = pageIndex * itemsPerPage;
      const end = start + itemsPerPage;

      blogCards.forEach((card, idx) => {
        if (idx >= start && idx < end) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });

      // Update active state in pagination buttons
      paginationContainer.querySelectorAll('.pagination-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.getAttribute('data-page')) === pageIndex) {
          item.classList.add('active');
        }
      });

      // Smooth scroll back to top of blog list
      window.scrollTo({
        top: blogList.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });
    };

    // Generate pagination items
    paginationContainer.innerHTML = '';
    
    // Add page numbers
    for (let i = 0; i < totalPages; i++) {
      const pageBtn = document.createElement('div');
      pageBtn.className = `pagination-item ${i === 0 ? 'active' : ''}`;
      pageBtn.innerText = i + 1;
      pageBtn.setAttribute('data-page', i);
      pageBtn.addEventListener('click', () => {
        renderPage(i);
      });
      paginationContainer.appendChild(pageBtn);
    }

    // Initialize first page
    renderPage(0);
  }

  // --- LIGHTBOX GALLERY SIMULATION ---
  const galleryItems = document.querySelectorAll('.gallery-trigger');
  
  if (galleryItems.length > 0) {
    // Create lightbox wrapper
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <div class="lightbox-content">
        <img src="" alt="Lightbox Zoomed Image">
      </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-content img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const imgUrl = item.getAttribute('href') || item.querySelector('img')?.src;
        if (imgUrl) {
          lightboxImg.src = imgUrl;
          lightbox.classList.add('active');
        }
      });
    });

    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
      }
    });
  }

});
