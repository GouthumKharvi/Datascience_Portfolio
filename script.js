/* ==========================================================================
   Gouthum Kharvi — Portfolio JavaScript
   Modern 2026 Interactions
   ========================================================================== */

(() => {
  'use strict';

  // =========================================================================
  // Utility Functions
  // =========================================================================
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  const throttle = (fn, limit = 16) => {
    let inThrottle = false;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =========================================================================
  // Page Progress Bar
  // =========================================================================
  const progressBar = $('.page-progress');

  const updateProgress = throttle(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  // =========================================================================
  // Navigation
  // =========================================================================
  const nav = $('.nav');
  const navToggle = $('.nav__toggle');
  const navMenu = $('#nav-menu');
  const navLinks = $$('.nav__link');

  // Scroll effect
  const handleNavScroll = throttle(() => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // Mobile menu toggle
  navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isOpen);
    navMenu.classList.toggle('open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Active link highlighting
  const sections = $$('section[id]');
  const observerOptions = {
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // =========================================================================
  // Reveal Animations (IntersectionObserver)
  // =========================================================================
  if (!prefersReducedMotion()) {
    const revealElements = $$('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Immediately reveal if reduced motion
    $$('[data-reveal]').forEach(el => el.classList.add('revealed'));
  }

  // =========================================================================
  // Hero Counter Animation
  // =========================================================================
  const statValues = $$('.hero__stat-value[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 2000;
        const startTime = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => counterObserver.observe(el));

  // =========================================================================
  // Tabs (About Section)
  // =========================================================================
  const tabsContainer = $('.tabs');
  const tabTriggers = $$('.tabs__trigger');
  const tabPanels = $$('.tabs__panel');
  const tabIndicator = $('.tabs__indicator');

  function activateTab(targetTab) {
    const trigger = $(`[data-tab="${targetTab}"]`);
    const panel = $(`#${targetTab}-panel`);

    if (!trigger || !panel) return;

    // Update triggers
    tabTriggers.forEach(t => {
      t.classList.toggle('tabs__trigger--active', t === trigger);
      t.setAttribute('aria-selected', t === trigger);
    });

    // Update panels
    tabPanels.forEach(p => {
      const isActive = p === panel;
      p.hidden = !isActive;
      if (isActive) {
        // Re-trigger reveal animation
        p.querySelectorAll('[data-reveal]').forEach(el => {
          el.classList.remove('revealed');
          // Force reflow
          void el.offsetWidth;
          el.classList.add('revealed');
        });
      }
    });

    // Move indicator
    const index = [...tabTriggers].indexOf(trigger);
    if (tabIndicator && index >= 0) {
      tabIndicator.style.transform = `translateX(${index * 100}%)`;
      tabIndicator.style.width = `${100 / tabTriggers.length}%`;
    }
  }

  // Initialize indicator position
  if (tabIndicator && tabTriggers.length) {
    tabIndicator.style.width = `${100 / tabTriggers.length}%`;
  }

  // Click handlers
  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      activateTab(trigger.dataset.tab);
    });

    // Keyboard navigation
    trigger.addEventListener('keydown', (e) => {
      const index = tabTriggers.indexOf(trigger);
      let newIndex = index;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          newIndex = (index + 1) % tabTriggers.length;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = (index - 1 + tabTriggers.length) % tabTriggers.length;
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = tabTriggers.length - 1;
          break;
        default:
          return;
      }

      tabTriggers[newIndex].focus();
      activateTab(tabTriggers[newIndex].dataset.tab);
    });
  });

  // =========================================================================
  // Project Filtering
  // =========================================================================
  function initProjectFilter(filterContainerSelector, gridSelector) {
    const filterContainer = $(filterContainerSelector);
    const grid = $(gridSelector);

    if (!filterContainer || !grid) return;

    const buttons = $$('.filter__btn', filterContainer);
    const cards = $$('.project-card', grid);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        buttons.forEach(b => b.classList.toggle('filter__btn--active', b === btn));

        // Filter cards with animation
        cards.forEach((card, index) => {
          const categories = card.dataset.category?.split(' ') || [];
          const matches = filter === 'all' || categories.includes(filter);

          if (matches) {
            card.style.display = '';
            card.style.animation = 'none';
            // Force reflow for staggered animation
            void card.offsetWidth;
            card.style.animation = `fadeInUp ${300 + index * 30}ms var(--ease-out) forwards`;
            card.style.opacity = '0';
          } else {
            card.style.animation = `fadeOut ${200}ms var(--ease-out) forwards`;
            setTimeout(() => {
              if (!matches) card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // Add fadeOut keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-20px); }
    }
  `;
  document.head.appendChild(style);

  // Initialize filters
  initProjectFilter('#miniprojects .projects__filter', '#miniprojects-grid');
  initProjectFilter('#portfolio .projects__filter', '#portfolio-grid');

  // =========================================================================
  // Certificate Modal
  // =========================================================================
  const modal = $('.modal');
  const modalBackdrop = $('.modal__backdrop');
  const modalClose = $('.modal__close');
  const modalImg = $('#cert-modal-img');
  const modalTitle = $('#cert-modal-title');
  const modalDesc = $('#cert-modal-desc');
  const certCards = $$('.cert-card[data-modal]');

  // Certificate data
  const certData = {
    cert1: {
      title: 'Data Science Bootcamp',
      desc: 'UpGrad • August 2024',
      img: 'images/upgrad_certificate.jpg'
    },
    cert2: {
      title: 'AI for All: From Basics to GenAI Practice',
      desc: 'NVIDIA • July 2025',
      img: 'images/nvidia_certificate.jpg'
    },
    cert3: {
      title: 'GenAI Powered Data Analytics Job Simulation',
      desc: 'TATA (Forage) • August 2025',
      img: 'images/tata_certificate.jpg'
    },
    cert4: {
      title: 'Data Science & Analytics Internship',
      desc: 'Future Interns • July 2025',
      img: 'images/future_interns_certificate.jpg'
    },
    cert5: {
      title: 'Data Science & Analytics Internship (with LOR)',
      desc: 'Future Interns • July 2025',
      img: 'images/future_interns_certificate-lor.jpg'
    },
    cert6: {
      title: 'AI & ML Internship Certificate',
      desc: 'Pinnacle Labs • 2025',
      img: 'images/pinnacle_certificates.jpg'
    },
    cert7: {
      title: 'AI & ML Internship Certificate',
      desc: 'Inlighn Global X Pvt Ltd • 2025',
      img: 'images/inlighn_certificate.jpg'
    },
    cert8: {
      title: 'Hackathon Certificate',
      desc: 'UpGrad • 2024',
      img: 'images/hackathon_certificate.jpg'
    }
  };

  function openModal(certId) {
    const data = certData[certId];
    if (!data) return;

    modalImg.src = data.img;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    modal.hidden = false;
    // Force reflow for animation
    void modal.offsetWidth;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus trap
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    setTimeout(() => {
      modal.hidden = true;
      document.body.style.overflow = '';
    }, 300);
  }

  certCards.forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.modal));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.modal);
      }
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // =========================================================================
  // Contact Form (Formspree)
  // =========================================================================
  const contactForm = $('.contact__form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          submitBtn.innerHTML = '<span>Sent!</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
          submitBtn.style.background = 'var(--color-accent-secondary)';
          contactForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        submitBtn.innerHTML = '<span>Failed — try again</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        submitBtn.style.background = 'var(--color-accent)';
      }

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 4000);
    });
  }

  // =========================================================================
  // Smooth Scroll for Anchor Links
  // =========================================================================
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = $(href);
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });

        // Update URL without scroll
        history.pushState(null, '', href);
      }
    });
  });

  // =========================================================================
  // Hero Code Window Typing Effect (Optional Enhancement)
  // =========================================================================
  // Disabled by default — uncomment to enable
  /*
  const codeLines = $$('.hero__code code .kw, .hero__code code .fn, .hero__code code .cl');
  codeLines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-10px)';
    line.style.transition = `opacity 300ms ease, transform 300ms ease`;
    line.style.transitionDelay = `${i * 50}ms`;
  });

  const heroCodeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        codeLines.forEach(line => {
          line.style.opacity = '1';
          line.style.transform = 'translateX(0
