document.addEventListener("DOMContentLoaded", function () {
    const takeTestBtn = document.getElementById('takeTestBtn');
    const quizContainer = document.getElementById('quizContainer');
    const form = document.getElementById('procrastinationQuizForm');
    const resultDiv = document.getElementById('result');

    // Questions for the Procrastination Quiz
    const questions = [
        "I often find myself putting off tasks until the last minute.",
        "I tend to avoid starting projects because I’m afraid of not doing them perfectly.",
        "I frequently underestimate how long it will take me to complete a task.",
        "I get distracted easily when I need to work on something important.",
        "I often make excuses to avoid tasks I find unpleasant.",
        "I start many projects but finish very few of them.",
        "I often feel overwhelmed by my to-do list, which causes me to not start anything at all.",
        "I have trouble prioritizing tasks, leading to last-minute rushes.",
        "I often feel guilty for not being more productive.",
        "I believe I work better under pressure, so I tend to delay tasks."
    ];

    // Add event listener to the "Take the Test" button
    takeTestBtn.addEventListener('click', function () {
        quizContainer.style.display = 'block'; // Show quiz container
        loadQuestions(); // Load quiz questions
    });

    // Function to load questions into the form
    function loadQuestions() {
        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `
                <label for="question${index + 1}">${question}</label>
                <select id="question${index + 1}">
                    <option value="0">Not at all</option>
                    <option value="1">Sometimes</option>
                    <option value="2">Often</option>
                    <option value="3">Always</option>
                </select>
            `;
            form.appendChild(questionDiv);
        });
    }

    // Add event listener to the "See the Results" button
    document.getElementById('submitQuiz').addEventListener('click', function () {
        let totalScore = 0;

        // Calculate the total score from the quiz responses
        for (let i = 1; i <= questions.length; i++) {
            const selectElement = document.getElementById(`question${i}`);
            totalScore += parseInt(selectElement.value); // Sum up the scores
        }

        // Display the results
        displayResult(totalScore);
    });

    // Function to display results based on the total score
    function displayResult(score) {
        let message = '';
        if (score <= 10) {
            message = "You may not struggle with procrastination. Keep up the good work!";
        } else if (score <= 20) {
            message = "You occasionally procrastinate but can manage your time well.";
        } else if (score <= 30) {
            message = "You might want to consider strategies to reduce procrastination.";
        } else {
            message = "Procrastination seems to significantly impact you. It might be helpful to seek strategies or support.";
        }

        resultDiv.innerHTML = `
            <h3>Your Score: ${score}</h3>
            <p>${message}</p>
        `;
    }
});
