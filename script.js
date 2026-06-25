document.addEventListener('DOMContentLoaded', () => {
  
  // --- Navigation & Mobile Menu ---
  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');

  // Sticky Header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      nav.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });

  // Active Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });


  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // If it's the stats row, trigger counter
        if (entry.target.classList.contains('stats-row')) {
          runCounters();
        }
        observer.unobserve(entry.target); // Run once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // --- Number Counter Animation ---
  let countersRun = false;
  const counters = document.querySelectorAll('.stat-num');
  const speed = 200; // lower = faster

  function runCounters() {
    if (countersRun) return;
    countersRun = true;

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-count');
      
      const updateCount = () => {
        const current = +counter.innerText;
        const increment = target / speed;

        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target + "+"; // add plus sign at end
        }
      };
      updateCount();
    });
  }


  // --- Portfolio & Project Filtering ---
  function initFilters(containerClass) {
    const container = document.querySelector(containerClass);
    if (!container) return;

    const filterBtns = container.querySelectorAll('.filter-btn');
    const items = container.nextElementSibling.querySelectorAll('.card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from siblings
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        items.forEach(item => {
          const categories = item.getAttribute('data-category').split(' ');
          if (filterValue === 'all' || categories.includes(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => { item.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  initFilters('.miniprojects .filter-controls');
  initFilters('.portfolio .filter-controls');


  // --- Certificate Modal ---
  const certItems = document.querySelectorAll('.cert-item');
  const modal = document.getElementById('certModal');
  const modalClose = document.querySelector('.modal-close');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDate = document.getElementById('modalDate');

  certItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-img');
      const title = item.getAttribute('data-title');
      const date = item.getAttribute('data-date');

      modalImg.src = imgSrc;
      modalTitle.innerText = title;
      modalDate.innerText = date;

      modal.classList.add('active');
      document.body.classList.add('no-scroll');
    });
  });

  function closeCertModal() {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
    setTimeout(() => { modalImg.src = ''; }, 300); // clear img after transition
  }

  modalClose.addEventListener('click', closeCertModal);
  
  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCertModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeCertModal();
    }
  });


  // --- Contact Form Handling ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.querySelector('.form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
          formStatus.className = 'form-status success';
          contactForm.reset();
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! There was a problem sending your message.';
        formStatus.className = 'form-status error';
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Clear status message after 5 seconds
        setTimeout(() => {
          formStatus.innerHTML = '';
          formStatus.className = 'form-status';
        }, 5000);
      }
    });
  }

});
