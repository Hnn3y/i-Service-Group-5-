document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('https://your-backend-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  });

  document.getElementById('facebookLogin').addEventListener('click', async () => {
    try {
      const response = await fetch('https://your-backend-api.com/auth/facebook', {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        alert('Facebook login successful!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during Facebook login:', error);
      alert('An error occurred. Please try again.');
    }
  });