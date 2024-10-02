const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const AccountClosure = async (req, res) => {
  try {
    await client.connect();
    const database = client.db("FinPort");
    const clientsCollection = database.collection("clients");
    const paymentsCollection = database.collection("payments");
    const registrationCollection = database.collection("registration");
    const activityLogsCollection = database.collection("activityLogs");

    // Query the client's account by Id
    const account = await clientsCollection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!account) {
      return res
        .status(404)
        .json({ status: 404, message: `Client's account not found.` });
    }

    // Store client details for logging
    const { fname, lname, balance, item } = account;

    // Delete the account from the 'clients' collection
    await clientsCollection.deleteOne({ _id: new ObjectId(req.params.id) });

    // Delete the related records from the 'payments' collection
    await paymentsCollection.deleteMany({
      clientId: new ObjectId(req.params.id),
    });

    // Delete the related records from the 'registration' collection
    await registrationCollection.deleteMany({
      clientId: new ObjectId(req.params.id),
    });

    // Log the account closure in the activityLogs collection
    const activityLog = {
      action: "accountClosed",
      userId: req.params.id,
      timestamp: new Date().toISOString(),
      details: {
        fname,
        lname,
        balanceAtClosure: balance,
        item      },
    };
    await activityLogsCollection.insertOne(activityLog);

    return res.status(200).json({
      status: 200,
      message: `Client's account and related records have been successfully deleted.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  } finally {
    await client.close();
  }
};

module.exports = { AccountClosure };
