const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public directory

// Create a table for storing emails
db.serialize(() => {
    db.run("CREATE TABLE emails (id INTEGER PRIMARY KEY, email TEXT UNIQUE)");
});

// API endpoint to subscribe
app.post('/api/subscribe', (req, res) => {
    const email = req.body.email;
    db.run("INSERT INTO emails (email) VALUES (?)", [email], function(err) {
        if (err) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        res.status(200).json({ message: 'Thank you for subscribing!' });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
