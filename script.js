document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const menu = document.getElementById('menu');
    const navLinks = document.querySelectorAll('#menu a');

    // Toggle the mobile menu
    menuButton.addEventListener('click', function() {
        menu.classList.toggle('hidden');
    });

    // Hide the mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.add('hidden');
        });
    });
});

// Handle form submission and show a success message
function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);
    
    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Your inquiry has been submitted successfully! We will get back to you shortly.');
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert('Oops! There was a problem with your submission. Please try again.');
                }
            });
        }
    })
    .catch(error => {
        alert('Oops! There was a problem with your submission. Please try again.');
    });
}