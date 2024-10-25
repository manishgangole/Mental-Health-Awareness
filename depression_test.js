document.addEventListener('DOMContentLoaded', function () {
    const confirmAgeBtn = document.getElementById('confirmAgeBtn');
    const denyAgeBtn = document.getElementById('denyAgeBtn');
    const testContent = document.getElementById('testContent');
    const depressionForm = document.getElementById('depressionForm');
    const resultDiv = document.getElementById('Result');

    confirmAgeBtn.addEventListener('click', function () {
        testContent.style.display = 'block';
        confirmAgeBtn.style.display = 'none';
        denyAgeBtn.style.display = 'none';
    });

    denyAgeBtn.addEventListener('click', function () {
        alert('You must be at least 18 years old to take this test.');
        window.location.href = 'persnalitytest.html';
    });

    // Calculate score and handle form submission
    depressionForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let totalScore = 0;
        const questions = 9;

        for (let i = 1; i <= questions; i++) {
            const selectElement = document.getElementById(`question${i}`);
            const value = parseInt(selectElement.value);
            if (!isNaN(value)) {
                totalScore += value;
            } else {
                alert("Please answer all questions.");
                return;
            }
        }

        displayResult(totalScore);
    });

    // Display results and send data to backend
    function displayResult(score) {
        let message = '';
        if (score <= 8) {
            message = "You may be experiencing mild symptoms. Monitor your feelings.";
        } else if (score <= 16) {
            message = "Moderate symptoms detected. Consider reaching out for support.";
        } else {
            message = "Severe symptoms detected. Seeking professional help may be beneficial.";
        }

        resultDiv.innerHTML = `
            <h3>Your Score: ${score}</h3>
            <p>${message}</p>
        `;

        // Send the result to the backend
        fetch('/api/depression-test', {
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
