document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-form");
  const signupBtn = document.querySelector(".signup-btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = form.querySelector('input[placeholder="First Name"]').value.trim();
    const lastName = form.querySelector('input[placeholder="Last Name"]').value.trim();
    const email = form.querySelector('input[placeholder="Email"]').value.trim();
    const password = form.querySelector('input[placeholder="Password"]').value.trim();
    const confirmPassword = form.querySelector('input[placeholder="Confirm Password"]').value.trim();

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
      window.location.href = "../login-active_folder/login-active.html";
    }, 2000);
  });
});
