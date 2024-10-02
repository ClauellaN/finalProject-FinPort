const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const getAllClosures = async (req, res) => {
  try {
    await client.connect();
    const database = client.db("FinPort");
    const activityLogsCollection = database.collection("activityLogs");

    // Fetch only account closure activities
    const closures = await activityLogsCollection
      .find({ action: "accountClosed" })
      .toArray();

    if (!closures.length) {
      return res.status(404).json({ message: "No account closures found." });
    }

    return res.status(200).json({ data: closures });
  } catch (error) {
    console.error("Error fetching account closures:", error);
    return res.status(500).json({ message: "Internal server error." });
  } finally {
    await client.close();
  }
};

module.exports = { getAllClosures };
