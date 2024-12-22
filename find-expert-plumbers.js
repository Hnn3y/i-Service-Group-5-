
function goBack() {
    window.history.back();
  }
  
  function toggleBookmark(icon) {
    if (icon.classList.contains('text-gray-400')) {
        icon.classList.remove('text-gray-400');
        icon.classList.add('text-blue-600');
        console.log('Plumber bookmarked');
    } else {
        icon.classList.remove('text-blue-600');
        icon.classList.add('text-gray-400');
        console.log('Bookmark removed');
    }
  }
  
  async function fetchPlumbers() {
    try {
        const response = await fetch('https://api.example.com/plumbers');
        const plumbers = await response.json();
        const plumbersList = document.getElementById('plumbers-list');
        plumbersList.innerHTML = '';  // Clear existing list if any
        plumbers.forEach(plumber => {
            const plumberCard = document.createElement('div');
            plumberCard.className = 'plumber-card flex items-center bg-blue-50 p-4 mb-4 rounded-lg shadow-sm cursor-pointer transition-transform transform hover:scale-105';
            plumberCard.innerHTML = `
                <img src="${plumber.imgSrc}" alt="${plumber.name}" class="plumber-image w-20 h-20 rounded-lg object-cover mr-4">
                <div class="flex-1">
                    <h2 class="text-lg font-bold text-gray-800">${plumber.name}</h2>
                    <p class="text-sm text-blue-600">${plumber.role}</p>
                    <div class="flex justify-between text-sm text-gray-600 mt-2">
                        <div>
                            <i class="fas fa-star text-yellow-500"></i> Rating: <span class="font-medium">${plumber.rating}</span>
                        </div>
                        <div>
                            Total Jobs: <span class="font-medium">${plumber.jobs}</span>
                        </div>
                        <div>
                            Rate: <span class="font-medium">${plumber.rate}</span>
                        </div>
                    </div>
                </div>
                <i class="fas fa-bookmark text-gray-400 text-xl cursor-pointer" onclick="toggleBookmark(this)"></i>
            `;
            plumbersList.appendChild(plumberCard);
        });
    } catch (error) {
        console.error('Error fetching plumbers:', error);
    }
  }
  
  window.addEventListener('DOMContentLoaded', fetchPlumbers);
  
  