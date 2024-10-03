

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const Activity = async (req, res) => {
  try {
    await client.connect();
    const database = client.db("FinPort");
    const paymentsCollection = database.collection("payments");

    // Find all payment records with the same id
    const paymentActivity = await paymentsCollection
      .find({ clientId: new ObjectId(req.params.id) }) 
      .toArray(); 

    if (paymentActivity.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "No payment data found." });
    }

    // Format the payment activity data
    const activityDetails = paymentActivity.map((activity) => ({
      paymentAmount: activity.paymentAmount,
      date: activity.date,
      method: activity.method,
    }));

    // Return all the payments made by the client
    return res.status(200).json(activityDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  } finally {
    await client.close();
  }
};

module.exports = { Activity };
