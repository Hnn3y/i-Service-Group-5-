  //  Changing background image
  const images = [
    './images/background1.jpg',
    './images/background2.jpg',
    './images/background3.jpg'
];
let currentImageIndex = 0;

function changeBackgroundImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.body.style.backgroundImage = `url('${images[currentImageIndex]}')`;
}

setInterval(changeBackgroundImage, 5000);

//  Sending data to the backend
function sendData(endpoint) {
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'link_clicked' })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

document.getElementById('signup-link').addEventListener('click', function(event) {
    event.preventDefault();
    sendData('/api/signup-clicked');
    window.location.href = this.href;
});

document.getElementById('login-link').addEventListener('click', function(event) {
    event.preventDefault();
    sendData('/api/login-clicked');
    window.location.href = this.href;
});