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
async function connectToMongoDB() {
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
// API route to search by title with pagination
app.get('/api/search', async (req, res) => {
    const { title = '', anagram, read, mcq } = req.query;
  
    try {
      if (!collection) {
        return res.status(500).json({ message: 'Database connection is not available.' });
      }
  
      // Initialize the MongoDB query object
      const query = {
        title: { $regex: title, $options: 'i' },
      };
  
      // Add type filters to the query if they are present in the request
      if (anagram) query.type = 'anagram';
      if (read) query.type = 'read';
      if (mcq) query.type = 'mcq';
  
      const results = await collection.find(query).toArray();
  
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).json({ message: 'No document found with the specified criteria.' });
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
