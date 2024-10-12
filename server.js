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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
