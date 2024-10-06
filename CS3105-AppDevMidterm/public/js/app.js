// URL of the backend API
const apiUrl = 'http://localhost:3000/api';

// Handle user registration
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    // Send registration request to the backend
    const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
    });
    const data = await response.json();

    // Show success or error message
    if (response.ok) {
        alert('Registration successful!');
        window.location.href = 'login.html';
    } else {
        alert(data.error || 'Something went wrong');
    }
});

// Handle user login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request to the backend
    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();

    // Show success or error message and store token
    if (response.ok) {
        alert('Login successful!');
        localStorage.setItem('token', data.token);
        window.location.href = 'profile.html';
    } else {
        alert(data.error || 'Something went wrong');
    }
});

// Handle fetching user profile
window.onload = async () => {
    if (window.location.pathname.endsWith('profile.html')) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to log in first.');
            window.location.href = 'login.html';
            return;
        }

        // Send request to get profile data
        const response = await fetch(`${apiUrl}/profile`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        if (response.ok) {
            const profileInfo = document.getElementById('profile-info');
            profileInfo.innerHTML = `<p>Username: ${data.user.username}</p>
                                     <p>Email: ${data.user.email}</p>`;
        } else {
            alert(data.error || 'Something went wrong');
        }
    }
};
