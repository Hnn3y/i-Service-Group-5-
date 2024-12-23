document.addEventListener('DOMContentLoaded', () => {
  const categoryCards = document.querySelectorAll('.category-card');
  const promoBookNowButton = document.getElementById('promo-book-now');
  const searchButton = document.querySelector('.fa-search').closest('button');
  const orderAgainElements = document.querySelectorAll('.order-again-element');

  function redirectToSignup() {
    // Redirect to the signup page if the user is not logged in
    window.location.href = './signup.html';
  }

  // Add event listener to the promo "Book Now" button
  promoBookNowButton.addEventListener('click', redirectToSignup);

  // Add event listeners to the order again elements (if applicable)
  orderAgainElements.forEach(element => {
    element.addEventListener('click', redirectToSignup);
  });

  // Notification click handler
  document.getElementById('notification-bell').addEventListener('click', function() {
    // Request reminder from the server
    fetch('/request-reminder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: 'client-id' }) // Replace 'client-id' with the actual client ID
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Reminder has been sent to the client.');
      } else {
        alert('Failed to send reminder.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while sending the reminder.');
    });
  });

  // Footer icons navigation
  const icons = document.querySelectorAll('[id$="-icon"]');

  function setActiveIcon(iconId) {
    icons.forEach(icon => {
      if (icon.id === iconId) {
        icon.classList.add('text-blue-500');
        icon.classList.remove('text-gray-600', 'hover:text-blue-500');
      } else {
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

      const rect = icon.getBoundingClientRect();
      tooltip.style.top = `${rect.top - 35}px`;
      tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
      tooltip.style.opacity = '0';

      document.body.appendChild(tooltip);

      requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
      });

      icon.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 300);
      });
    });
  });

  // Close modal functionality
  document.getElementById('close-modal')?.addEventListener('click', () => {
    const modal = document.getElementById('settings-modal');
    modal?.classList.add('hidden');
  });

  // Add services on "All Services" click
  document.getElementById('all-services').addEventListener('click', (event) => {
    event.preventDefault();

    const categoryGrid = document.getElementById('category-grid');

    // Array of additional services
    const additionalServices = [
      { id: 'painting', category: 'Painting', icon: 'fa-paint-roller' },
      { id: 'gardening', category: 'Gardening', icon: 'fa-seedling' },
      { id: 'carpentry', category: 'Carpentry', icon: 'fa-hammer' },
      { id: 'moving', category: 'Moving', icon: 'fa-truck' },
      { id: 'pest-control', category: 'Pest Control', icon: 'fa-bug' },
      { id: 'roofing', category: 'Roofing', icon: 'fa-home' },
      { id: 'window-cleaning', category: 'Window Cleaning', icon: 'fa-window' },
      { id: 'handyman', category: 'Handyman', icon: 'fa-tools' }
    ];

    // Append additional services to the grid
    additionalServices.forEach(service => {
      const serviceCard = document.createElement('div');
      serviceCard.id = service.id;
      serviceCard.dataset.category = service.category;
      serviceCard.className = 'category-card text-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer';
      serviceCard.innerHTML = `
        <i class="fas ${service.icon} text-4xl text-blue-500"></i>
        <p class="mt-2 text-lg font-semibold">${service.category}</p>
      `;
      categoryGrid.appendChild(serviceCard);
    });

    document.getElementById('all-services').style.display = 'none';
  });
});