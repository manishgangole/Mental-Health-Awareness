document.addEventListener('DOMContentLoaded', function () {
    const testButtons = document.querySelectorAll('.take-test-btn');

    testButtons.forEach(button => {
        button.addEventListener('click', function () {
            const testType = this.getAttribute('data-test');
            loadTest(testType);
        });
    });

    function loadTest(testType) {
        if (testType === 'depression') {
            window.location.href = 'depression_test.html'; // Redirect to the Depression Test page
        } else if (testType === 'procrastination') {
            window.location.href = 'procrastination_test.html'; // Redirect to the Anxiety Test page
        }
        // Add more conditions for different tests
    }
});
