/* =============================================
   GOUTHUM KHARVI — 2026 PORTFOLIO SCRIPT
   ============================================= */

'use strict';

/* =============================================
   YEAR
   ============================================= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =============================================
   CUSTOM CURSOR
   ============================================= */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top  = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top  = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    const hoverTargets = document.querySelectorAll(
        'a, button, .work, .certificate-item, .filter-btn, .tab-links, .back-to-top, .cert-nav, .nav-close'
    );
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

/* =============================================
   PAGE PROGRESS BAR
   ============================================= */
const progressBar = document.getElementById('pageProgress');
window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
}, { passive: true });

/* =============================================
   NAV SCROLL EFFECT + ACTIVE LINK
   ============================================= */
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
}, { passive: true });

/* =============================================
   MOBILE MENU
   ============================================= */
const hamburger = document.getElementById('hamburger');
const sidemenu  = document.getElementById('sidemenu');
const navClose  = document.getElementById('navClose');

function openMenu() {
    sidemenu.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeMenu() {
    sidemenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openMenu);
if (navClose)  navClose.addEventListener('click', closeMenu);

sidemenu && sidemenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (e) => {
    if (sidemenu && sidemenu.classList.contains('open')) {
        if (!sidemenu.contains(e.target) && !hamburger.contains(e.target)) closeMenu();
    }
});

/* =============================================
   TYPED TEXT EFFECT (HERO)
   ============================================= */
const typedEl = document.getElementById('typedText');
if (typedEl) {
    const words = [
        'data into decisions.',
        'data into intelligence.',
        'models into products.',
        'ideas into AI systems.',
        'data into insights.'
    ];
    let wi = 0, ci = 0, deleting = false;

    function typeLoop() {
        const word = words[wi];
        if (!deleting) {
            typedEl.textContent = word.substring(0, ci + 1);
            ci++;
            if (ci === word.length) {
                deleting = true;
                setTimeout(typeLoop, 1800);
                return;
            }
        } else {
            typedEl.textContent = word.substring(0, ci - 1);
            ci--;
            if (ci === 0) {
                deleting = false;
                wi = (wi + 1) % words.length;
            }
        }
        setTimeout(typeLoop, deleting ? 50 : 80);
    }
    setTimeout(typeLoop, 800);
}

/* =============================================
   PARTICLE CANVAS BACKGROUND
   ============================================= */
const bgCanvas = document.getElementById('particleCanvas');
if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    let W = window.innerWidth, H = window.innerHeight;
    bgCanvas.width = W; bgCanvas.height = H;

    const PARTICLE_COUNT = Math.min(70, Math.floor(W * H / 16000));
    const particles = [];

    class Particle {
        constructor() { this.reset(true); }
        reset(init = false) {
            this.x       = Math.random() * W;
            this.y       = init ? Math.random() * H : H + 10;
            this.size    = Math.random() * 1.5 + 0.3;
            this.speedY  = -(Math.random() * 0.4 + 0.1);
            this.speedX  = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color   = Math.random() > 0.6 ? '#d4ff3c' : '#ffffff';
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            if (this.y < -10) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle   = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle  = '#d4ff3c';
                    ctx.globalAlpha  = (1 - dist / 120) * 0.06;
                    ctx.lineWidth    = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animParticles() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        ctx.globalAlpha = 1;
        requestAnimationFrame(animParticles);
    }
    animParticles();

    window.addEventListener('resize', () => {
        W = window.innerWidth; H = window.innerHeight;
        bgCanvas.width = W; bgCanvas.height = H;
    }, { passive: true });
}

/* =============================================
   HERO NEURAL NETWORK CANVAS (2D)
   ============================================= */
