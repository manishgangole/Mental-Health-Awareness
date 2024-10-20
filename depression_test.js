document.addEventListener('DOMContentLoaded', function () {
    const confirmAgeBtn = document.getElementById('confirmAgeBtn');
    const denyAgeBtn = document.getElementById('denyAgeBtn');
    const testContent = document.getElementById('testContent');

    confirmAgeBtn.addEventListener('click', function () {
        testContent.style.display = 'block'; // Show test content
        confirmAgeBtn.style.display = 'none'; // Hide confirmation button
        denyAgeBtn.style.display = 'none'; // Hide deny button
    });

    denyAgeBtn.addEventListener('click', function () {
        alert('You must be at least 18 years old to take this test.');
        window.location.href = 'persnalitytest.html'; // Redirect to home or another page
    });

    const depressionForm = document.getElementById('depressionForm');
    depressionForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Handle the test submission logic here
        alert('Test submitted!'); // Placeholder for your submission logic
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('depressionTestForm');
    const resultDiv = document.getElementById('result');
    
    // Assuming you have 8 questions with options (0-3)
    const questions = [
        "I don’t feel like doing any of the things that used to give me joy.",
        "I feel fatigued to the bones.",
        "I feel like a failure.",
        "I get strong physical sensations out of nowhere (e.g.- headaches, palpitations, etc.).",
        "I cry for no reason.",
        "I feel so restless in my body.",
        "I have lost people dear to me; the pain is still fresh.",
        "I live a good life, but something in me is always dissatisfied.",
        "I have gone through negative situations in my childhood that have affected me in strong ways."
    ];

    // Collect input values and calculate the score
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let totalScore = 0;

        questions.forEach((question, index) => {
            const selectElement = document.getElementById(`question${index + 1}`);
            const value = parseInt(selectElement.value);
            totalScore += value; // Sum up the scores
        });

        // Display result based on the total score
        displayResult(totalScore);
    });

    function displayResult(score) {
        let message = '';
        if (score <= 8) {
            message = "You might be experiencing mild symptoms. It’s important to monitor your feelings.";
        } else if (score <= 16) {
            message = "You may be experiencing moderate symptoms of depression. Consider reaching out for support.";
        } else {
            message = "You might be experiencing severe symptoms of depression. Please seek professional help.";
        }
    
        // Update the resultDiv with the score and message
        resultDiv.innerHTML = `
            <h3>Your Score: ${score}</h3>
            <p>${message}</p>
        `;
    
        // Send the result to the backend
        fetch('api/depression-test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score, message }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
});
