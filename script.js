/* ================== particles background ================== */
(() => {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;

  window.addEventListener('resize', () => { w = canvas.width = innerWidth; h = canvas.height = innerHeight; });

  function rand(min, max){ return Math.random()*(max-min)+min; }

  class Particle {
    constructor(){
      this.x = rand(0,w);
      this.y = rand(0,h);
      this.vx = rand(-0.3,0.3);
      this.vy = rand(-0.3,0.3);
      this.size = rand(0.6,2.2);
      this.alpha = rand(0.05,0.25);
    }
    move(){
      this.x += this.vx;
      this.y += this.vy;
      if(this.x < 0) this.x = w;
      if(this.x > w) this.x = 0;
      if(this.y < 0) this.y = h;
      if(this.y > h) this.y = 0;
    }
    draw(){
      ctx.beginPath();
      ctx.fillStyle = `rgba(0,188,212,${this.alpha})`;
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.fill();
    }
  }

  function initParticles(){
    particles = [];
    const count = Math.min(120, Math.floor(w*h/8000));
    for(let i=0;i<count;i++) particles.push(new Particle());
  }

  function anim(){
    ctx.clearRect(0,0,w,h);
    for(let p of particles){ p.move(); p.draw(); }
    requestAnimationFrame(anim);
  }

  initParticles();
  anim();
})();

/* ================== smooth reveal on scroll (IntersectionObserver) ================== */
(() => {
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in-view'); e.target.style.opacity=1; e.target.style.transform='translateY(0)'; obs.unobserve(e.target);}
    });
  },{threshold:0.15});

  document.querySelectorAll('.section-fade').forEach(el=>{
    el.style.opacity = 0;
    el.style.transform = 'translateY(18px)';
    obs.observe(el);
  });
})();

