
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const clientsData = [
  {
    fname: "Kenneth",
    lname: "Spencer",
    phone: "559-957-4340",
    address: "416 Daniel Points",
    balance: 3785.75,
    item: "couch"
  },
  {
    fname: "Christina",
    lname: "Hughes",
    phone: "(812)185-8113",
    address: "58516 Harris Station",
    balance: 5599.75,
    item: "fridge"
  },
  {
    fname: "Connie",
    lname: "Tran",
    phone: "(973)839-4727",
    address: "913 Christensen Crescent",
    balance: 3309.86,
    item: "microwave"
  },
  {
    fname: "Peter",
    lname: "Carrillo",
    phone: "177-096-1958",
    address: "234 Amy Islands",
    balance: 6812.47,
    item: "living room set"
  },
  {
    fname: "Michael",
    lname: "Young",
    phone: "356.065.4611",
    address: "7340 Martin Crossing",
    balance: 6135.45,
    item: "stove"
  },
  {
    fname: "Mitchell",
    lname: "Sims",
    phone: "(579)058-9458",
    address: "87679 Horton Glen",
    balance: 8634.35,
    item: "queen bed"
  },
  {
    fname: "Sandra",
    lname: "Flynn",
    phone: "015.440.8379",
    address: "2480 Melanie Corners",
    balance: 9038.16,
    item: "king bed"
  },
  {
    fname: "Jennifer",
    lname: "Terry",
    phone: "(730)203-0247",
    address: "68236 Garrett Parkways",
    balance: 9728.6,
    item: "recliner"
  },
  {
    fname: "Carol",
    lname: "Nguyen",
    phone: "126-308-4345",
    address: "7884 Jonathan Heights",
    balance: 2713.61,
    item: "sofa"
  },
  {
    fname: "Sarah",
    lname: "Harrison",
    phone: "413.202.2327x0543",
    address: "58293 Debra Ridge",
    balance: 992.19,
    item: "fridge"
  }
];

const clientsImport = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");

    const db = client.db("FinPort");
    const result = await db.collection("clients").insertMany(clientsData);
    
    console.log(`${result.insertedCount} clients inserted!`);
  } catch (error) {
    console.error("Error inserting clients:", error);
  } finally {
    await client.close();
    console.log("Disconnected from the database");
  }
};
