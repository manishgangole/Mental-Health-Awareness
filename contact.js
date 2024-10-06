document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Display the success message
    document.getElementById('successMessage').classList.remove('hidden');

    // Optionally, clear the form
    document.getElementById('contactForm').reset();
});
