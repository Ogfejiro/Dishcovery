 function sendRecoveryLink() {
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();
            const messageBox = document.getElementById('messageBox');
            
            // Hide the box initially
            messageBox.style.display = 'none';

            // Simple email validation check
            if (!email || !email.includes('@') || !email.includes('.')) {
                messageBox.textContent = 'Please enter a valid email address.';
                messageBox.className = 'message-box error';
                messageBox.style.display = 'block';
                return;
            }

            // Show loading/sending state
            messageBox.textContent = 'Sending recovery link...';
            messageBox.className = 'message-box success';
            messageBox.style.display = 'block';

            // Simulate API call delay (1.5 seconds)
            setTimeout(() => {
                messageBox.textContent = `Success! A recovery link has been sent to ${email}. Check your inbox.`;
                messageBox.className = 'message-box success';
                
                // Clear input after success (optional)
                emailInput.value = '';
            }, 1500);
        }

        // Attach event listener on page load
        document.addEventListener('DOMContentLoaded', () => {
            const button = document.querySelector('button');
            button.addEventListener('click', sendRecoveryLink);
             });