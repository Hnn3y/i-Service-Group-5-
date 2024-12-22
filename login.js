const loginForm = document.getElementById('loginForm');
    const responseMessage = document.getElementById('response-message');
    responseMessage.setAttribute('role', 'alert');

    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (!email || !password) {
        responseMessage.textContent = 'Please enter both email and password.';
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        responseMessage.textContent = 'Please enter a valid email address.';
        return;
      }

      try {
        const response = await fetch('https://example.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          responseMessage.textContent = `Login successful. Welcome, ${data.user}!`;
          responseMessage.classList.add('success');
        } else {
          const error = await response.json();
          responseMessage.textContent = `Error: ${error.message}`;
        }
      } 
      catch (error) {

        responseMessage.textContent = `Error: ${error.message}`;
        setTimeout(()=> {
            responseMessage.textContent = "";
        }, 5000);
      }
    });