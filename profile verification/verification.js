
document.addEventListener('DOMContentLoaded', () => {
const otpInputs = document.querySelectorAll('.otp-input');

otpInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && index > 0 && input.value === '') {
            otpInputs[index - 1].focus();
        }
    });
});


let timer = 60;
let timerInterval;
const resendBtn = document.getElementById('resend-btn');
const resendTimer = document.getElementById('resend-timer');

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        resendTimer.textContent = `(00:${timer < 10 ? '0' : ''}${timer})`;

        if (timer === 0) {
            clearInterval(timerInterval);
            resendBtn.disabled = false;
            resendBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
            resendBtn.classList.add('bg-blue-700', 'hover:bg-blue-800');
        }
    }, 1000);
}

resendBtn.addEventListener('click', () => {
    resendBtn.disabled = true;
    resendBtn.classList.remove('bg-blue-700', 'hover:bg-blue-800');
    resendBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
    timer = 60;
    resendTimer.textContent = `(01:00)`;
    startTimer();
});

startTimer();

const verifyBtn = document.getElementById('verify-btn');

verifyBtn.addEventListener('click', () => {
    console.log("Verify button clicked!")
    const otp = Array.from(otpInputs).map(input => input.value).join('');
    if (otp.length === 6) {
        window.location.href = './confirmation.html';
    } else {
        alert('Please enter all 6 digits.');
    }
});

})