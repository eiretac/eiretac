document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('login-button');
  const votingForm = document.getElementById('voting-form');
  const statusSection = document.getElementById('status-section');
  const statusMessage = document.getElementById('status-message');

  // Trigger Roblox OAuth login process when the button is clicked
  if (loginButton) {
    loginButton.addEventListener('click', function() {
      // Redirect to the Roblox OAuth endpoint (hosted on your backend)
      window.location.href = '/api/auth/roblox';
    });
  }

  // Handle voting form submission
  if (votingForm) {
    votingForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const candidate = document.getElementById('candidate-select').value;

      // Call the backend to submit the vote
      try {
        const response = await fetch('/api/submit-vote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ candidate }),
        });

        const result = await response.json();

        // Update the UI based on the result
        if (result.success) {
          votingForm.style.display = 'none';
          statusSection.style.display = 'block';
          statusMessage.textContent = 'Thank you for voting!';
        } else {
          statusMessage.textContent = 'Error: ' + result.message;
        }
      } catch (error) {
        console.error('Error submitting vote:', error);
        statusMessage.textContent = 'An error occurred. Please try again.';
      }
    });
  }
});
