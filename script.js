// Scroll Effect for Navbar
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Translations Object
const translations = {
  fr: {
    home: "Accueil",
    courses: "Cours",
    services: "Services",
    resources: "Ressources",
    about: "À propos"
  },
  ru: {
    home: "Главная",
    courses: "Курсы",
    services: "Услуги",
    resources: "Материалы",
    about: "Обо мне"
  },
  en: {
    home: "Home",
    courses: "Courses",
    services: "Services",
    resources: "Resources",
    about: "About"
  }
};

let currentLang = "fr";

// Change Language Function
function changeLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang];
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.dataset.key;
    if (dict[key]) el.innerHTML = dict[key];
  });
  document.documentElement.lang = lang;
}

// Toggle Mobile Menu
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.hamburger');
  
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
}

// Close menu when clicking on a link (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    if (window.innerWidth <= 768) {
      const navLinks = document.getElementById('navLinks');
      const hamburger = document.querySelector('.hamburger');
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
});

// Close menu when clicking outside (mobile)
document.addEventListener('click', function(event) {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar');
  
  if (window.innerWidth <= 768 && 
      !navbar.contains(event.target) && 
      navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  }
});
// ======================= TESTIMONIALS AUTO SLIDER =======================
let currentIndex = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });
}

// Автоматическое переключение каждые 5 секунд
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showTestimonial(currentIndex);
}, 5000);

// Обработчик клика на точках (если захочешь оставить ручное управление)
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    showTestimonial(index);
  });
});