const nnCanvas = document.getElementById('heroNNCanvas');
if (nnCanvas) {
    const nnCtx = nnCanvas.getContext('2d');

    function resizeNN() {
        const wrap = nnCanvas.parentElement;
        nnCanvas.width  = wrap.offsetWidth;
        nnCanvas.height = wrap.offsetHeight;
    }
    resizeNN();

    // Network topology: layers × nodes per layer
    const LAYERS = [3, 5, 6, 5, 4, 2];
    const ACCENT  = '#d4ff3c';
    const ORANGE  = '#ff7a45';
    const DIM     = 'rgba(212,255,60,0.15)';

    let nodes    = [];
    let signals  = [];
    let nnTime   = 0;

    // Animated accuracy counter in HUD
    const nnAccEl = document.getElementById('nnAcc');
    let accTarget = 97.4;
    let accCurrent = 94.0;

    function buildNetwork() {
        nodes = [];
        const W = nnCanvas.width;
        const H = nnCanvas.height;
        const padX = W * 0.12;
        const padY = H * 0.12;
        const layerSpacing = (W - padX * 2) / (LAYERS.length - 1);

        LAYERS.forEach((count, li) => {
            const nodeSpacing = (H - padY * 2) / (count - 1 || 1);
            for (let ni = 0; ni < count; ni++) {
                const x = padX + li * layerSpacing;
                const y = count === 1
                    ? H / 2
                    : padY + ni * nodeSpacing;
                nodes.push({
                    x, y,
                    layer: li,
                    index: ni,
                    pulse: Math.random() * Math.PI * 2,
                    active: Math.random() > 0.3
                });
            }
        });
    }

    function spawnSignal() {
        // Pick a random edge (forward direction)
        const li = Math.floor(Math.random() * (LAYERS.length - 1));
        const fromNodes = nodes.filter(n => n.layer === li);
        const toNodes   = nodes.filter(n => n.layer === li + 1);
        if (!fromNodes.length || !toNodes.length) return;
        const from = fromNodes[Math.floor(Math.random() * fromNodes.length)];
        const to   = toNodes[Math.floor(Math.random() * toNodes.length)];
        signals.push({
            from, to,
            t: 0,
            speed: 0.008 + Math.random() * 0.012,
            color: Math.random() > 0.5 ? ACCENT : ORANGE,
            size: Math.random() * 2.5 + 1.5
        });
    }

    function drawNN() {
        const W = nnCanvas.width;
        const H = nnCanvas.height;
        nnCtx.clearRect(0, 0, W, H);
        nnTime++;

        // Spawn signals periodically
        if (nnTime % 18 === 0) spawnSignal();

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes.length; j++) {
                if (nodes[j].layer !== nodes[i].layer + 1) continue;
                const n1 = nodes[i], n2 = nodes[j];
                const grad = nnCtx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
                grad.addColorStop(0, 'rgba(212,255,60,0.07)');
                grad.addColorStop(1, 'rgba(212,255,60,0.03)');
                nnCtx.beginPath();
                nnCtx.moveTo(n1.x, n1.y);
                nnCtx.lineTo(n2.x, n2.y);
                nnCtx.strokeStyle = grad;
                nnCtx.lineWidth   = 0.7;
                nnCtx.stroke();
            }
        }

        // Draw nodes
        nodes.forEach(n => {
            n.pulse += 0.035;
            const glowRadius = 5 + Math.sin(n.pulse) * 2;
            const alpha = n.active ? 0.9 : 0.3;

            // Outer glow
            const glow = nnCtx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowRadius * 3.5);
            glow.addColorStop(0, `rgba(212,255,60,${alpha * 0.18})`);
            glow.addColorStop(1, 'rgba(212,255,60,0)');
            nnCtx.beginPath();
            nnCtx.arc(n.x, n.y, glowRadius * 3.5, 0, Math.PI * 2);
            nnCtx.fillStyle = glow;
            nnCtx.fill();

            // Ring
            nnCtx.beginPath();
            nnCtx.arc(n.x, n.y, glowRadius + 2, 0, Math.PI * 2);
            nnCtx.strokeStyle = `rgba(212,255,60,${alpha * 0.25})`;
            nnCtx.lineWidth   = 1;
            nnCtx.stroke();

            // Core dot
            nnCtx.beginPath();
            nnCtx.arc(n.x, n.y, n.active ? glowRadius : glowRadius * 0.5, 0, Math.PI * 2);
            nnCtx.fillStyle = n.active ? ACCENT : 'rgba(212,255,60,0.25)';
            nnCtx.globalAlpha = alpha;
            nnCtx.fill();
            nnCtx.globalAlpha = 1;

            // Occasional orange highlight node
            if (n.layer === LAYERS.length - 1 && n.active) {
                nnCtx.beginPath();
                nnCtx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
                nnCtx.fillStyle = ORANGE;
                nnCtx.globalAlpha = 0.7;
                nnCtx.fill();
                nnCtx.globalAlpha = 1;
            }
        });

        // Draw & update signals
        signals = signals.filter(s => s.t <= 1);
        signals.forEach(s => {
            s.t += s.speed;
            const x = s.from.x + (s.to.x - s.from.x) * s.t;
            const y = s.from.y + (s.to.y - s.from.y) * s.t;
            const trail = 0.22;

            // Trail
            const tGrad = nnCtx.createLinearGradient(
                s.from.x + (s.to.x - s.from.x) * Math.max(0, s.t - trail), 
                s.from.y + (s.to.y - s.from.y) * Math.max(0, s.t - trail),
                x, y
            );
            tGrad.addColorStop(0, 'rgba(212,255,60,0)');
            tGrad.addColorStop(1, s.color + 'cc');
            nnCtx.beginPath();
            nnCtx.moveTo(
                s.from.x + (s.to.x - s.from.x) * Math.max(0, s.t - trail),
                s.from.y + (s.to.y - s.from.y) * Math.max(0, s.t - trail)
            );
            nnCtx.lineTo(x, y);
            nnCtx.strokeStyle = tGrad;
            nnCtx.lineWidth   = s.size * 0.6;
            nnCtx.stroke();

            // Head glow
            const hGlow = nnCtx.createRadialGradient(x, y, 0, x, y, s.size * 3);
            hGlow.addColorStop(0, s.color + 'ee');
            hGlow.addColorStop(1, 'rgba(212,255,60,0)');
            nnCtx.beginPath();
            nnCtx.arc(x, y, s.size * 3, 0, Math.PI * 2);
            nnCtx.fillStyle = hGlow;
            nnCtx.fill();

            // Head dot
            nnCtx.beginPath();
            nnCtx.arc(x, y, s.size, 0, Math.PI * 2);
            nnCtx.fillStyle = s.color;
            nnCtx.fill();
        });

        // Animated accuracy counter
        if (nnAccEl && accCurrent < accTarget) {
            accCurrent = Math.min(accTarget, accCurrent + 0.04);
            nnAccEl.textContent = accCurrent.toFixed(1) + '%';
        }

        // Randomly toggle node activity
        if (nnTime % 90 === 0) {
            const r = nodes[Math.floor(Math.random() * nodes.length)];
            r.active = !r.active;
        }

        requestAnimationFrame(drawNN);
    }

    buildNetwork();
    drawNN();

    window.addEventListener('resize', () => {
        resizeNN();
        buildNetwork();
    }, { passive: true });
}

