const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const getAllPayments = async (req, res) => {
  try {
    await client.connect();
    const database = client.db("FinPort");
    const activityLogsCollection = database.collection("activityLogs");

    // Fetch only payment activities
    const payments = await activityLogsCollection
      .find({ action: "payment" })
      .toArray();

    if (!payments.length) {
      return res.status(404).json({ message: "No payment activities found." });
    }

    return res.status(200).json({ data: payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return res.status(500).json({ message: "Internal server error." });
  } finally {
    await client.close();
  }
};

module.exports = { getAllPayments };
