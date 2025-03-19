function goBack() {
    window.history.back();
}

function toggleBookmark(event, icon, artisanId) {
    event.stopPropagation(); // Prevent the card click event

    let bookmarkedArtisans = JSON.parse(localStorage.getItem('bookmarkedArtisans')) || [];

    if (icon.classList.contains('text-gray-400')) {
        icon.classList.remove('text-gray-400');
        icon.classList.add('text-blue-600');
        console.log('Artisan bookmarked');
        bookmarkedArtisans.push(artisanId);
    } else {
        icon.classList.remove('text-blue-600');
        icon.classList.add('text-gray-400');
        console.log('Bookmark removed');
        bookmarkedArtisans = bookmarkedArtisans.filter(id => id !== artisanId);
    }

    localStorage.setItem('bookmarkedArtisans', JSON.stringify(bookmarkedArtisans));
}

function loadBookmarks() {
    const bookmarkedArtisans = JSON.parse(localStorage.getItem('bookmarkedArtisans')) || [];
    return new Set(bookmarkedArtisans);
}

async function fetchArtisans(artisanType) {
    try {
        const response = await fetch(`https://api.example.com/artisans?type=${artisanType}`); // Replace with actual API endpoint
        const artisans = await response.json();
        const artisansList = document.getElementById('artisans-list');
        artisansList.innerHTML = '';  // Clear existing list if any

        const bookmarkedArtisans = loadBookmarks();

        artisans.forEach(artisan => {
            const artisanCard = document.createElement('div');
            artisanCard.className = 'artisan-card flex items-center bg-blue-50 p-4 mb-4 rounded-lg shadow-sm cursor-pointer transition-transform transform hover:scale-105';
            artisanCard.dataset.id = artisan.id; // Store the artisan ID
            artisanCard.onclick = function() { bookArtisan(artisan.id); }; // Ensure correct function call
            artisanCard.innerHTML = `
                <img src="${artisan.imgSrc}" alt="${artisan.name}" class="artisan-image w-20 h-20 rounded-lg object-cover mr-4">
                <div class="flex-1">
                    <h2 class="text-lg font-bold text-gray-800">${artisan.name}</h2>
                    <p class="text-sm text-blue-600">${artisan.role}</p>
                    <div class="flex justify-between text-sm text-gray-600 mt-2">
                        <div>
                            <i class="fas fa-star text-yellow-500"></i> Rating: <span class="font-medium">${artisan.rating}</span>
                        </div>
                        <div>
                            Total Jobs: <span class="font-medium">${artisan.jobs}</span>
                        </div>
                        <div>
                            Rate: <span class="font-medium">${artisan.rate}</span>
                        </div>
                    </div>
                </div>
                <i class="fas ${bookmarkedArtisans.has(artisan.id) ? 'text-blue-600' : 'text-gray-400'} text-xl cursor-pointer" onclick="toggleBookmark(event, this, ${artisan.id})"></i>
            `;
            artisansList.appendChild(artisanCard);
        });
    } catch (error) {
        console.error('Error fetching artisans:', error);
    }
}

function bookArtisan(artisanId) {
    console.log(`Booking artisan with ID: ${artisanId}`); // Debugging statement
    // Redirect to the booking page for the selected artisan
    window.location.href = `./booking.html?id=${artisanId}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const artisanType = urlParams.get('type') || 'plumbers'; // Default to 'plumbers' if type is not specified
    document.getElementById('page-title').textContent = `Find Expert ${artisanType.charAt(0).toUpperCase() + artisanType.slice(1)}`;
    fetchArtisans(artisanType);
});