/* ================== Data & DOM generation (cards + modal) ================== */
const proyectosData = [
  { 
    id:1, 
    unidad:1, 
    semana:"Semana 1", 
    tareas:["Manual Crear Cuenta GitHub","Manual de Subir Pagina","Informe Arquitecturas BD"], 
    competencias:"Modelado básico", 
    descripcion:"Arquitectura y modelado", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%201", 
    extras:["https://docs.google.com/document/d/1YrLeuXYXwSyk3WaJDk4-bIEguGt_l5TsTh6pLkEoBOI/edit?tab=t.0", "https://docs.google.com/document/d/1HzCgth-875gBipFhhE35RPr4KT4c_Mn1uEEcPydDEHg/edit?tab=t.0", "https://docs.google.com/document/d/1kpYIgpnlXJtD19Xy59EpxDEHJqb3K2Yv7NMeHD-YRns/edit?tab=t.0"]
  },
  { 
    id:2, 
    unidad:1, 
    semana:"Semana 2", 
    tareas:["Modelado lógico","Manual De Instalacion Sql-Server"], 
    competencias:"Modelado lógico", 
    descripcion:"Modelado lógico de datos", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%202", 
    extras:["https://www.canva.com/design/DAGyifKcNEk/0stdhsIZiDDtuUotfuojYQ/edit?utm_content=DAGyifKcNEk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton", "https://docs.google.com/document/d/1sJHygvnTW_50I7TyTs72UDq05B_wm54iYgrwpXoFnZ8/edit?tab=t.0"]
  },
  { 
    id:3, 
    unidad:1, 
    semana:"Semana 3", 
    tareas:["Cuadro Comparativo"], 
    competencias:"Normalización", 
    descripcion:"Normalización de bases", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%203", 
    extras:["https://docs.google.com/document/d/11GOAWJwyaYX5we6e0BjvCXQ8CUddYj-a2M_oMmdaWQ4/edit?tab=t.0"]
  },
  { 
    id:4, 
    unidad:1, 
    semana:"Semana 4", 
    tareas:["Arquitecturas De Base De Datos Y Su Aplacidad Tecnologica "], 
    competencias:"Implementación", 
    descripcion:"Implementación en MySQL", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%204", 
    extras:["https://www.canva.com/design/DAG0kegu1Wo/_-Az6WMa1ghn352EPlIVFQ/edit"]
  },
  { 
    id:5, 
    unidad:2, 
    semana:"Semana 5", 
    tareas:["SELECT básicos","Filtros","Entrega"], 
    competencias:"SELECT básico", 
    descripcion:"Consultas básicas", 
    img:"assets/tarea.jpg", 
    github:"", 
    extras:[]
  },
  { 
    id:6, 
    unidad:2, 
    semana:"Semana 6", 
    tareas:["Ejercicios Propuestos 06"], 
    competencias:"Funciones agregadas", 
    descripcion:"Funciones agregadas y GROUP BY", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%206", 
    extras:["https://docs.google.com/document/d/1tgQdgzyYhblDbw6_wz-YlVTbVGIDpN96peyvZ3IFXwE/edit?tab=t.0"]
  },
  { 
    id:7, 
    unidad:2, 
    semana:"Semana 7", 
    tareas:["Actividad 07-Consultas"], 
    competencias:"Joins y subconsultas", 
    descripcion:"Joins y Subconsultas", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%207", 
    extras:["https://docs.google.com/document/d/1JflgIPD07TS-iEP0Y7loUHEznnmGShTodTGBtygGbQ0/edit?tab=t.0"]
  },
  { 
    id:8, 
    unidad:2, 
    semana:"Semana 8", 
    tareas:["Manual Crear Cuenta Azure","Manual Crear BD QHatuPERU","Manual de Crear Tablas","Manual de Insertar Datos", "Manual de Crear Diagramas"], 
    competencias:"Optimización", 
    descripcion:"Optimización de consultas", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%208", 
    extras:["https://docs.google.com/document/d/155ZyoojPgqpOokXchpWZ5hD0MteINvymSmpfhlSpN4c/edit?usp=sharing","https://docs.google.com/document/d/1DgxzRECVSbB1yKz_gUpSmHW3WMCq23iA-CRZl36Tyk0/edit?tab=t.0",
      "https://docs.google.com/document/d/1QLG-9Mak-snW2WAyr-IdH9EsimX_Xvv5qp4Ax9kwOcg/edit?tab=t.0","https://docs.google.com/document/d/1edioIoNgz-Wx8YG08H1osGC-he0tFrEWgtSJT-yopCU/edit?tab=t.0",
      "https://docs.google.com/document/d/1EbnnNLrV6F77O02pJxd5ExEenddfvF-eHKrDNFXN798/edit?tab=t.0"
    ]
  },
  { 
    id:9, 
    unidad:3, 
    semana:"Semana 9", 
    tareas:["Ejercicios Propuestos Semana 9"], 
    competencias:"Funciones", 
    descripcion:"Control de transacciones", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%209", 
    extras:["https://docs.google.com/document/d/1TQvAS6ozvXrPgfqvC5mSHzXP1sKTLIkl4gIIPc_FprY/edit?usp=sharing"]
  },
  { 
    id:10, 
    unidad:3, 
    semana:"Semana10", 
    tareas:["Administracion esencial con la base de datos","Practica 10"], 
    competencias:"Seguridad", 
    descripcion:"Seguridad y privilegios", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%2010", 
    extras:["https://docs.google.com/document/d/1nvgf9nRvG7kvi8cYPBcwPnpKn00xuJi3uPkPoYlL9xE/edit?usp=sharing","https://docs.google.com/document/d/1FhFQuZ0lRqPiHALiCse9clgTZRgXxYp039Kb5ocPdvQ/edit?usp=sharing"]
  },
  { 
    id:11, 
    unidad:3, 
    semana:"Semana11", 
    tareas:["Seguridad y control de acceso","Práctica"], 
    competencias:"Respaldos", 
    descripcion:"Backups y recuperación", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%2011", 
    extras:["https://docs.google.com/document/d/1n-DESo9vgLfq2DvPl5ffsy9Z60srs938m_N2aav3KLU/edit?usp=sharing","https://docs.google.com/document/d/1NpFrAat6qoot2ZtkiqtM7U7wLIIyntYG8qieKueB-pQ/edit?usp=sharing"]
  },
  { 
    id:12, 
    unidad:3, 
    semana:"Semana12", 
    tareas:["Respaldo y Recuperación","Practica semana 12"], 
    competencias:"Auditoría", 
    descripcion:"Auditoría y seguridad avanzada", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%2012", 
    extras:["https://docs.google.com/document/d/1xzC-Dx6Gvm8cyR_t3Vyjr-Pi5fOfwQ3J_aMJIwZxmUE/edit?usp=sharing","https://docs.google.com/document/d/1WKS_71-OjuNkXqG_rAH0jMvViFDIwIY0nIFizCcVmEg/edit?usp=sharing"]
  },
  { 
    id:13, 
    unidad:4, 
    semana:"Semana13", 
    tareas:["Monitoreo y rendimiento","Practica 13"], 
    competencias:"Analizar datos", 
    descripcion:"Introducción al análisis", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%2013", 
    extras:["https://docs.google.com/document/d/1R8BevbRf7Iako76ndY2_9THkY2FKRrh-nKMtZjNfRTU/edit?usp=sharing","https://docs.google.com/document/d/1lXXi-2J5myE0GqTxhXo8z8TqN--yO-P7sj8jC3PmQQo/edit?usp=sharing"]
  },
  { 
    id:14, 
    unidad:4, 
    semana:"Semana14", 
    tareas:["Automatización y mantenimiento","Practica 14"], 
    competencias:"Visualización", 
    descripcion:"Herramientas de visualización", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%2014", 
    extras:["https://docs.google.com/document/d/1RPuBUT0wU508dGP05b10ogysYfGNuWJ5ENsUpkS28Go/edit?usp=sharing","https://docs.google.com/document/d/1R01zYFKTFbxYofWHbngAqKo9kEd8ZNPWbbQYxeeDuVk/edit?usp=sharing"]
  },
  { 
    id:15, 
    unidad:4, 
    semana:"Semana15", 
    tareas:["Semana 15: SQL Server en la nube (Azure y entornos híbridos)"], 
    competencias:"Documentar", 
    descripcion:"Documentación del proyecto", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%2015", 
    extras:["https://docs.google.com/document/d/1weIxdztqXMZabvxikLr_3gjorEUEzAvlhbT6nlLBE-0/edit?usp=sharing"]
  },
  { 
    id:16, 
    unidad:4, 
    semana:"Semana16", 
    tareas:["Semana 16: Alta disponibilidad y recuperación ante desastres (HA/DR)"], 
    competencias:"Comunicar resultados", 
    descripcion:"Presentación final", 
    img:"assets/tarea.jpg", 
    github:"https://github.com/Franklin-Quispe/Base-De-Datos-II/tree/main/Semana%2016", 
    extras:["https://docs.google.com/document/d/1cdrUAxiK3-k5_cpbZexFa5PEfX8kBwsRDFbfP5s0K6g/edit?usp=sharing"]
  }
];

