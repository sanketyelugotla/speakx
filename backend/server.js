const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());

// MongoDB connection URL and database name
const connection_url = "mongodb+srv://sanketyelugotla:sanket@speakx.abkna.mongodb.net/?retryWrites=true&w=majority&appName=speakx";
const dbName = 'speakx_questions'; // Your database name
const collectionName = 'speakx_questions'; // Your collection name

let client;
let db;
let collection;

// Establish connection to MongoDB once when the app starts
const connectToMongoDB = async () => {
    try {
        // Create a new MongoClient instance
        client = new MongoClient(connection_url);

        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB');

        // Access the database and collection
        db = client.db(dbName);
        collection = db.collection(collectionName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

// Call the connection function when the app starts
connectToMongoDB();

// API route to search by title
app.get('/api/search', async (req, res) => {
    const titleToSearch = req.query.title; // Get the title from query params

    try {
        if (!collection) {
            // If collection is not yet initialized, return an error
            return res.status(500).json({ message: 'Database connection is not available.' });
        }

        // Search for a document with a specific title using regular expression
        const result = await collection.find({ title: { $regex: titleToSearch, $options: 'i' } }).limit(20).toArray();

        if (result.length > 0) {
            // If documents are found, return them
            res.json(result);
        } else {
            // If no documents are found, return an appropriate message
            res.status(404).json({ message: 'No document found with the specified title.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
