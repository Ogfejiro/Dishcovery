document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const loginBtn = document.querySelector('.log-in_btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop page reload

    const email = form.querySelector('input[type="text"]').value.trim();
    const password = form.querySelector('input[type="password"]').value.trim();

    if (email === "" || password === "") {
      alert("Please fill in all fields.");
      return;
    }

    // Disable button and show loading text
    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";
    loginBtn.style.background = "#a33";

    // Fake login delay for 2 seconds
    setTimeout(() => {
      alert("Login successful! Redirecting to Admin Dashboard...");
      window.location.href = "../admin-dashboard/admin.html"; // ✅ correct path
    }, 2000);
  });
});
