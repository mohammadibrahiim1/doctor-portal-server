// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
// Ylp5Tu7cuCdP2mjY
// doctor-portal
// Enable CORS
app.use(cors());

// Connect to MongoDB
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wuwpwwx.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const db = client.db("doctorsPortal");
  const appointmentsCollection = db.collection("appointmentOptions");
  try {
    app.get(`/api/v1/appointments`, async (req, res) => {
      const cursor = appointmentsCollection.find({});
      const result = await cursor.toArray();
      res.send({ status: true, items: result.length, data: result });
    });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch((error) => console.log(error));

// Define routes and middleware as needed
app.get("/", (req, res) => {
  res.send(`hello doctor-portal`);
});

app.listen(port, () => {
  console.log(`Doctor portal server is running on port ${port}`);
});
