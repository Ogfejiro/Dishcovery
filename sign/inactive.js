
const API_BASE = "https://dishcovery-backend-2-0.onrender.com/api";
const form = document.querySelector('.signup-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = form.querySelector('input[placeholder="First Name"]').value.trim();
  const lastName = form.querySelector('input[placeholder="Last Name"]').value.trim();
  const email = form.querySelector('input[placeholder="Email"]').value.trim();
  const password = form.querySelector('input[placeholder="Password"]').value.trim();
  const confirmPassword = form.querySelector('input[placeholder="Confirm Password"]').value.trim();

 
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: firstName + " " + lastName,
        email,
        password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Signup failed!");
    } else {
      alert("Signup successful! Redirecting to login...");
      window.location.href = "../login/login.html";
    }
  } catch (err) {
    console.error(err);
    alert("Error connecting to server");
  }
});

