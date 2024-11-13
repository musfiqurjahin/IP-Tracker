fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        alert(`Your IP Address is: ${data.ip}`);
    })
    .catch(error => {
        console.error("Error fetching IP address:", error);
    });