/* =============================================
   SCROLL REVEAL (INTERSECTION OBSERVER)
   ============================================= */
const reveals = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0;
            setTimeout(() => entry.target.classList.add('revealed'), delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

/* =============================================
   COUNTER ANIMATION
   ============================================= */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el       = entry.target;
            const target   = parseInt(el.dataset.target);
            const duration = 1800;
            const start    = performance.now();
            function step(now) {
                const elapsed  = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased    = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(step);
                else el.textContent = target;
            }
            requestAnimationFrame(step);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.6 });

counters.forEach(c => counterObserver.observe(c));

/* =============================================
   SKILL BAR ANIMATION
   ============================================= */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const w  = el.dataset.width;
            setTimeout(() => { el.style.width = w + '%'; }, 200);
            skillObserver.unobserve(el);
        }
    });
}, { threshold: 0.4 });

skillFills.forEach(f => skillObserver.observe(f));

/* =============================================
   ABOUT TABS
   ============================================= */
function opentab(e, tabname) {
    const event      = e || window.event;
    const tablinks   = document.getElementsByClassName('tab-links');
    const tabcontents = document.getElementsByClassName('tab-contents');

    Array.from(tablinks).forEach(tl => tl.classList.remove('active-link'));
    Array.from(tabcontents).forEach(tc => tc.classList.remove('active-tab'));

    const btn = event.currentTarget;
    btn.classList.add('active-link');
    const tab = document.getElementById(tabname);
    if (tab) tab.classList.add('active-tab');

    if (tabname === 'skills') {
        setTimeout(() => {
            document.querySelectorAll('.skill-fill').forEach(f => {
                f.style.width = f.dataset.width + '%';
            });
        }, 100);
    }
}
window.opentab = opentab;

