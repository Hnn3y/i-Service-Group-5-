const icons = document.querySelectorAll('[id$="-icon"]');

function setActiveIcon(iconId) {
  icons.forEach(icon => {
    if (icon.id === iconId) {
      // Set active icon to blue
      icon.classList.add('text-blue-500');
      icon.classList.remove('text-gray-600', 'hover:text-blue-500');
    } else {
      // Reset other icons
      icon.classList.remove('text-blue-500');
      icon.classList.add('text-gray-600', 'hover:text-blue-500');
    }
  });
}

icons.forEach(icon => {
  icon.addEventListener('click', () => {
    setActiveIcon(icon.id);
    const page = icon.dataset.page;
    console.log(`Navigating to ${page} page.`);

    // Simulated navigation (replace with actual URLs)
    if (icon.id === 'home-icon') window.location.href = "./booking.html";
    if (icon.id === 'calendar-icon') window.location.href = "#calendar";
    if (icon.id === 'user-icon') window.location.href = "./service-provider.html";
    if (icon.id === 'settings-icon') {
      const modal = document.getElementById('settings-modal');
      modal?.classList.remove('hidden');
    }
    if (icon.id === 'message-icon') console.log("Messaging functionality is under construction!");
  });

  // Tooltip on hover
  icon.addEventListener('mouseenter', () => {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.textContent = icon.dataset.page;
    tooltip.className = 'tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '4px 8px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.transition = 'opacity 0.3s ease-in-out';

    // Get icon position and calculate tooltip position
    const rect = icon.getBoundingClientRect();
    tooltip.style.top = `${rect.top - 35}px`; // Adjust position above icon
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`; // Center tooltip
    tooltip.style.opacity = '0'; // Initial state for fade-in effect

    document.body.appendChild(tooltip);

    // Fade in the tooltip
    requestAnimationFrame(() => {
      tooltip.style.opacity = '1';
    });

    // Remove tooltip on mouse leave
    icon.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
      setTimeout(() => tooltip.remove(), 300); // Wait for fade-out before removing
    });
  });
});

// Close modal functionality
document.getElementById('close-modal')?.addEventListener('click', () => {
  const modal = document.getElementById('settings-modal');
  modal?.classList.add('hidden');
});

const categoryCards = document.querySelectorAll('.category-card');

function handleCategorySelection(event) {
  const category = event.currentTarget.dataset.category;

  // Navigate to the respective page for the selected category (replace with your actual URLs)
  switch (category) {
    case 'Plumbing':
      window.location.href = "./find-expert-plumbers.html";  // Replace with actual URL
      break;
    case 'Cleaning':
      window.location.href = "./cleaning.html";  // Replace with actual URL
      break;
    case 'Repairs':
      window.location.href = "./repairs.html";  // Replace with actual URL
      break;
    case 'Electrical':
      window.location.href = "./electrical.html";  // Replace with actual URL
      break;
    case 'Laundry':
      window.location.href = "./laundry.html";  // Replace with actual URL
      break;
    case 'All Services':
      window.location.href = "./all-services.html";  // Replace with actual URL
      break;
    default:
      break;
  }
}

// Add event listeners to all category cards
categoryCards.forEach(card => {
  card.addEventListener('click', handleCategorySelection);
});
