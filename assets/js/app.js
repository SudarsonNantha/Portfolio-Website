const toggleButton = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');

function toggleSidebar() {
  sidebar.classList.toggle('close');
  toggleButton.classList.toggle('rotate');

  closeAllSubMenus();
}

function toggleSubMenu(button) {
  const submenu = button.nextElementSibling;

  if (!submenu.classList.contains('show')) {
    closeAllSubMenus();
  }

  submenu.classList.toggle('show');
  button.classList.toggle('rotate');

  if (sidebar.classList.contains('close')) {
    sidebar.classList.remove('close');
    toggleButton.classList.remove('rotate');
  }
}

function closeAllSubMenus() {
  sidebar.querySelectorAll('.show').forEach(submenu => {
    submenu.classList.remove('show');
    const toggleBtn = submenu.previousElementSibling;
    if (toggleBtn) {
      toggleBtn.classList.remove('rotate');
    }
  });
}
