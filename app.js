const express = require('express');
const dotenv = require("dotenv")
dotenv.config()
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define the secret key

const SECRET_KEY = process.env.TOKEN;

// Middleware for checking the secret key
const checkSecretKey = (req, res, next) => {
  const key = req.query.secret || req.body.secret; // Check in query or body
  if (key && key === SECRET_KEY) {
    next(); // Continue if key is valid
  } else {
    res.status(403).send('Forbidden: Invalid Secret Key'); // Send 403 status
  }
};

// PUT request to /data to accept a data table
app.put('/data', checkSecretKey, (req, res) => {
  const dataTable = req.body; // Get the data table from the body
  if (!dataTable) {
    return res.status(400).send('Bad Request: Missing data table');
  }

  // Print the data table to the console
  console.log("Data table received:", JSON.stringify(dataTable, null, 2));
  
  // Respond with a success message
  res.send('Data table received and logged successfully.');
});

// Base route
app.get('/', (req, res) => {
  res.send('slo hangout website');
  res.render("main.html")
});

// Start the server
app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
