const hamburger = document.getElementById('hamburger');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

hamburger.addEventListener('click', () => {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('active');
});

sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
});
