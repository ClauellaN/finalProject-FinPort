const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const clients = async (req, res) => {
  try {
    await client.connect();
    const database = client.db("FinPort");
    const clientsCollection = database.collection("clients");

    // Fetch all clients
    const allClients = await clientsCollection.find({}).toArray();

    if (!allClients.length) {
      return res
        .status(404)
        .json({ status: 404, message: "No clients found." });
    }

    // // Map over allClients to only return fname, lname, and balance
    // const clientDetails = allClients.map(({ fname, lname, balance }) => ({ fname, lname, balance }));

    // Map over allClients to return fullName (concatenating fname and lname) and balance
    const clientDetails = allClients.map(({ fname, lname, balance }) => ({
      fullName: `${fname} ${lname}`,
      balance,
    }));

    // Return client details
    return res.status(200).json({ status: 200, data: clientDetails });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  } finally {
    await client.close();
  }
};

module.exports = { clients };
