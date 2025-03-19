let selectedDate = '';
let selectedTime = '';
let selectedService = '';
let selectedCategory = '';

// Navigate back
function goBack() {
    window.history.back();
}

// Function to toggle favorite
function toggleFavorite(button) {
    const icon = button.querySelector('i');

    // Toggle favorite status
    if (icon.classList.contains('text-blue-500')) {
        icon.classList.remove('text-blue-500');
        icon.classList.add('text-gray-500');
        console.log('Removed from favorites');
    } else {
        icon.classList.remove('text-gray-500');
        icon.classList.add('text-blue-500');
        console.log('Added to favorites');
    }

    // You can also send this change to the backend
    // Example:
    const isFavorite = icon.classList.contains('text-blue-500');
    const workerId = '123'; // Replace with the actual worker ID

    fetch(`https://your-backend-url.com/api/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ workerId, isFavorite })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Favorite status updated:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Highlight selected date
function selectDate(button, date) {
    console.log('Selecting date:', date);
    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-black');
    });
    button.classList.remove('bg-gray-200', 'text-black');
    button.classList.add('bg-blue-500', 'text-white');
    selectedDate = date;
}

// Highlight selected time
function selectTime(button, time) {
    console.log('Selecting time:', time);
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-black');
    });
    button.classList.remove('bg-gray-200', 'text-black');
    button.classList.add('bg-blue-500', 'text-white');
    selectedTime = time;
}

// Highlight selected service type
function handleButtonClick(button, service) {
    console.log('Selecting service:', service);
    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.classList.remove('bg-blue-200', 'text-blue-500');
        btn.classList.add('text-gray-500');
    });
    button.classList.remove('text-gray-500');
    button.classList.add('bg-blue-200', 'text-blue-500');
    selectedService = service;
}

// Highlight selected category
function selectCategory(button, category) {
    console.log('Selecting category:', category);
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('bg-blue-300', 'text-blue-500');
        btn.classList.add('bg-white', 'text-black');
    });
    button.classList.remove('bg-white', 'text-black');
    button.classList.add('bg-blue-300', 'text-blue-500');
    selectedCategory = category;
}

// Confirm booking
function confirmBooking() {
    const mobileNumber = document.getElementById('mobile-number').value;
    if (!mobileNumber) {
        alert("Please enter your mobile number.");
        return;
    }

    // Prepare the data to send to the backend
    const bookingData = {
        date: selectedDate,
        time: selectedTime,
        mobile: mobileNumber,
        service: selectedService,
        category: selectedCategory
    };

    // Send the data to the backend
    fetch('https://your-backend-url.com/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        showConfirmationMessage(); // Show the confirmation message
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was a problem with your booking.');
    });
}

// Show confirmation message
function showConfirmationMessage() {
    document.getElementById('confirmation-message').classList.remove('hidden');
}

// Close confirmation message
function closeConfirmation() {
    document.getElementById('confirmation-message').classList.add('hidden');
}

// Generate future dates dynamically
function generateDates() {
    const dateContainer = document.getElementById('date-container');
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);

        const day = futureDate.toLocaleString('default', { weekday: 'short' });
        const month = futureDate.toLocaleString('default', { month: 'short' });
        const date = futureDate.getDate();

        const button = document.createElement('button');
        button.className = 'bg-gray-200 px-3 py-2 rounded-lg text-center date-btn';
        button.innerHTML = `<p class="text-sm">${month}</p><p class="font-bold">${date}</p><p class="text-sm">${day}</p>`;
        button.onclick = () => selectDate(button, `${month} ${date} ${day}`);

        dateContainer.appendChild(button);
    }
}

// Initialize dates on page load
window.onload = generateDates;