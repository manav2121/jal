document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    console.log('Submitting signup:', { username, password });

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Signup successful');
            window.location.href = data.redirectUrl; // Redirect to index.html
        } else {
            console.error('Signup failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error during signup request:', error);
    }
});

document.getElementById('show-signin').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('signin-form').classList.remove('hidden');
});

document.getElementById('show-signup').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('signin-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
});
