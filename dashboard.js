document.addEventListener("DOMContentLoaded", function() {
    // Mood Tracker logic remains unchanged
    const moodForm = document.getElementById("moodForm");
    const moodChart = document.getElementById("moodChart").getContext('2d');
    let moodData = [];

    moodForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const mood = document.getElementById("mood").value;
        const date = new Date().toLocaleDateString();

        moodData.push({ date, mood });
        updateMoodChart();
    });

    function updateMoodChart() {
        const dates = moodData.map(entry => entry.date);
        const moods = moodData.map(entry => entry.mood);

        new Chart(moodChart, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Mood Over Time',
                    data: moods.map(mood => moodValue(mood)),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 4,
                        ticks: {
                            callback: function(value) {
                                return moodLabel(value);
                            }
                        }
                    }
                }
            }
        });
    }

    function moodValue(mood) {
        switch(mood) {
            case 'happy': return 3;
            case 'neutral': return 2;
            case 'anxious': return 1;
            case 'sad': return 0;
            default: return 2;
        }
    }

    function moodLabel(value) {
        switch(value) {
            case 3: return 'Happy';
            case 2: return 'Neutral';
            case 1: return 'Anxious';
            case 0: return 'Sad';
            default: return '';
        }
    }

    // Goal Setting logic
    const goalForm = document.getElementById("goalForm");
    const goalList = document.getElementById("goalList");

    goalForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const goal = document.getElementById("goal").value;

        const goalItem = document.createElement("li");
        goalItem.classList.add("goal-item");
        goalItem.innerHTML = `<p>${goal}</p><a href="#" class="mark-done">Mark as done</a>`;

        goalList.appendChild(goalItem);
        document.getElementById("goal").value = '';  // Clear the input field
    });

    goalList.addEventListener("click", function(event) {
        if (event.target.classList.contains("mark-done")) {
            event.preventDefault();
            const goalItem = event.target.parentElement;
            goalItem.querySelector("p").classList.toggle("done");
            event.target.textContent = goalItem.querySelector("p").classList.contains("done") ? "Done" : "Mark as done";
        }
    });
});
const chatOutput = document.getElementById("chatOutput");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const botResponses = {
    "hello": "Hello! How can I assist you today?",
    "how are you?": "I'm just a program, but I'm here to help you.",
    "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
    "i feel sad": "I'm sorry to hear that. Remember, it's okay to feel sad sometimes. Can I help you with something specific?",
    "what can you do?": "I can chat with you, help track your mood, set goals, and provide resources for mental health support.",
    "default": "I'm not sure how to respond to that. Can you ask me something else?"
};

function addMessageToChat(message, isUser) {
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageElement.classList.add(isUser ? "user-message" : "bot-message");
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;  // Scroll to the bottom
}

function getBotResponse(userMessage) {
    return botResponses[userMessage.toLowerCase()] || botResponses["default"];
}

sendBtn.addEventListener("click", function() {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessageToChat(userMessage, true);  // Add user's message
        const botReply = getBotResponse(userMessage);  // Get bot's response
        addMessageToChat(botReply, false);  // Add bot's response
        userInput.value = '';  // Clear the input field
    }
});

userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendBtn.click();
    }
});
