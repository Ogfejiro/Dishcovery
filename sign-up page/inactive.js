document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-form");
  const signupBtn = document.querySelector(".signup-btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get values using the new IDs
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Simulate signup (since backend isn't connected)
    signupBtn.textContent = "Signing up...";
    signupBtn.disabled = true;

    setTimeout(() => {
      alert("✅ Signup successful! Redirecting to login...");
      // Redirect to the login page as defined in the HTML
      window.location.href = "../login-active_folder/login-active.html";
    }, 2000);
  });
});