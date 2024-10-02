// const { MongoClient, ObjectId } = require("mongodb");
// require("dotenv").config();
// const { MONGO_URI } = process.env;

// const client = new MongoClient(MONGO_URI);

// const makePayment = async (req, res) => {
//   let { clientId, paymentAmount, method, cardDetails } = req.body;

//   // Convert paymentAmount to a number in the backend to ensure it's treated as such
//   paymentAmount = paymentAmount;
//   // console.log(
//   //   "Payment amount before sending to backend in handler:",
//   //   paymentAmount
//   // );

//   if (!paymentAmount || isNaN(paymentAmount)) {
//     return res.status(400).json({ message: "Invalid payment amount" });
//   }
//   try {
//     await client.connect();
//     const database = client.db("FinPort");
//     const clientsCollection = database.collection("clients");
//     const paymentsCollection = database.collection("payments");

//     const clientObjectId = new ObjectId(clientId);

//     // Find the client by first and last name
//     const clientData = await clientsCollection.findOne({ _id: clientObjectId });
//     console.log("This is the client data", clientData);

//     if (!clientData) {
//       return res.status(404).json({ message: "Client not found" });
//     }

//     // Update the client's balance
//     const newBalance = clientData.balance - paymentAmount;
//     await clientsCollection.updateOne(
//       { _id: clientObjectId },
//       { $set: { balance: newBalance } }
//     );

//     // Insert a new record into the payments collection
//     const paymentRecord = {
//       clientId: clientData._id,
//       fname: clientData.fname,
//       lname: clientData.lname,
//       paymentAmount,
//       method,
//       cardDetails: method !== "cash" ? cardDetails : null,
//       date: new Date(),
//       status: "successful",
//     };
//     await paymentsCollection.insertOne(paymentRecord);

//     return res.status(200).json({ message: "Payment applied", newBalance });
//   } catch (error) {
//     console.error("Error applying payment:", error);
//     return res
//       .status(500)
//       .json({ message: "An error occurred while processing payment" });
//   } finally {
//     await client.close();
//   }
// };

// module.exports = { makePayment };

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const makePayment = async (req, res) => {
  let { clientId, paymentAmount, method, cardDetails } = req.body;

  // Ensure paymentAmount is treated as a number
  paymentAmount = parseFloat(paymentAmount);

  if (!paymentAmount || isNaN(paymentAmount)) {
    return res.status(400).json({ message: "Invalid payment amount" });
  }

  try {
    await client.connect();
    const database = client.db("FinPort");
    const clientsCollection = database.collection("clients");
    const paymentsCollection = database.collection("payments");
    const activityLogsCollection = database.collection("activityLogs");

    const clientObjectId = new ObjectId(clientId);

    // Find the client by _id
    const clientData = await clientsCollection.findOne({ _id: clientObjectId });
    console.log("This is the client data", clientData);

    if (!clientData) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Update the client's balance
    const newBalance = clientData.balance - paymentAmount;
    await clientsCollection.updateOne(
      { _id: clientObjectId },
      { $set: { balance: newBalance } }
    );

    // Insert a new record into the payments collection
    const paymentRecord = {
      clientId: clientData._id,
      fname: clientData.fname,
      lname: clientData.lname,
      paymentAmount,
      method,
      cardDetails: method !== "cash" ? cardDetails : null,
      date: new Date(),
      status: "successful",
    };
    await paymentsCollection.insertOne(paymentRecord);

    // Log the payment activity in the activityLogs collection
    const activityLog = {
      action: "payment",
      userId: clientData._id,
      timestamp: new Date().toISOString(),
      details: {
        paymentAmount,
        newBalance,
        method,
        cardDetails: method !== "cash" ? cardDetails : null,
      },
    };
    await activityLogsCollection.insertOne(activityLog);

    // Return success response
    return res.status(200).json({ message: "Payment applied", newBalance });
  } catch (error) {
    console.error("Error applying payment:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while processing payment" });
  } finally {
    await client.close();
  }
};

module.exports = { makePayment };
