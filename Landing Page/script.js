const hamburgerButton = document.getElementById('hamburgerButton');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburgerButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });