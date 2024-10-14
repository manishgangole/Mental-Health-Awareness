document.addEventListener("DOMContentLoaded", function() {
    // Get all toggle buttons
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const steps = this.nextElementSibling;
            
            // Toggle visibility of steps
            if (steps.style.display === "none") {
                steps.style.display = "block";
                this.textContent = "Hide Steps";  // Change button text
            } else {
                steps.style.display = "none";
                this.textContent = "Show Steps";  // Change button text
            }
        });
    });
});
