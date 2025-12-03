// --- Utilities ---
const el = s => document.querySelector(s);
const els = s => document.querySelectorAll(s);

// YEAR
el('#year').innerText = new Date().getFullYear();

// TYPING EFFECT
const words = ["Muhammad Fadhli", "Mahasiswa Teknik Mesin", "UI/UX Designer"];
let wi = 0, ci = 0;
function typing() {
    const target = el('#typing');
    const word = words[wi];
    target.textContent = word.slice(0, ci++);
    if (ci > word.length) { ci = 0; wi = (wi + 1) % words.length; setTimeout(typing, 800); return; }
    setTimeout(typing, 110);
}
typing();

// SMOOTH REVEAL ON SCROLL
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('show'); e.target.style.opacity = 1; e.target.style.transform = 'translateY(0)'; obs.unobserve(e.target); }
    });
}, { threshold: 0.15 });
revealEls.forEach(elm => obs.observe(elm));

// PARALLAX PORTRAIT (mouse)
const portrait = el('[data-parallax]');
if (portrait) {
    portrait.addEventListener('mousemove', e => {
        const rect = portrait.getBoundingClientRect();
        const mx = (e.clientX - rect.left) - rect.width / 2;
        const my = (e.clientY - rect.top) - rect.height / 2;
        portrait.querySelector('img').style.transform = `rotateY(${mx / 30}deg) rotateX(${-my / 30}deg) translateZ(6px)`;
    });
    portrait.addEventListener('mouseleave', () => portrait.querySelector('img').style.transform = 'translateZ(0)');
}

// THEME TOGGLE
el('#themeBtn').addEventListener('click', () => {
    document.body.classList.toggle('light');
    el('#themeBtn').textContent = document.body.classList.contains('light') ? '🌤' : '🌙';
});

// MUSIC TOGGLE
let musicOn = false;
const bgm = el('#bgm');
el('#musicBtn').addEventListener('click', () => {
    if (!musicOn) { bgm.play(); el('#musicBtn').textContent = '🔈'; }
    else { bgm.pause(); el('#musicBtn').textContent = '🎵'; }
    musicOn = !musicOn;
});

// CAROUSEL (simple)
let slideIndex = 0;
const slidesContainer = el('.slides');
const slides = els('.slides .slide');
function showSlide(i) {
    const w = slidesContainer.clientWidth;
    slideIndex = (i + slides.length) % slides.length;
    slidesContainer.scrollTo({ left: w * slideIndex, behavior: 'smooth' });
}
el('.cbtn.next').addEventListener('click', () => showSlide(slideIndex + 1));
el('.cbtn.prev').addEventListener('click', () => showSlide(slideIndex - 1));
window.addEventListener('resize', () => showSlide(slideIndex));

// THUMBNAIL MODAL
els('.thumb').forEach(t => {
    t.addEventListener('click', e => {
        const src = e.target.src;
        el('#modalImg').src = src;
        el('#imgModal').classList.add('active');
    });
});
el('#modalClose').addEventListener('click', () => el('#imgModal').classList.remove('active'));
el('#imgModal').addEventListener('click', e => { if (e.target.id === 'imgModal') el('#imgModal').classList.remove('active'); });

// CONTACT FORM (demo)
el('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    alert('Terima kasih! (Form ini demo — belum terhubung ke server)');
    e.target.reset();
});
el('#clearBtn').addEventListener('click', () => el('#contactForm').reset());

// INITIAL REVEAL TRIGGER (so CSS transitions occur)
document.querySelectorAll('.reveal').forEach(r => r.style.opacity = 0);
setTimeout(() => document.querySelectorAll('.reveal').forEach(r => r.style.opacity = 1), 600);
