// Datos de las plataformas (eliminando las especificadas)
const platforms = [
  { 
    name: "YouTube", 
    url: "https://youtube.com/@koowexa?si=QCFg-JY-QJLQe2sZ", 
    icon: "fab fa-youtube", 
    status: "online" 
  },
  { 
    name: "X (Twitter)", 
    url: "https://x.com/koowexa?t=rW2wTyGXhZT-wShWyU2ROQ&s=09", 
    icon: "fab fa-x-twitter", 
    status: "active" 
  },
  { 
    name: "Facebook Page", 
    url: "https://www.facebook.com/profile.php?id=61581684622578", 
    icon: "fab fa-facebook", 
    status: "online" 
  }
];

// Elementos del DOM
const platformList = document.getElementById('platformList');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const noResults = document.getElementById('noResults');

// Estado de la aplicación
let currentTheme = 'dark';
let filteredPlatforms = [...platforms];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderPlatforms(platforms);
  setupEventListeners();
  loadThemePreference();
});

// Configurar event listeners
function setupEventListeners() {
  // Búsqueda
  searchInput.addEventListener('input', handleSearch);
  
  // Cambio de tema
  themeToggle.addEventListener('click', toggleTheme);
}

// Renderizar plataformas
function renderPlatforms(platformsToRender) {
  platformList.innerHTML = '';
  
  if (platformsToRender.length === 0) {
    noResults.style.display = 'block';
    return;
  }
  
  noResults.style.display = 'none';
  
  platformsToRender.forEach(platform => {
    const card = createPlatformCard(platform);
    platformList.appendChild(card);
  });
}

// Crear tarjeta de plataforma
function createPlatformCard(platform) {
  const a = document.createElement('a');
  a.className = 'card';
  a.href = platform.url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  
  // Determinar clase de estado
  let statusClass = '';
  let statusText = '';
  
  switch(platform.status) {
    case 'online':
      statusClass = '';
      statusText = 'En línea';
      break;
    case 'active':
      statusClass = 'active';
      statusText = 'Activo';
      break;
    case 'offline':
      statusClass = 'offline';
      statusText = 'Desconectado';
      break;
    default:
      statusClass = '';
      statusText = 'En línea';
  }
  
  a.innerHTML = `
    <div class="icon-box">
      <i class="${platform.icon}"></i>
    </div>
    <div class="info">
      <h2>${platform.name}</h2>
      <div class="status">
        <span class="dot ${statusClass}"></span>
        ${statusText}
      </div>
    </div>
  `;
  
  return a;
}

// Manejar búsqueda
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase().trim();
  
  if (searchTerm === '') {
    filteredPlatforms = [...platforms];
  } else {
    filteredPlatforms = platforms.filter(platform => 
      platform.name.toLowerCase().includes(searchTerm)
    );
  }
  
  renderPlatforms(filteredPlatforms);
}

// Cambiar tema
function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Actualizar icono del botón
  const icon = themeToggle.querySelector('i');
  icon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  
  // Guardar preferencia
  localStorage.setItem('theme', currentTheme);
}

// Cargar preferencia de tema
function loadThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Actualizar icono del botón
    const icon = themeToggle.querySelector('i');
    icon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  }
}