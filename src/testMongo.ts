const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const uri = process.env.MONGODB_URI;

const testMongoConnection = async () => {
    if (!uri) {
        console.error('MongoDB URI is not defined.');
        return;
    }

    console.log("MongoDB URI:", uri);

    try {
        console.log('Connecting to MongoDB with Mongoose...');
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully with Mongoose');

        // Optional: Add a simple model and save a document to test further
        const testSchema = new mongoose.Schema({
            name: { type: String, required: true },
        });

        const TestModel = mongoose.model('Test', testSchema);

        // Create and save a test document
        const testDoc = new TestModel({ name: 'Mongoose Test Document' });
        await testDoc.save();
        console.log('Test document saved successfully:', testDoc);
    } catch (error) {
        console.error('Error connecting to MongoDB with Mongoose:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

testMongoConnection();