const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Route for serving the dashboard page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// API to handle mood submission
app.post('/api/mood', (req, res) => {
    const moodData = req.body;
    console.log('Mood Data:', moodData);

    // You can save moodData to a database here (future integration)
    res.status(200).json({ message: 'Mood received!' });
});

// API to handle goal submission
app.post('/api/goals', (req, res) => {
    const goalData = req.body;
    console.log('Goal Data:', goalData);

    // You can save goalData to a database here (future integration)
    res.status(200).json({ message: 'Goal received!' });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
