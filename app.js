const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Example endpoint
app.get('/api/data', (req, res) => {
    const data = {
        message: 'Hello from Node.js API!',
        timestamp: new Date().toISOString()
    };
    res.json(data);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