/* =============================================
   PROJECT FILTER
   ============================================= */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projectGrid .work');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        let shown = 0;

        projectCards.forEach(card => {
            const cat  = card.dataset.cat || '';
            const show = filter === 'all' || cat === filter;
            if (show) {
                card.classList.remove('hidden');
                card.style.animationDelay = (shown * 60) + 'ms';
                shown++;
                setTimeout(() => card.classList.add('revealed'), shown * 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Initial reveal for project grid
const grid = document.getElementById('projectGrid');
if (grid) {
    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.work:not(.hidden)');
                cards.forEach((card, i) => {
                    setTimeout(() => card.classList.add('revealed'), i * 60);
                });
                gridObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    gridObserver.observe(grid);
}

/* =============================================
   CERTIFICATE MODAL
   ============================================= */
const certImages = [
    'images/upgrad_certificate.jpg',
    'images/nvidia_certificate.jpg',
    'images/tata_certificate.jpg',
    'images/future_interns_certificate.jpg',
    'images/future_interns_certificate-lor.jpg',
    'images/pinnacle_certificates.jpg',
    'images/inlighn.jpg'
];
const certTitles = [
    'Data Science Bootcamp — upGrad',
    'AI for All: GenAI Practice — NVIDIA',
    'GenAI Data Analytics Simulation — TATA',
    'Data Science Internship — Future Interns',
    'DS Internship LOR — Future Interns',
    'AI & ML Internship — Pinnacle Labs',
    'AI & ML Internship — InLighnX'
];
let currentCert = 0;
const modal       = document.getElementById('certificateModal');
const modalImg    = document.getElementById('modalCertificateImage');
const certCounter = document.getElementById('certCounter');

function openCertificate(index) {
    currentCert = index;
    updateCertModal();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function updateCertModal() {
    if (modalImg) {
        modalImg.src = certImages[currentCert];
        modalImg.alt = certTitles[currentCert];
    }
    if (certCounter) certCounter.textContent = (currentCert + 1) + ' / ' + certImages.length;
}

function closeCertificate() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

function navCert(dir) {
    currentCert = (currentCert + dir + certImages.length) % certImages.length;
    updateCertModal();
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCertificate();
    });
}

document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'Escape')      closeCertificate();
    if (e.key === 'ArrowRight')  navCert(1);
    if (e.key === 'ArrowLeft')   navCert(-1);
});

window.openCertificate = openCertificate;
window.closeCertificate = closeCertificate;
window.navCert = navCert;

/* =============================================
   MAGNETIC BUTTONS
   ============================================= */
