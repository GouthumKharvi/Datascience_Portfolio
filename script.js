(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const body = document.body;
  const progressBar = $(".page-progress");
  const nav = $(".nav");
  const navToggle = $(".nav-toggle");
  const navMenu = $("#nav-menu");
  const navLinks = $$(".nav-link");
  const revealEls = $$("[data-reveal]");
  const metricEls = $$(".metric__value[data-count]");
  const certCards = $$(".cert-card");
  const modal = $(".modal");
  const modalBackdrop = $(".modal-backdrop");
  const modalClose = $(".modal-close");
  const modalImg = $("#modal-img");
  const modalTitle = $("#modal-title");
  const modalDesc = $("#modal-desc");
  const contactForm = $(".contact-form");

  const throttle = (fn, delay = 16) => {
    let running = false;
    return (...args) => {
      if (running) return;
      running = true;
      fn(...args);
      setTimeout(() => {
        running = false;
      }, delay);
    };
  };

  const updateProgress = throttle(() => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });

  const updateNav = throttle(() => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 12);
  });

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  window.addEventListener("scroll", updateNav, { passive: true });
  updateProgress();
  updateNav();

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navMenu.classList.toggle("open");
      body.classList.toggle("menu-open", !expanded);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("menu-open");
    });
  });

  const sections = $$("section[id]");
  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        });
      },
      {
        threshold: 0.35
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.45 }
  );

  metricEls.forEach((el) => counterObserver.observe(el));

  function initFilters(sectionId, gridId) {
    const section = document.getElementById(sectionId);
    const grid = document.getElementById(gridId);
    if (!section || !grid) return;

    const buttons = $$(".filterbtn", section);
    const cards = $$(".project-card", grid);

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        buttons.forEach((btn) => {
          btn.classList.toggle("filterbtn--active", btn === button);
        });

        cards.forEach((card) => {
          const categories = (card.dataset.category || "").split(" ");
          const match = filter === "all" || categories.includes(filter);
          card.style.display = match ? "" : "none";
        });
      });
    });
  }

  initFilters("miniprojects", "miniprojects-grid");
  initFilters("portfolio", "portfolio-grid");

  function openModal({ image, title, desc }) {
    if (!modal || !modalImg || !modalTitle || !modalDesc) return;
    modalImg.src = image;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("open"));
    body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    setTimeout(() => {
      modal.hidden = true;
      body.style.overflow = "";
    }, 250);
  }

  certCards.forEach((card) => {
    card.addEventListener("click", () => {
      openModal({
        image: card.dataset.image,
        title: card.dataset.title,
        desc: card.dataset.desc
      });
    });
  });

  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) {
      closeModal();
    }
  });

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = $('button[type="submit"]', contactForm);
      if (!submitBtn) return;

      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) throw new Error("Failed");

        submitBtn.textContent = "Message Sent";
        contactForm.reset();
      } catch (error) {
        submitBtn.textContent = "Try Again";
      }

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 2500);
    });
  }

  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const offset = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: "smooth"
      });

      history.replaceState(null, "", href);
    });
  });
})();
