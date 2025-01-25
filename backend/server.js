const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());

// MongoDB connection URL and database name
const connection_url =
    'mongodb+srv://sanketyelugotla:sanket@speakx.abkna.mongodb.net/?retryWrites=true&w=majority&appName=speakx';
const dbName = 'speakx_questions'; // Your database name
const collectionName = 'speakx_questions'; // Your collection name

let client;
let db;
let collection;

// Establish connection to MongoDB once when the app starts
async function connectToMongoDB() {
    console.log("Called connect");
    
    try {
        client = new MongoClient(connection_url);
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(dbName);
        collection = db.collection(collectionName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}


app.get('/', (req, res) => {
    console.log("logged");
    
    res.send('Hello, world!');
});

// API route to search by title with pagination
app.get('/api/search', async (req, res) => {
    connectToMongoDB();
    const { title = '', anagram, read, mcq, page = 1, limit = 50 } = req.query;

    try {
        if (!collection) {
            return res.status(500).json({ message: 'Database connection is not available.' });
        }

        const query = { title: { $regex: "^" + title, $options: 'i' } };
        console.log(query);
        

        const types = [];
        if (anagram) types.push('ANAGRAM');
        if (read) types.push('READ_ALONG');
        if (mcq) types.push('MCQ');
        if (types.length) query.type = { $in: types };

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        // console.log(query)
        
        const results = await collection
            .find(query)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .toArray();

        const totalCount = await collection.countDocuments(query);

        return res.json({
            results,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalCount / limitNumber),
                totalCount,
            },
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
