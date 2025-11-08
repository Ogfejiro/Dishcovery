document.addEventListener("DOMContentLoaded", () => {
  // Select the form and button using the actual HTML elements and classes
  const form = document.querySelector("form"); 
  const signupBtn = document.querySelector(".sign--btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get values using the correct IDs (must match HTML exactly: firstname, password1, etc.)
    const firstName = document.getElementById('firstname').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password1').value.trim();
    const confirmPassword = document.getElementById('password2').value.trim();

    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // --- Start Signup Simulation ---
    signupBtn.textContent = "Signing up...";
    signupBtn.disabled = true;

    // Simulate a 2-second delay for signup process
    setTimeout(() => {
      alert("✅ Signup successful! Redirecting to login...");
      
      // *** THE CRITICAL REDIRECT STEP ***
      // This line changes the browser's location, sending the user to the login page.
      // Make sure the path below correctly points to your actual login HTML file.
      window.location.href = "../login-active_folder/login-active.html";
      
    }, 2000);
  });
});