document.addEventListener("DOMContentLoaded", () => {
    fetch('/home', {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.userName) {
            document.getElementById("head").innerText = `Welcome ${data.userName}`;
        } else {
            window.location.href = '/login';
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
        window.location.href = '/login';
    });
});