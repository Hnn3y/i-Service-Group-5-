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
        resendTimer.textContent = `(${timer < 10 ? '0' : ''}${timer})`;

        if (timer === 0) {
            clearInterval(timerInterval);
            resendBtn.disabled = false;
            resendBtn.classList.remove('bg-gray-400');
            resendBtn.classList.add('bg-blue-800');
        }
    }, 1000);
}

resendBtn.addEventListener('click', () => {
    resendBtn.disabled = true;
    resendBtn.classList.remove('bg-blue-800');
    resendBtn.classList.add('bg-gray-400');

    timer = 60;
    resendTimer.textContent = `(01:00)`;
    startTimer();
});

startTimer();

const verifyBtn = document.getElementById('verify-btn');
const popup = document.getElementById('popup');

verifyBtn.addEventListener('click', () => {
    popup.classList.remove('hidden');

    setTimeout(() => {
        popup.classList.add('hidden');
    }, 3000);
});