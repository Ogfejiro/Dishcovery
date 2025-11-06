function checkFormValidity() {
    const form = document.getElementById('signupForm');
    const button = document.getElementById('signUpBtn');
    
    const inputs = form.querySelectorAll('input[required]');

    const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');

    if (allFilled) {
        button.classList.remove('inactive');
        button.classList.add('active');
        button.disabled = false;
    } else {
        button.classList.remove('active');
        button.classList.add('inactive');
        button.disabled = true;
    }
}

function handleSignUp(event) {
    event.preventDefault(); 

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Error: Passwords do not match. Please verify your entries.');
        document.getElementById('password').focus();
        return; 
    }

    alert('Sign up successful! Welcome to DISHCOVERY.');
}

document.addEventListener('DOMContentLoaded', checkFormValidity);