/* ================== Modal generation ================== */
function openModal(proyecto) {
  document.querySelector("#modal-title").textContent = proyecto.semana;
  document.querySelector("#modal-descripcion").textContent = proyecto.descripcion;
  document.querySelector("#modal-img").src = proyecto.img;
  document.querySelector("#modal-github").href = proyecto.github;

  // Lista de tareas
  const tareasContainer = document.querySelector("#modal-tareas");
  tareasContainer.innerHTML = proyecto.tareas.map(t => `<li>${t}</li>`).join("");

  // Enlaces adicionales (cada uno distinto)
  const extrasContainer = document.querySelector("#modal-extras");
  if (proyecto.extras && proyecto.extras.length > 0) {
    extrasContainer.innerHTML = proyecto.extras
      .map((link, i) => `<a href="${link}" target="_blank" class="btn-extra">📄 Ver trabajo ${i + 1}</a>`)
      .join("");
  } else {
    extrasContainer.innerHTML = `<p class="muted">No hay enlaces adicionales</p>`;
  }
}

function generarTarjetas(){
  const mapUnidad = {1:'unidad1',2:'unidad2',3:'unidad3',4:'unidad4'};
  proyectosData.forEach(p=>{
    const el = document.createElement('div');
    el.className = 'card-tarjeta';
    el.innerHTML = `
      <img class="card-thumb" src="${p.img}" alt="${p.semana}">
      <div class="card-body">
        <h4>${p.semana}</h4>
        <p>${p.descripcion}</p>
        <div class="card-actions">
          <button class="btn primary" data-id="${p.id}">Detalles</button>
          <a class="btn ghost" href="${p.github}" target="_blank">GitHub</a>
        </div>
      </div>`;
    document.getElementById(mapUnidad[p.unidad]).appendChild(el);
  });

  // attach listeners for Detail buttons
  document.querySelectorAll('.card-body .btn.primary').forEach(b=>{
    b.addEventListener('click', ()=> abrirModalProyectoId(Number(b.dataset.id)));
  });
}

