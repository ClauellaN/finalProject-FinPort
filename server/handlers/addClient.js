const { MongoClient , ObjectId} = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const addClient = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("Connected to database");
    const database = client.db("FinPort");
    const collection = database.collection("clients");

    // Destructure the request body
    const { _id, fname, lname, phone, address, balance, item } = req.body;

    // Input validation
    if (
      !fname ||
      !lname ||
      !phone ||
      !address ||
      balance == null ||
      !item
    ) {
      return res
        .status(400)
        .json({ status: 400, message: "Missing required fields" });
    }

    // Check for duplicate client
    const existingClient = await collection.findOne({ _id });
    if (existingClient) {
      return res
        .status(409)
        .json({ status: 409, message: "Client already exists" });
    }

    // New client document
    const newClient = {
     _id: new ObjectId(),
      fname,
      lname,
      phone,
      address,
      balance,
      item,
    };

    // Insert the new client
    await collection.insertOne(newClient);
    return res.status(200).json({
      status: 200,
      message: "Client created successfully!",
      data: newClient,
    });
  } catch (error) {
    console.log("Error:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error", error });
  } finally {
    // Closing the database connection
    await client.close();
    console.log("Disconnected from database");
  }
};

module.exports = {
  addClient,
};
