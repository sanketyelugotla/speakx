const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());

const connection_url =
    'mongodb+srv://sanketyelugotla:sanket@speakx.abkna.mongodb.net/?retryWrites=true&w=majority&appName=speakx';
const dbName = 'speakx_questions';
const collectionName = 'speakx_questions';

let client;
let db;
let collection;

async function connectToMongoDB() {
    try {
        console.log("Attempting to connect to MongoDB...");
        client = new MongoClient(connection_url, { useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(dbName);
        collection = db.collection(collectionName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

connectToMongoDB().then(() => {
    app.get('/', async (req, res) => {
        res.send("Hello world")
    });

    app.get('/api/search', async (req, res) => {
        const { title = '', anagram, read, mcq, content, conversation, page = 1, limit = 50 } = req.query;

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
            if (content) types.push('CONTENT_ONLY')
            if (conversation) types.push('CONVERSATION')

            if (types.length) query.type = { $in: types };

            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);

            const results = await collection
                .find(query)
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber)
                .toArray();

            const totalCount = await collection.countDocuments(query);

            console.log(query);
            // console.log(results);
            
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

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

}).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
});
