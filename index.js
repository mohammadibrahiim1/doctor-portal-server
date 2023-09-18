// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Connect to MongoDB

// Define routes and middleware as needed
app.get("/", (req, res) => {
  res.send(`hello doctor`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
