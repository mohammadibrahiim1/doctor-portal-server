// const cookieSession = require('cookie-session');
const passport = require("passport");
const passportSetup = require("./passport");

// import { Strategy as GoogleStrategy } from 'passport-google-oauth';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import expressSession from express-session

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

// Connect to MongoDB
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
  const servicesCollection = db.collection("services");
  const doctorsCollection = db.collection("doctors");
  const articlesCollection = db.collection("articles");
  const usersCollection = db.collection("users");
  try {
    app.get(`/api/v1/appointments`, async (req, res) => {
      const cursor = appointmentsCollection.find({});
      const result = await cursor.toArray();
      res.send({ status: true, items: result.length, data: result });
    });

    // get all doctors
    app.get(`/api/v1/doctors`, async (req, res) => {
      if (req.query.category) {
        const category = req.query.category;
        const result = await doctorsCollection.find({ category }).toArray();
        res.send({
          status: true,
          items: result.length,
          data: result,
        });
      } else {
        const query = {};
        const result = await doctorsCollection.find(query).toArray();
        res.send({ status: true, items: result.length, data: result });
      }
      // const query = {};
      // const category = req.query.category;
      // if (category) {
      //   query.category = category;
      // }
      // const cursor = doctorsCollection.find(query).toArray();
      // res.send(cursor);
      // // const result = await cursor.toArray();
      // // res.send({ status: true, items: result.length, data: result });
    });

    // get  doctor by id
    app.get(`/api/v1/doctor/:id`, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await doctorsCollection.findOne(query);
      res.send({ status: true, data: result });
    });

    // get doctor by category

    // app.get(`/api/v1/doctors`, async (req, res) => {
    //   const category = req.query.category;
    //   const query = {};
    //   if (category) {
    //     query.category = category
    //   }
    // });

    // get services data
    app.get(`/api/v1/services`, async (req, res) => {
      const cursor = servicesCollection.find({});
      const result = await cursor.toArray();
      res.send({ status: true, items: result.length, data: result });
    });

    // get service by id
    app.get(`/api/v1/service/:id`, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await servicesCollection.findOne(query);
      res.send({ status: true, data: result });
    });

    // get articles data
    app.get(`/api/v1/articles`, async (req, res) => {
      const cursor = articlesCollection.find({});
      const result = await cursor.toArray();
      res.send({ status: true, items: result.length, data: result });
    });

    // get articles data by id
    app.get(`/api/v1/article/:id`, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await articlesCollection.findOne(query);
      res.send({ status: true, data: result });
    });

    // users collection

    app.post("/api/v1/user", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      console.log(result);
      res.send(result);
    });

    app.get("/api/v1/user/:email", async (req, res) => {
      const email = req.params.email;

      const result = await usersCollection.findOne({ email });

      if (result?.email) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    });

    // authentication

    // app.use( new cookieSession({
    //   name: 'session', keys: 'doctor-portal'
    // }))

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(
      cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
      })
    );

    app.use("/auth", authRoute);

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send(`hello doctor-portal`);
});

app.listen(port, () => {
  console.log(`Doctor portal server is running on port ${port}`);
});