/* abrir modal proyecto por id */
function abrirModalProyectoId(id){
  const p = proyectosData.find(x=>x.id===id); if(!p) return;
  document.getElementById('p-img').src = p.img;
  document.getElementById('p-title').textContent = `${p.semana} — ${p.descripcion}`;
  document.getElementById('p-competencias').innerHTML = `<strong>Competencias:</strong> ${p.competencias}`;
  document.getElementById('p-desc').textContent = p.descripcion;

  const tareasCount = (p.tareas || []).length;
  const tcountEl = document.getElementById('p-tareas-count');
  tcountEl.textContent = tareasCount >= 3 ? `Contiene ${tareasCount} tareas (3 o más)` : `Contiene ${tareasCount} ${tareasCount>1?"tareas":"tarea"}`;

  const list = document.getElementById('p-tareas');
  list.innerHTML = '';
  (p.tareas || []).forEach((t, i)=>{
    const li = document.createElement('li');
    const extraLink = p.extras && p.extras[i] ? p.extras[i] : (p.extras && p.extras[0] ? p.extras[0] : '');
    li.innerHTML = `<span>${t}</span> ${ extraLink ? `<a class="btn ghost" href="${extraLink}" target="_blank" style="margin-left:8px;padding:6px 10px;border-radius:8px;font-size:.85rem;">Ver tarea</a>` : '' }`;
    list.appendChild(li);
  });

  document.getElementById('p-git').href = p.github;
  document.getElementById('p-extra').href = (p.extras && p.extras[0]) || p.github;

  document.getElementById('modalProyecto').style.display = 'flex';
}

/* close modals */
document.querySelectorAll('.close').forEach(btn => btn.addEventListener('click', ()=>{
  btn.closest('.modal').style.display = 'none';
}));

// close clicking outside
window.addEventListener('click', (e) => {
  document.querySelectorAll('.modal').forEach(m=>{
    if(e.target === m) m.style.display = 'none';
  });
});

/* ========== NAV / HAMBURGER behavior ========== */
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
menuToggle.addEventListener('click', ()=>{
  menu.classList.toggle('open');
  menuToggle.classList.toggle('open');
});
// close menu on link click (mobile)
document.querySelectorAll('.menu-link').forEach(a=>{
  a.addEventListener('click', ()=> { menu.classList.remove('open'); menuToggle.classList.remove('open'); });
});

/* ========== DATOS modal triggers ========== */
document.getElementById('btnDatos').addEventListener('click', (e)=>{ e.preventDefault(); abrirModalDatos(); menu.classList.remove('open'); menuToggle.classList.remove('open'); });
document.getElementById('openDatosBtn').addEventListener('click', abrirModalDatos);
document.getElementById('closeDatos').addEventListener('click', cerrarModalDatos);
function abrirModalDatos(){ document.getElementById('modalDatos').style.display='flex'; }
function cerrarModalDatos(){ document.getElementById('modalDatos').style.display='none'; }

/* ========== LOGIN (index) ========== */
document.getElementById('btnLogin').addEventListener('click', (e)=>{ e.preventDefault(); abrirLogin(); menu.classList.remove('open'); menuToggle.classList.remove('open'); });
document.getElementById('btnLogin').addEventListener('keypress', ()=>{}); // placeholder
document.getElementById('closeLogin').addEventListener('click', ()=>document.getElementById('modalLogin').style.display='none');
document.getElementById('loginSubmit').addEventListener('click', ()=>{
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  const msg = document.getElementById('loginMsg');
  if(user === 'admin' && pass === '1234'){
    sessionStorage.setItem('admin','true');
    msg.style.color = 'lightgreen'; msg.textContent = 'Acceso correcto. Redirigiendo...';
    setTimeout(()=> location.href = 'admin.html', 900);
  } else {
    msg.style.color = 'salmon'; msg.textContent = 'Credenciales incorrectas';
  }
});
function abrirLogin(){ document.getElementById('modalLogin').style.display='flex'; }

/* ========== contacto simple ========== */
document.getElementById('formContacto').addEventListener('submit',(e)=>{
  e.preventDefault();
  alert('Mensaje enviado. Gracias!');
  e.target.reset();
});

/* ========== INIT ========== */
window.addEventListener('DOMContentLoaded', ()=>{
  generarTarjetas();
});
// Función para hacer scroll suave a una sección
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
