/*==================== MENU SHOW Y HIDDEN ====================*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
});

sr.reveal(".home__data, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img", { delay: 400 });
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__img", { interval: 200, origin: "bottom" });

/*==================== DATOS DE LAS SEMANAS ====================*/
const weekData = {
  1: {
    description: "Semana 1: Tipos de Arquitecturas de Base de Datos",
    activities: [
      { name: "Manual GitHub Crear", link: "https://docs.google.com/document/d/1YrLeuXYXwSyk3WaJDk4-bIEguGt_l5TsTh6pLkEoBOI/edit?usp=sharing" },
      { name: "Manual Subir Pagina", link: "https://docs.google.com/document/d/1HzCgth-875gBipFhhE35RPr4KT4c_Mn1uEEcPydDEHg/edit?usp=sharing" },
      { name: "Informe Arquitecturas BD", link: "https://docs.google.com/document/d/1kpYIgpnlXJtD19Xy59EpxDEHJqb3K2Yv7NMeHD-YRns/edit?usp=sharing" }
    ]
  },
  2: {
    description: "Semana 2: Gestores de Base de Datos (DBMS)",
    activities: [
      { name: "Modelamiento De Datos", link: "https://www.canva.com/design/DAGyifKcNEk/0stdhsIZiDDtuUotfuojYQ/edit?utm_content=DAGyifKcNEk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" },
      { name: "MManual Instalación de SQL", link: "https://docs.google.com/document/d/1sJHygvnTW_50I7TyTs72UDq05B_wm54iYgrwpXoFnZ8/edit?usp=sharing" }
    ]
  },
  3: {
    description: "Semana 3: Diseño de Arquitectura de Base de Datos",
    activities: [
      { name: "Cuadro comparativo", link: "https://docs.google.com/document/d/11GOAWJwyaYX5we6e0BjvCXQ8CUddYj-a2M_oMmdaWQ4/edit?usp=sharing" },
    ]
  },
  4: {
    description: "Semana 4: Implementación y Evaluación de Arquitectura",
    activities: [
      { name: "Ventajas y desventajas de cliente servidor", link: "https://www.canva.com/design/DAG0kegu1Wo/_-Az6WMa1ghn352EPlIVFQ/edit?utm_content=DAG0kegu1Wo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" }
    ]
  },
  5: {
    description: "Semana 5: Sistemas de Gestión de Base de Datos.",
    activities: [
      { name: "Taller de instalación MySQL", link: "#" },
      { name: "Configuración del entorno de trabajo", link: "#" },
    ],
  },
  6: {
    description: "Semana 6: Almacenamiento eficiente de datos.",
    activities: [
      { name: "Ejercicios Propuestos", link: "https://docs.google.com/document/d/1tgQdgzyYhblDbw6_wz-YlVTbVGIDpN96peyvZ3IFXwE/edit?usp=sharing" },
    ],
  },
  7: {
    description: "Semana 7: Implementación de base de datos relacional.",
    activities: [
      { name: "Proyecto inicial", link: "#" },
      { name: "Normalización de tablas", link: "#" },
    ],
  },
  8: {
    description: "Semana 8: Frameworks CSS para desarrollo web.",
    activities: [
      { name: "Uso de Bootstrap", link: "#" },
      { name: "Práctica: Componentes UI", link: "#" },
    ],
  },
  9: {
    description: "Semana 9: Pruebas de Integridad y consistencia de datos.",
    activities: [
      { name: "Validación de datos", link: "#" },
      { name: "Comprobación de claves foráneas", link: "#" },
      { name: "Análisis de errores comunes", link: "#" },
    ],
  },
  10: {
    description: "Semana 10: Integración con lenguajes de programación.",
    activities: [
      { name: "Conexión Java-MySQL", link: "#" },
      { name: "Proyecto CRUD con interfaz", link: "#" },
    ],
  },
  11: {
    description: "Semana 11: Optimización de consultas SQL.",
    activities: [
      { name: "Uso de EXPLAIN", link: "#" },
      { name: "Índices y rendimiento", link: "#" },
      { name: "Comparativa de tiempos", link: "#" },
    ],
  },
  12: {
    description: "Semana 12: Seguridad en bases de datos.",
    activities: [
      { name: "Roles y permisos", link: "#" },
      { name: "Backup y recuperación", link: "#" },
    ],
  },
  13: {
    description: "Semana 13: Proyecto Final - Parte 1.",
    activities: [
      { name: "Diseño de la base de datos final", link: "#" },
      { name: "Documentación técnica", link: "#" },
    ],
  },
  14: {
    description: "Semana 14: Proyecto Final - Parte 2.",
    activities: [
      { name: "Implementación del sistema", link: "#" },
      { name: "Corrección de errores", link: "#" },
    ],
  },
  15: {
    description: "Semana 15: Presentación del Proyecto Final.",
    activities: [
      { name: "Exposición grupal", link: "#" },
      { name: "Entrega del informe final", link: "#" },
    ],
  },
  16: {
    description: "Semana 16: Cierre del curso y retroalimentación.",
    activities: [
      { name: "Evaluación del curso", link: "#" },
      { name: "Autoevaluación del estudiante", link: "#" },
    ],
  },
};

/*==================== GENERAR LAS SEMANAS ====================*/
const weeksGrid = document.getElementById("weeksGrid");

for (let i = 1; i <= 16; i++) {
  const card = document.createElement("div");
  card.classList.add("week-card");
  card.onclick = () => openModal(i);
  card.innerHTML = `
    <div class="week-img-container">
      <img src="s1.png" alt="Semana ${i}" class="week-img">
    </div>
    <div class="week-info"><p>Semana ${i}</p></div>`;
  weeksGrid.appendChild(card);
}

/*==================== MODAL SEMANAS ====================*/
function openModal(week) {
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalLinks = document.getElementById("modalLinks");
  const weekInfo = weekData[week];

  modalTitle.textContent = "Semana " + week;
  modalDescription.textContent = weekInfo.description;
  modalLinks.innerHTML = "";

  weekInfo.activities.forEach((a) => {
    const link = document.createElement("a");
    link.href = a.link;
    link.target = "_blank";
    link.textContent = a.name;
    link.classList.add("button");
    modalLinks.appendChild(link);
  });

  document.getElementById("weekModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("weekModal").style.display = "none";
}

window.onclick = (event) => {
  if (event.target.id === "weekModal") {
    closeModal();
  }
};

/*==================== MODAL MIS DATOS ====================*/
const misDatosBtn = document.getElementById("misDatosBtn");
const misDatosModal = document.getElementById("misDatosModal");
const closeDatos = document.getElementById("closeDatos");

misDatosBtn.addEventListener("click", () => {
  misDatosModal.style.display = "flex";
});

closeDatos.addEventListener("click", () => {
  misDatosModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === misDatosModal) {
    misDatosModal.style.display = "none";
  }
});
