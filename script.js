(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const body = document.body;
  const progressBar = $(".progress-bar");
  const nav = $(".nav");
  const navToggle = $(".nav-toggle");
  const navMenu = $("#nav-menu");
  const navLinks = $$(".nav-link");
  const sections = $$("section[id]");
  const revealEls = $$("[data-reveal]");
  const countEls = $$("[data-count]");
  const cursorGlow = $(".cursor-glow");
  const certificateCards = $$(".certificate-card");
  const modal = $("#certificate-modal");
  const modalBackdrop = $(".modal__backdrop");
  const modalClose = $(".modal__close");
  const modalImage = $("#modal-image");
  const modalTitle = $("#modal-title");
  const modalDesc = $("#modal-desc");
  const contactForm = $(".contact-form");

  const throttle = (fn, wait = 16) => {
    let isRunning = false;
    return (...args) => {
      if (isRunning) return;
      isRunning = true;
      fn(...args);
      setTimeout(() => {
        isRunning = false;
      }, wait);
    };
  };

  const updateProgress = throttle(() => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });

  const handleNavStyle = throttle(() => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 16);
  });

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  window.addEventListener("scroll", handleNavStyle, { passive: true });
  updateProgress();
  handleNavStyle();

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navMenu.classList.toggle("open");
      body.classList.toggle("menu-open", !isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
      });
    });
  }

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
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  if (countEls.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          if (Number.isNaN(target)) return;

          const duration = 1600;
          const start = performance.now();

          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          observer.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    countEls.forEach((el) => counterObserver.observe(el));
  }

  function initFilters(sectionId, gridId) {
    const section = document.getElementById(sectionId);
    const grid = document.getElementById(gridId);
    if (!section || !grid) return;

    const buttons = $$(".filter-btn", section);
    const cards = $$(".project-card", grid);

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        buttons.forEach((btn) => {
          btn.classList.toggle("filter-btn--active", btn === button);
        });

        cards.forEach((card) => {
          const categories = (card.dataset.category || "").split(" ").filter(Boolean);
          const visible = filter === "all" || categories.includes(filter);
          card.style.display = visible ? "" : "none";
        });
      });
    });
  }

  initFilters("miniprojects", "miniprojects-grid");
  initFilters("portfolio", "portfolio-grid");

  function openModal(image, title, desc) {
    if (!modal || !modalImage || !modalTitle || !modalDesc) return;
    modalImage.src = image;
    modalImage.alt = title;
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

  certificateCards.forEach((card) => {
    card.addEventListener("click", () => {
      openModal(card.dataset.image, card.dataset.title, card.dataset.desc);
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

      const oldText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" }
        });

        if (!response.ok) throw new Error("Form error");

        submitBtn.textContent = "Message Sent";
        contactForm.reset();
      } catch (error) {
        submitBtn.textContent = "Try Again";
      }

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = oldText;
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

  if (cursorGlow && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }
})();
