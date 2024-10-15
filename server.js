const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Serve dashboard.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Endpoint to handle mood data
app.post('/api/mood', (req, res) => {
    console.log('Mood Data Received:', req.body);
    // Here, you would typically save the data to a database
    res.json({ message: 'Mood data received', data: req.body });
});

// Endpoint to handle goals data
app.post('/api/goals', (req, res) => {
    console.log('Goal Data Received:', req.body);
    // Here, you would typically save the data to a database
    res.json({ message: 'Goal data received', data: req.body });
});
// Route for saving journal entries
app.post('/api/journal', (req, res) => {
    const journalEntry = req.body.entry;

    // Here, you would typically save the journal entry to a database.
    // For now, we will just log it to the console.
    console.log('Received journal entry:', journalEntry);

    // Respond with a success message
    res.status(200).json({ message: 'Journal entry saved successfully!', entry: journalEntry });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
