document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    fetch('/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response-message').innerText = data.message;
        document.getElementById('signup-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response-message').innerText = 'An error occurred. Please try again.';
    });
});
