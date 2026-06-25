/* ==========================================================================
   Gouthum Kharvi — Portfolio JavaScript
   Fixed for current index.html structure
   ========================================================================== */

(() => {
  'use strict';

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  const throttle = (fn, limit = 16) => {
    let inThrottle = false;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  };

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const progressBar = $('.page-progress');
  const nav = $('.nav');
  const navToggle = $('.nav-toggle');
  const navMenu = $('#nav-menu');
  const navLinks = $$('.nav-link');
  const sections = $$('section[id]');

  const updateProgress = throttle(() => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });

  const handleNavScroll = throttle(() => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  updateProgress();
  handleNavScroll();

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(section => sectionObserver.observe(section));
  }

  const revealElements = $$('[data-reveal]');

  if (!prefersReducedMotion()) {
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
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  const statValues = $$('.hero-stat-value[data-count], .hero__stat-value[data-count], .hero-stat .hero-stat-value[data-count], .hero-stat-value[data-count], .hero-stat .hero__stat-value[data-count], .herostat-value[data-count]');

  if (statValues.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);

          if (Number.isNaN(target)) return;

          const duration = 2000;
          const startTime = performance.now();

          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statValues.forEach(el => counterObserver.observe(el));
  }

  const tabTriggers = $$('.tabs-trigger');
  const tabPanels = $$('.tabs-panel');
  const tabIndicator = $('.tabs-indicator');

  function activateTab(targetTab) {
    const trigger = $(`[data-tab="${targetTab}"]`);
    const panel = $(`#${targetTab}-panel`);

    if (!trigger || !panel) return;

    tabTriggers.forEach(t => {
      const isActive = t === trigger;
      t.classList.toggle('tabs-trigger--active', isActive);
      t.setAttribute('aria-selected', String(isActive));
    });

    tabPanels.forEach(p => {
      const isActive = p === panel;
      p.hidden = !isActive;
      if (isActive) {
        p.classList.add('tabs-panel--active');
        p.querySelectorAll('[data-reveal]').forEach(el => {
          el.classList.add('revealed');
        });
      } else {
        p.classList.remove('tabs-panel--active');
      }
    });

    const index = tabTriggers.indexOf(trigger);
    if (tabIndicator && index >= 0 && tabTriggers.length) {
      tabIndicator.style.width = `${100 / tabTriggers.length}%`;
      tabIndicator.style.transform = `translateX(${index * 100}%)`;
    }
  }

  if (tabIndicator && tabTriggers.length) {
    tabIndicator.style.width = `${100 / tabTriggers.length}%`;
  }

  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      activateTab(trigger.dataset.tab);
    });

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

  if (tabTriggers.length) {
    const activeTrigger =
      $('.tabs-trigger.tabs-trigger--active') ||
      tabTriggers[0];

    if (activeTrigger?.dataset.tab) {
      activateTab(activeTrigger.dataset.tab);
    }
  }

  function initProjectFilter(filterContainerSelector, gridSelector) {
    const filterContainer = $(filterContainerSelector);
    const grid = $(gridSelector);

    if (!filterContainer || !grid) return;

    const buttons = $$('.filterbtn', filterContainer);
    const cards = $$('.project-card', grid);

    if (!buttons.length || !cards.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        buttons.forEach(b => {
          b.classList.toggle('filterbtn--active', b === btn);
        });

        cards.forEach((card, index) => {
          const categories = (card.dataset.category || '').split(' ').filter(Boolean);
          const matches = filter === 'all' || categories.includes(filter);

          if (matches) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 300ms var(--ease-out), transform 300ms var(--ease-out)';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
              card.style.transitionDelay = `${index * 30}ms`;
            });
          } else {
            card.style.transition = 'opacity 200ms var(--ease-out), transform 200ms var(--ease-out)';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            card.style.transitionDelay = '0ms';

            setTimeout(() => {
              const latestCategories = (card.dataset.category || '').split(' ').filter(Boolean);
              const stillHidden = !(filter === 'all' || latestCategories.includes(filter));
              if (stillHidden) {
                card.style.display = 'none';
              }
            }, 200);
          }
        });
      });
    });
  }

  initProjectFilter('#miniprojects .projectsfilter', '#miniprojects-grid');
  initProjectFilter('#portfolio .projectsfilter', '#portfolio-grid');

  const modal = $('.modal');
  const modalBackdrop = $('.modal-backdrop');
  const modalClose = $('.modal-close');
  const modalImg = $('#modal-img');
  const modalTitle = $('#modal-title');
  const modalDesc = $('#modal-desc');
  const certCards = $$('.cert-card[data-modal]');

  const certData = {
    cert1: {
      title: 'Data Science Bootcamp',
      desc: 'UpGrad • August 2024',
      img: 'images/upgradcertificate.jpg'
    },
    cert2: {
      title: 'AI for All: From Basics to GenAI Practice',
      desc: 'NVIDIA • July 2025',
      img: 'images/nvidiacertificate.jpg'
    },
    cert3: {
      title: 'GenAI Powered Data Analytics Job Simulation',
      desc: 'TATA (Forage) • August 2025',
      img: 'images/tatacertificate.jpg'
    },
    cert4: {
      title: 'Data Science & Analytics Internship',
      desc: 'Future Interns • July 2025',
      img: 'images/futureinternscertificate.jpg'
    },
    cert5: {
      title: 'Data Science & Analytics Internship (with LOR)',
      desc: 'Future Interns • July 2025',
      img: 'images/futureinternscertificate-lor.jpg'
    },
    cert6: {
      title: 'AI & ML Internship Certificate',
      desc: 'Pinnacle Labs • 2025',
      img: 'images/pinnaclecertificates.jpg'
    },
    cert7: {
      title: 'AI & ML Internship Certificate',
      desc: 'Inlighn Global X Pvt Ltd • 2025',
      img: 'images/inlighncertificate.jpg'
    },
    cert8: {
      title: 'Hackathon Certificate',
      desc: 'UpGrad • 2024',
      img: 'images/hackathoncertificate.jpg'
    }
  };

  function openModal(certId) {
    const data = certData[certId];
    if (!data || !modal || !modalImg || !modalTitle || !modalDesc) return;

    modalImg.src = data.img;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    modal.hidden = false;
    void modal.offsetWidth;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    setTimeout(() => {
      modal.hidden = true;
      document.body.style.overflow = '';
    }, 300);
  }

  certCards.forEach(card => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('click', () => {
      openModal(card.dataset.modal);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.modal);
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  const contactForm = $('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span>Sending...</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) {
          throw new Error('Form submission failed');
        }

        submitBtn.innerHTML =
          '<span>Sent!</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
        submitBtn.style.background = 'var(--color-accent-secondary)';
        contactForm.reset();
      } catch (error) {
        submitBtn.innerHTML =
          '<span>Failed — try again</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        submitBtn.style.background = 'var(--color-accent)';
      }

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 4000);
    });
  }

  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = $(href);
      if (!target) return;

      e.preventDefault();

      const offset = nav ? nav.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });

      history.pushState(null, '', href);
    });
  });
})();
