// const { MongoClient } = require("mongodb");
// require("dotenv").config();
// const { MONGO_URI } = process.env; // Load MongoDB URI from .env file

// // The getClient function handles the POST request to search for clients based on various criteria
// const getClient = async (req, res) => {
//   const client = new MongoClient(MONGO_URI); // Initialize MongoDB client
  
//   try {
//     // Connect to the MongoDB database
//     await client.connect();
//     console.log("Connected to the database");

//     const database = client.db("FinPort"); // Access the database named "FinPort"
//     const collection = database.collection("clients"); // Access the collection named "clients"

//     // Destructure the incoming fields from the request body
//     const { fname, lname } = req.body;

//     // Build a query object dynamically based on the provided fields
//     const query = {};

//     // If both first name and last name are provided, use them together in the query
//     if (fname && lname) {
//       query.fname = { $regex: new RegExp(fname, "i") }; 
//       query.lname = { $regex: new RegExp(lname, "i") }; 
//     }

//     // Perform the search using the dynamically constructed query object
//     const clientData = await collection.findOne(query);

//     // If no client is found, return a 404 status with a "Client not found" message
//     if (!clientData) {
//       return res.status(404).json({ message: "Client not found" });
//     }

//     // If the client is found, send the client data back to the frontend
//     return res.status(200).json(clientData);
//   } catch (error) {
//     // If an error occurs, log it and return a 500 status with an error message
//     console.error("Error fetching client:", error.message);
//     return res.status(500).json({ message: "Internal Server Error" });
//   } finally {
//     // Close the MongoDB connection once the operation is complete
//     await client.close();
//   }
// };

// module.exports = {
//   getClient,
// };


const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env; // Load MongoDB URI from .env file

// The getClient function handles both GET (by ID) and POST (by search criteria)
const getClient = async (req, res) => {
  const client = new MongoClient(MONGO_URI); // Initialize MongoDB client
  
  try {
    // Connect to the MongoDB database
    await client.connect();
    console.log("Connected to the database");

    const database = client.db("FinPort"); // Access the database named "FinPort"
    const collection = database.collection("clients"); // Access the collection named "clients"

    // Check if this is a GET or POST request
    if (req.method === "GET") {
      // GET: Fetch by client ID from URL params
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid client ID" });
      }

      // Query the database for the client by ID
      const clientData = await collection.findOne({ _id: new ObjectId(id) });

      if (!clientData) {
        return res.status(404).json({ message: "Client not found" });
      }

      // Send the client data back to the frontend
      return res.status(200).json(clientData);
    } 

    // POST: Search by fname and lname
    if (req.method === "POST") {
      // Destructure the incoming fields from the request body
      const { fname, lname } = req.body;

      // Build a query object dynamically based on the provided fields
      const query = {};

      // If both first name and last name are provided, use them together in the query
      if (fname && lname) {
        query.fname = { $regex: new RegExp(fname, "i") }; // Case-insensitive regex search for fname
        query.lname = { $regex: new RegExp(lname, "i") }; // Case-insensitive regex search for lname
      }

      // Perform the search using the dynamically constructed query object
      const clientData = await collection.findOne(query);

      // If no client is found, return a 404 status with a "Client not found" message
      if (!clientData) {
        return res.status(404).json({ message: "Client not found" });
      }

      // If the client is found, send the client data back to the frontend
      return res.status(200).json(clientData);
    }
    
  } catch (error) {
    // If an error occurs, log it and return a 500 status with an error message
    console.error("Error fetching client:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    // Close the MongoDB connection once the operation is complete
    await client.close();
  }
};

module.exports = {
  getClient,
};
