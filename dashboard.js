document.addEventListener("DOMContentLoaded", function() {
    // Mood Tracker logic
    const moodForm = document.getElementById("moodForm");
    const moodChart = document.getElementById("moodChart").getContext('2d');
    let moodData = [];

    moodForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const mood = document.getElementById("mood").value;
        const date = new Date().toLocaleDateString();

        moodData.push({ date, mood });
        updateMoodChart();

        // Send mood data to the backend
        fetch('/api/mood', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mood, date }),  // Send the data
        })
        .then(response => response.json())
        .then(data => {
            console.log('Mood saved:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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

        // Send goal data to the backend
        fetch('/api/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ goal }),  // Send the data
        })
        .then(response => response.json())
        .then(data => {
            console.log('Goal saved:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    goalList.addEventListener("click", function(event) {
        if (event.target.classList.contains("mark-done")) {
            event.preventDefault();
            const goalItem = event.target.parentElement;
            goalItem.querySelector("p").classList.toggle("done");
            event.target.textContent = goalItem.querySelector("p").classList.contains("done") ? "Done" : "Mark as done";
        }
    });

    // Chat Section logic
    const chatNowBtn = document.getElementById('chatNowBtn');
    const chatSection = document.getElementById('chatSection');

    // Show the chat section when "Chat Now" button is clicked
    chatNowBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        chatSection.style.display = 'block'; // Show the chat section
    });

    // Chat functionality
    const chatOutput = document.getElementById("chatOutput");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    // API Key
    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key

    // Function to call ChatGPT API
    async function getChatGPTResponse(userMessage) {
        const apiUrl = 'https://api.openai.com/v1/chat/completions';

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };

        const body = JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
            max_tokens: 100,
        });

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Error: ${response.status} ${response.statusText}`, errorData);
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error fetching ChatGPT response:', error);
            return "I'm sorry, I couldn't process your request at the moment.";
        }
    }

    function addMessageToChat(message, isUser) {
        const messageElement = document.createElement("p");
        messageElement.textContent = message;
        messageElement.classList.add(isUser ? "user-message" : "bot-message");
        chatOutput.appendChild(messageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight;  // Scroll to the bottom
    }

    sendBtn.addEventListener("click", async function() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessageToChat(userMessage, true);  // Add user's message
            const botReply = await getChatGPTResponse(userMessage);  // Get bot's response from API
            addMessageToChat(botReply, false);  // Add bot's response
            userInput.value = '';  // Clear the input field
        }
    });

    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendBtn.click();
        }
    });
});
// mood submission
const moodForm = document.getElementById("moodForm");

moodForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    const mood = document.getElementById("mood").value;
    const date = new Date().toLocaleDateString();

    const moodData = { mood, date }; // Prepare mood data object

    // Send mood data to the backend
    fetch('http://localhost:3000/api/mood', { // Ensure you point to the right URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify that we're sending JSON data
        },
        body: JSON.stringify(moodData), // Convert the moodData object to JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('Mood saved:', data); // Log the server response
    })
    .catch((error) => {
        console.error('Error:', error); // Log errors if any
    });
});

// goal submission
const goalForm = document.getElementById("goalForm");

goalForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    const goal = document.getElementById("goal").value;

    const goalData = { goal }; // Prepare goal data object

    // Send goal data to the backend
    fetch('http://localhost:3000/api/goals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData), // Convert the goalData object to JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('Goal saved:', data); // Log the server response
    })
    .catch((error) => {
        console.error('Error:', error); // Log errors if any
    });
});
