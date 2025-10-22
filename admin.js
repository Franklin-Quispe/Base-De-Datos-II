// Control de sesión: si index estableció sessionStorage.admin -> mostrar panel sin pedir otra contraseña
const loginSection = document.getElementById('loginSection');
const panelSection = document.getElementById('panelSection');
const admMsg = document.getElementById('adm-msg');
const admLoginBtn = document.getElementById('adm-login');
const logoutBtn = document.getElementById('logout');

// Si hay flag admin en sessionStorage, mostrar panel directo
if(sessionStorage.getItem('admin') === 'true'){
  loginSection.classList.add('hidden');
  panelSection.classList.remove('hidden');
}

// manejo de login en admin.html (si no venimos desde index)
admLoginBtn.addEventListener('click', ()=>{
  const user = document.getElementById('adm-user').value.trim();
  const pass = document.getElementById('adm-pass').value.trim();
  if(user === 'admin' && pass === '1234'){
    sessionStorage.setItem('admin','true');
    loginSection.classList.add('hidden');
    panelSection.classList.remove('hidden');
    loadProjects();
  } else {
    admMsg.textContent = 'Usuario o contraseña incorrectos';
  }
});

// logout
logoutBtn.addEventListener('click', ()=>{
  sessionStorage.removeItem('admin');
  location.href = 'index.html';
});

/* ========== CRUD en localStorage ========== */
let projects = JSON.parse(localStorage.getItem('projects')) || [];

// elementos form
const projectForm = document.getElementById('projectForm');
const pImg = document.getElementById('p-img');
const pSemana = document.getElementById('p-semana');
const pDesc = document.getElementById('p-desc');
const pGit = document.getElementById('p-git');
const pExtras = document.getElementById('p-extras');
const tablaBody = document.getElementById('tablaBody');

let editIndex = -1;

projectForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const newProj = {
    img: pImg.value.trim() || 'assets/unidad1.jpg',
    semana: pSemana.value.trim(),
    desc: pDesc.value.trim(),
    git: pGit.value.trim(),
    extras: pExtras.value.trim() ? pExtras.value.trim().split(',').map(s=>s.trim()) : []
  };
  if(editIndex >= 0){
    projects[editIndex] = newProj;
    editIndex = -1;
  } else {
    projects.push(newProj);
  }
  localStorage.setItem('projects', JSON.stringify(projects));
  projectForm.reset();
  loadProjects();
});

function loadProjects(){
  projects = JSON.parse(localStorage.getItem('projects')) || [];
  tablaBody.innerHTML = '';
  projects.forEach((p, idx)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx+1}</td>
      <td>${p.semana}</td>
      <td>${p.desc}</td>
      <td>${p.git ? `<a href="${p.git}" target="_blank">Ver</a>` : '-'}</td>
      <td>${p.extras && p.extras.length ? p.extras.length : '-'}</td>
      <td>
        <button class="btn-accion btn-edit" onclick="editar(${idx})">Editar</button>
        <button class="btn-accion btn-delete" onclick="eliminar(${idx})">Eliminar</button>
      </td>
    `;
    tablaBody.appendChild(tr);
  });
}

function editar(i){
  const p = projects[i];
  pImg.value = p.img;
  pSemana.value = p.semana;
  pDesc.value = p.desc;
  pGit.value = p.git;
  pExtras.value = p.extras.join(', ');
  editIndex = i;
  window.scrollTo({top:0,behavior:'smooth'});
}

function eliminar(i){
  if(!confirm('Eliminar proyecto?')) return;
  projects.splice(i,1);
  localStorage.setItem('projects', JSON.stringify(projects));
  loadProjects();
}

// cargar proyectos al inicio (si panel visible)
if(sessionStorage.getItem('admin') === 'true'){
  loadProjects();
}