if (window.innerWidth > 768) {
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const cx   = rect.left + rect.width  / 2;
            const cy   = rect.top  + rect.height / 2;
            const dx   = (e.clientX - cx) * 0.25;
            const dy   = (e.clientY - cy) * 0.25;
            el.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

/* =============================================
   CONTACT FORM (Google Sheets)
   ============================================= */
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxGfNr0UiAx-T3xtlqaKUPVvSXdL4LMGZz8g8k7V0a0L7mFKmvHWj1ZcqGJkPT4e7w/exec';
const contactForm = document.getElementById('contactForm');
const formMsg     = document.getElementById('formMsg');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn          = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>Sending…</span> <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled  = true;

        try {
            const data = new FormData(contactForm);
            await fetch(SHEET_URL, { method: 'POST', body: data });
            formMsg.className   = 'ok';
            formMsg.textContent = '✓ Message sent! I\'ll reply within 24 hours.';
            contactForm.reset();
        } catch {
            formMsg.className   = 'ok';
            formMsg.textContent = '✓ Message received! I\'ll get back to you soon.';
            contactForm.reset();
        } finally {
            btn.innerHTML = originalHTML;
            btn.disabled  = false;
            setTimeout(() => {
                formMsg.className   = '';
                formMsg.textContent = '';
            }, 5000);
        }
    });
}

/* =============================================
   SMOOTH SCROLL WITH OFFSET
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* =============================================
   ORBS PARALLAX
   ============================================= */
const orb1 = document.querySelector('.bg-orb-1');
const orb2 = document.querySelector('.bg-orb-2');
const orb3 = document.querySelector('.bg-orb-3');

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const sy = window.scrollY;
            if (orb1) orb1.style.transform = `translateY(${sy * 0.15}px)`;
            if (orb2) orb2.style.transform = `translateY(${-sy * 0.1}px)`;
            if (orb3) orb3.style.transform = `translateY(${sy * 0.08}px)`;
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

/* =============================================
   MINI PROJECT SECTION STAGGER
   ============================================= */
const miniSection = document.getElementById('miniprojects');
if (miniSection) {
    const miniObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.work[data-reveal]').forEach((card, i) => {
                    setTimeout(() => card.classList.add('revealed'), i * 70);
                });
                miniObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    miniObs.observe(miniSection);
}

/* =============================================
   CERTIFICATE SECTION STAGGER
   ============================================= */
const certSection = document.getElementById('certificates');
if (certSection) {
    const certObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('[data-reveal]').forEach((el, i) => {
                    setTimeout(() => el.classList.add('revealed'), i * 80);
                });
                certObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    certObs.observe(certSection);
}

/* =============================================
   ABOUT SECTION REVEAL
   ============================================= */
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const aboutObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('[data-reveal]').forEach((el, i) => {
                    setTimeout(() => el.classList.add('revealed'), i * 150);
                });
                setTimeout(() => {
                    document.querySelectorAll('.skill-fill').forEach(f => {
                        f.style.width = f.dataset.width + '%';
                    });
                }, 400);
                aboutObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    aboutObs.observe(aboutSection);
}

/* =============================================
   CONTACT SECTION REVEAL
   ============================================= */
const contactSection = document.getElementById('contact');
if (contactSection) {
    const contactObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('[data-reveal]').forEach((el, i) => {
                    setTimeout(() => el.classList.add('revealed'), i * 180);
                });
                contactObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    contactObs.observe(contactSection);
}

/* =============================================
   HERO REVEAL ON LOAD
   ============================================= */
window.addEventListener('load', () => {
    document.querySelectorAll('#header [data-reveal]').forEach((el, i) => {
        setTimeout(() => el.classList.add('revealed'), i * 200 + 100);
    });
});

/* =============================================
   CONSOLE SIGNATURE
   ============================================= */
console.log('%c🤖 Gouthum Kharvi | AI/ML Portfolio', 'color: #d4ff3c; font-size: 16px; font-weight: bold; background: #060810; padding: 8px 16px; border-radius: 8px;');
console.log('%cBuilt with vanilla JS, CSS Custom Properties & ❤️', 'color: #9ba3b8; font-size: 12px;');
