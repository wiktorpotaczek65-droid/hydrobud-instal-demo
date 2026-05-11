// ─────────────────────────────────────────────
// HydroBud Instal — interactive layer
// Tasteful, light, hardware-accelerated only.
// ─────────────────────────────────────────────

// 1. Reveal-on-scroll using IntersectionObserver.
//    No layout thrash, no scroll listeners.
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  }
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

revealEls.forEach((el) => io.observe(el));

// 2. Sticky-nav border state — toggles when user has scrolled past hero edge.
const nav = document.querySelector('[data-nav]');
const stickyObserver = new IntersectionObserver(([entry]) => {
  if (!nav) return;
  if (entry.intersectionRatio < 1) nav.setAttribute('data-stuck', '');
  else nav.removeAttribute('data-stuck');
}, { threshold: [1] });

// sentinel above the nav (1px) to detect when the nav has "stuck"
const sentinel = document.createElement('div');
sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
document.body.prepend(sentinel);
stickyObserver.observe(sentinel);

// 3. Footer year — small detail, but the kind that makes a demo feel real.
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 4. Contact form — optimistic success state. No backend in demo.
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (form && submitBtn) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    submitBtn.dataset.state = 'done';
    submitBtn.disabled = true;

    // After a moment, return to idle so the demo stays explorable.
    window.setTimeout(() => {
      submitBtn.dataset.state = '';
      submitBtn.disabled = false;
      form.reset();
    }, 2600);
  });
}

// 5. Smooth anchor navigation — respects prefers-reduced-motion natively
//    because `scroll-behavior: smooth` is honored by the OS.
//    Adding a tiny offset for the sticky nav.
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#' || id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const navH = nav?.offsetHeight ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - navH + 4;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
