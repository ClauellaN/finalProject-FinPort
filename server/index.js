const express = require("express");
const morgan = require("morgan");
const { register } = require("./handlers/register");
const { login } = require("./handlers/login");
const { getClient } = require("./handlers/getClient");
const { makePayment } = require("./handlers/makePayment");
const { Balance } = require("./handlers/getBalance");
const { addClient } = require("./handlers/addClient");
const { Activity } = require("./handlers/getActivity");
const { AccountClosure } = require("./handlers/close");
const { clients } = require("./handlers/getReport");
const { getAllActivityLogs } = require("./handlers/getAllActivityLogs");
const { getAllPayments } = require("./handlers/getAllPayments");
const { getAllClosures } = require("./handlers/getAllClosures");

const PORT = 6000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })

  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

 
  // Register endpoint
  .post("/register", register)
  // login endpoint
  .post("/login", login)
  //endpoint to create a new client
  .post("/addclient", addClient)
  // endpoint to get a single client from database
  .post("/getclient", getClient)
  // GET: Fetch client by ID
  .get("/getclient/:id", getClient)
  //  endpoint to post a payment and reflect in mongo
  .post("/make-payment", makePayment)
  // endpoint to get the balance remaining
  .get("/balance/:id", Balance)
  // endpoint to get a single account account activity
  .get("/activity/:id", Activity)
  //endpoint to close the account
  .delete("/account/:id", AccountClosure)
  //endping to fetch all clients
  .get("/allclients" , clients)
  //endpoint to get all activity logs
  .get('/allActivityLogs' , getAllActivityLogs)
  // endpoint to get all payments
  .get("/allpayments", getAllPayments) 
  // endpoint to fetch all account closures
  .get("/allclosures", getAllClosures)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
