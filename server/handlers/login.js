
const {MongoClient} = require("mongodb");
require("dotenv").config();
const {MONGO_URI} = process.env;

const bcrypt = require("bcrypt");

const login = async (req, res) => {
    const client = new MongoClient(MONGO_URI); // Initialize a new MongoDB client with the connection string

    try {
        await client.connect(); // Attempt to connect to MongoDB
        const db = client.db("FinPort"); // Select the 'FinPort' database

        const { email, password } = req.body; // Destructure email and password from the request body

        // Find the user by email in the 'registration' collection
        const user = await db.collection("registration").findOne({ email });
        
        // If no user is found with the given email, return an error response
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the entered password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        
        // If the passwords do not match, return an error response
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // If the passwords match, return a success response with the user's ID
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        // If an error occurs during the process, log the error and return a server error response
        console.error("An error occurred during login:", error);
        res.status(500).json({ error: 'Login failed' });
    } finally {
        // Close the MongoDB connection regardless of success or failure
        await client.close();
    }
};

module.exports = {
    login
};

