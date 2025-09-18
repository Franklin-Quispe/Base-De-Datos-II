// ==========================
// 📌 MENÚ RESPONSIVE
// ==========================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Cerrar menú al hacer click en enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// ==========================
// 📌 TEXTO DINÁMICO HERO
// ==========================
const phrases = [
  "Estudiante de Ingeniería",
  "Estudiante de la Universidad Peruana Los Andes",
  "BASE DE DATOS II"
];
let i = 0;
let text = document.getElementById("dynamic-text");

setInterval(() => {
  text.classList.remove("fade-in");
  void text.offsetWidth; // reinicia la animación
  text.innerHTML = phrases[i];
  text.classList.add("fade-in");
  i = (i + 1) % phrases.length;
}, 2500);

// ==========================
// 📌 EFECTO FORMULARIO
// ==========================
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("✅ Gracias por contactarme, te responderé pronto.");
  e.target.reset();
});

// ==========================
// 📌 NAVBAR OCULTA AL BAJAR Y APARECE AL SUBIR
// ==========================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scroll hacia abajo → ocultar
    navbar.classList.add('hide');
  } else {
    // Scroll hacia arriba → mostrar
    navbar.classList.remove('hide');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==========================
// 📌 EFECTO PARALLAX EN LAS TARJETAS
// ==========================
document.querySelectorAll(".week-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    let x = (e.offsetX / card.offsetWidth - 0.5) * 20; 
    let y = (e.offsetY / card.offsetHeight - 0.5) * 20;
    card.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.backgroundPosition = "center";
  });
});

// ==========================
// 📌 ANIMACIONES AL HACER SCROLL (Intersection Observer)
// ==========================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll("section, .week-card").forEach(el => observer.observe(el));
