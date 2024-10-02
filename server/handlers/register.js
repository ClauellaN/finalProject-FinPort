
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("FinPort");

        const { fname, lname, phoneNumber, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password , 10);

        const newRegister = {
            fname,
            lname,
            phoneNumber,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        };

        const result = await db.collection("registration").insertOne(newRegister);

        console.log("New registration inserted with _id:", result);

        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
        console.error("An error occurred during registration:", error);
        res.status(500).json({ error: 'Registration failed' });
    } finally {
        console.log("Closing MongoDB connection...");
        await client.close();
        console.log("MongoDB connection closed.");
    }
};
 
module.exports = {
    register
};
