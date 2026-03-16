// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
    });
});

// ===== Expert Tabs =====
document.querySelectorAll('.expert-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.expert-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.expert-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
    });
});

// ===== Sticky Bar (show after scrolling past hero) =====
const stickyBar = document.getElementById('sticky-bar');
const hero = document.getElementById('hero');
window.addEventListener('scroll', () => {
    if (!hero || !stickyBar) return;
    const heroBottom = hero.getBoundingClientRect().bottom;
    stickyBar.classList.toggle('visible', heroBottom < 0);
}, { passive: true });

// ===== Animated Counter =====
function animateCounter(el, target) {
    const duration = 1500;
    const start = performance.now();
    const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString() + '+';
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            if (target) animateCounter(el, target);
            statObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    statObserver.observe(el);
});

// ===== Quiz Popup =====
const quizOverlay = document.getElementById('quiz-overlay');
const quizClose = document.getElementById('quiz-close');
let quizShown = false;

// Show quiz after 8 seconds
setTimeout(() => {
    if (!quizShown) {
        quizOverlay.classList.add('active');
        quizShown = true;
    }
}, 8000);

quizClose?.addEventListener('click', () => {
    quizOverlay.classList.remove('active');
});

quizOverlay?.addEventListener('click', (e) => {
    if (e.target === quizOverlay) quizOverlay.classList.remove('active');
});

// Quiz step navigation
function goToStep(stepNum) {
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    document.getElementById('quiz-step-' + stepNum)?.classList.add('active');
}

document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => goToStep(2));
});

document.getElementById('quiz-email-submit')?.addEventListener('click', () => goToStep(3));
document.getElementById('quiz-phone-submit')?.addEventListener('click', () => goToStep(4));
document.getElementById('quiz-skip-sms')?.addEventListener('click', () => goToStep(4));
document.getElementById('quiz-apply')?.addEventListener('click', () => {
    quizOverlay.classList.remove('active');
    // Update price to show "discount applied"
    const priceEl = document.querySelector('.price-discount');
    if (priceEl) priceEl.textContent = '✅ DISCOUNT APPLIED';
});

// ===== Scroll fade-in animations =====
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-target');
    fadeObserver.observe(section);
});
