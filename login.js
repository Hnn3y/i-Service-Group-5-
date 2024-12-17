document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); 
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    fetch('https://your-backend-api.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }), 
    })
      .then((response) => response.json()) 
      .then((data) => {
        if (data.success) {
          alert('Login successful!'); 
        } else {
          alert(`Login failed: ${data.message}`); 
        }
      })
      .catch((error) => {
        console.error('Error:', error); 
        alert('Something went wrong. Please try again.'); 
      });
  });
  
  document.getElementById('facebookLogin').addEventListener('click', function () {
    fetch('https://your-backend-api.com/auth/facebook')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Facebook login successful!'); 
        } else {
          alert(`Facebook login failed: ${data.message}`); 
        }
      })
      .catch((error) => {
        console.error('Error:', error); 
        alert('Something went wrong. Please try again.'); 
      });
  });
  