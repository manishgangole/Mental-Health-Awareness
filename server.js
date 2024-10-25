const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

// MongoDB URI
const uri = 'mongodb://127.0.0.1:27017'; // Adjust if using a different MongoDB setup
const client = new MongoClient(uri);
let db;
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

// Call the function to connect to the database
connectToDatabase();

// Serve dashboard.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Endpoint to handle mood data
app.post('/api/mood', async (req, res) => {
    const moodData = req.body;

    try {
        const database = client.db('MongoDb'); // Your database name
        const collection = database.collection('mood'); // Your collection name
        await collection.insertOne(moodData); // Save the mood data
        res.json({ message: 'Mood data received', data: moodData });
    } catch (error) {
        console.error('Error saving mood data:', error);
        res.status(500).json({ message: 'Error saving mood data' });
    }
});

// Endpoint to get all moods
app.get('/api/moods', async (req, res) => {
    try {
        const database = client.db('MongoDb');
        const collection = database.collection('mood');
        const moods = await collection.find().toArray(); // Fetch all moods
        res.json(moods);
    } catch (error) {
        console.error('Error retrieving moods:', error);
        res.status(500).json({ message: 'Error retrieving moods' });
    }
});

// Endpoint to handle goals data
app.post('/api/goals', async (req, res) => {
    const goalsData = req.body;

    try {
        const database = client.db('MongoDb'); // Your database name
        const collection = database.collection('goals'); // Your collection name
        await collection.insertOne(goalsData); // Save the goals data
        res.json({ message: 'Goal data saved successfully', data: goalsData });
    } catch (error) {
        console.error('Error saving goal data:', error);
        res.status(500).json({ message: 'Error saving goal data' });
    }
});

// Route for saving journal entries
app.post('/api/journal', async (req, res) => {
    const journalEntry = req.body.entry;

    try {
        const database = client.db('MongoDb');
        const collection = database.collection('journal');
        await collection.insertOne({ entry: journalEntry }); // Save the journal entry
        res.status(200).json({ message: 'Journal entry saved successfully!', entry: journalEntry });
    } catch (error) {
        console.error('Error saving journal entry:', error);
        res.status(500).json({ message: 'Error saving journal entry' });
    }
});

// Endpoint for saving personality test data
app.post('/api/personality', async (req, res) => {
    const personalityData = req.body;

    try {
        const database = client.db('MongoDb');
        const collection = database.collection('personality');
        await collection.insertOne(personalityData); // Save the personality data
        res.status(200).json({ message: 'Personality test data saved successfully!', data: personalityData });
    } catch (error) {
        console.error('Error saving personality test data:', error);
        res.status(500).json({ message: 'Error saving personality test data' });
    }
});
// API to handle depression test submission
app.post('/api/depression-test', async (req, res) => {
    try {
        const { score, message } = req.body;
        const database = client.db('MongoDb');
        // Specify the collection for depression test results
        const collection = db.collection('depressionTestResults');
        await collection.insertOne({ score, message, timestamp: new Date() }); // Save with a timestamp

        res.status(200).json({ message: 'Depression test result saved successfully!' });
    } catch (error) {
        console.error('Error saving depression test result:', error);
        res.status(500).json({ message: 'Failed to save depression test result' });
    }
});

app.post('/api/procrastination-test', async (req, res) => {
    try {
        const { score, message } = req.body;
        const database = client.db('MongoDb');
        // Use a specific collection for procrastination test results
        const collection = db.collection('procrastinationTestResults');
        await collection.insertOne({ score, message, timestamp: new Date() }); // Save with a timestamp

        res.status(200).json({ message: 'Procrastination test result saved successfully!' });
    } catch (error) {
        console.error('Error saving procrastination test result:', error);
        res.status(500).json({ message: 'Failed to save procrastination test result' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Disable caching
app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-store');
    next();
});
