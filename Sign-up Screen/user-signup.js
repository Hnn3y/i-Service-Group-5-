document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');
    const nameInput = signupForm.querySelector('.name-input-box input');
    const phoneInput = signupForm.querySelector('.phone-input-box input');
    const emailInput = signupForm.querySelector('.email-input-box input');
    const passwordInput = signupForm.querySelector('.password-input-box input');
    const rePasswordInput = signupForm.querySelector('.re-password-input-box input');
  
    const nameValidation = signupForm.querySelector('.name-input-box .validation');
    const phoneValidation = signupForm.querySelector('.phone-input-box .validation');
    const emailValidation = signupForm.querySelector('.email-input-box .validation');
    const passwordValidation = signupForm.querySelector('.password-input-box .validation');
    const rePasswordValidation = signupForm.querySelector('.re-password-input-box .validation');
  
    const validationMap = [
      { input: nameInput, validation: nameValidation, check: validateName },
      { input: phoneInput, validation: phoneValidation, check: validatePhone },
      { input: emailInput, validation: emailValidation, check: validateEmail },
      { input: passwordInput, validation: passwordValidation, check: validatePassword },
      { input: rePasswordInput, validation: rePasswordValidation, check: () => validatePasswordMatch(passwordInput, rePasswordInput) },
    ];
  
    validationMap.forEach(({ input, validation, check }) => {
      input.addEventListener('input', () => handleValidation(input, validation, check));
    });
  
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault(); 
  
      let isValid = true;
  
      validationMap.forEach(({ input, validation, check }) => {
        const valid = handleValidation(input, validation, check);
        if (!valid) isValid = false;
      });
  
      if (isValid) {

        const formData = {
          name: nameInput.value,
          phone: phoneInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        };
  
        console.log('Form submitted:', formData);
        submitForm(formData);
      }
    });
  
    // Validation functions
    function validateName(name) {
      return name.trim().length >= 3; 
    }
  
    function validatePhone(phone) {
      return /^[0-9]{11}$/.test(phone);
    }
  
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    function validatePassword(password) {
      return password.trim().length >= 6;
    }
  
    function validatePasswordMatch(password, rePassword) {
      return password.value === rePassword.value;
    }
  

    function handleValidation(input, validationLabel, validationCheck) {
      if (validationCheck(input.value)) {
        validationLabel.classList.add('hidden');
        input.classList.remove('border-red-500');
        return true;
      } else {
        validationLabel.classList.remove('hidden');
        input.classList.add('border-red-500');
        return false;
      }
    }
  
    async function submitForm(formData) {
      try {
        const response = await fetch('https://example.com/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const data = await response.json();
          alert(`Signup successful! Welcome, ${data.user}.`);
          signupForm.reset();
        } else {
          const error = await response.json();
          alert(`Signup failed: ${error.message}`);
        }
      } catch (error) {
        alert(`An error occurred: ${error.message}`);
      }
    }
  });
  