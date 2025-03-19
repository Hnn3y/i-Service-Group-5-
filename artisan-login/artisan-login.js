document.getElementById('artisanLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('artisan-email').value;
    const password = document.getElementById('artisan-password').value;

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      const responseMessage = document.getElementById('response-message');
      if (data.success) {
        responseMessage.textContent = data.message;
        responseMessage.classList.remove('bg-red-600');
        responseMessage.classList.add('bg-green-600');
      } else {
        responseMessage.textContent = data.message;
        responseMessage.classList.add('bg-red-600');
        responseMessage.classList.remove('bg-green-600');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });