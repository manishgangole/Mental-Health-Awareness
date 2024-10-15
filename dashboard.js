document.addEventListener("DOMContentLoaded", function () {
    // Sidebar logic
    const sidebar = document.querySelector('.sidebar');
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    hamburgerMenu.addEventListener('click', function () {
        sidebar.classList.toggle('hidden');
    });

    // Mood Tracker logic
    const moodForm = document.getElementById("moodForm");
    const moodChart = document.getElementById("moodChart").getContext('2d');
    let moodData = [];

    moodForm.addEventListener("submit", function (event) {
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
            body: JSON.stringify({ mood, date }),
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
                            callback: function (value) {
                                return moodLabel(value);
                            }
                        }
                    }
                }
            }
        });
    }

    function moodValue(mood) {
        switch (mood) {
            case 'happy': return 3;
            case 'neutral': return 2;
            case 'anxious': return 1;
            case 'sad': return 0;
            default: return 2;
        }
    }

    function moodLabel(value) {
        switch (value) {
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

    goalForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const goal = document.getElementById("goal").value;

        const goalItem = document.createElement("li");
        goalItem.classList.add("goal-item");
        goalItem.innerHTML = `<p>${goal}</p><a href="#" class="mark-done">Mark as done</a>`;

        goalList.appendChild(goalItem);
        document.getElementById("goal").value = ''; // Clear the input field

        // Send goal data to the backend
        fetch('/api/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ goal }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Goal saved:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    goalList.addEventListener("click", function (event) {
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

    chatNowBtn.addEventListener('click', function (event) {
        event.preventDefault();
        chatSection.style.display = 'block';
    });

    // Chat functionality
    const chatOutput = document.getElementById("chatOutput");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    const apiUrl = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';

    const apiKey = 'YOUR_API_KEY_HERE'; // Optional for better rate limits

    async function getHuggingFaceResponse(userMessage) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };

        const body = JSON.stringify({
            inputs: userMessage,
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
            return data.generated_text || "Sorry, I couldn't generate a response.";
        } catch (error) {
            console.error('Error fetching response:', error);
            return "I'm sorry, I couldn't process your request at the moment.";
        }
    }

    function addMessageToChat(message, isUser) {
        const messageElement = document.createElement("p");
        messageElement.textContent = message;
        messageElement.classList.add(isUser ? "user-message" : "bot-message");
        chatOutput.appendChild(messageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    sendBtn.addEventListener("click", async function () {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessageToChat(userMessage, true);
            const botReply = await getHuggingFaceResponse(userMessage);
            addMessageToChat(botReply, false);
            userInput.value = '';
        }
    });

    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendBtn.click();
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const saveJournalBtn = document.getElementById("saveJournalBtn");
    const journalInput = document.getElementById("journalInput");
    const journalEntries = document.getElementById("journalEntries");

    saveJournalBtn.addEventListener("click", async function() {
        const entryText = journalInput.value.trim();
        if (entryText) {
            // Send journal entry to the backend
            const response = await fetch('http://localhost:3000/api/journal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ entry: entryText }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Log success message

                // Create a new entry for the journal display
                const entryDiv = document.createElement("div");
                entryDiv.classList.add("journal-entry");
                entryDiv.textContent = entryText;
                journalEntries.appendChild(entryDiv); // Add the new entry to the journal entries section

                // Clear the input field
                journalInput.value = '';
            } else {
                const errorData = await response.json();
                console.error('Error saving journal entry:', errorData);
                alert("Failed to save journal entry.");
            }
        } else {
            alert("Please write something before saving!");
        }
    });
});
