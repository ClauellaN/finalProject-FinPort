const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const getAllActivityLogs = async (req, res) => {
  try {
    await client.connect();
    const database = client.db("FinPort");
    const activityLogsCollection = database.collection("activityLogs");

    // Fetch all activity logs
    const allActivities = await activityLogsCollection.find({}).toArray();

    if (!allActivities.length) {
      return res
        .status(404)
        .json({ status: 404, message: "No activity logs found." });
    }

    // Return the list of all activities
    return res.status(200).json({ status: 200, data: allActivities });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  } finally {
    await client.close();
  }
};

module.exports = { getAllActivityLogs };
