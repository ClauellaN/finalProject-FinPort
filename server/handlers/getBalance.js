const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const Balance = async (req, res) => {
  try {
    await client.connect();
    const database = client.db("FinPort");
    const paymentsCollection = database.collection("clients");

    // Assuming you're querying by client ID or something specific
    const paymentData = await paymentsCollection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!paymentData) {
      return res
        .status(404)
        .json({ status: 404, message: "Current Balance not found." });
    } else {
      // Assuming paymentData.balance contains the balance that needs formatting
      if (paymentData.balance) {
        paymentData.balance = parseFloat(paymentData.balance).toFixed(2); // Format the balance to 2 decimal places
      }
      return res.status(200).json(paymentData);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  } finally {
    await client.close();
  }
};

module.exports = { Balance };
