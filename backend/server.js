const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

// Initialize SQLite Database
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create the contacts table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Insert into SQLite database
  const query = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
  db.run(query, [name, email, message], function (err) {
    if (err) {
      console.error('Error inserting data', err.message);
      return res.status(500).json({ error: 'Failed to save message.' });
    }

    console.log(`--- New Contact Submission (ID: ${this.lastID}) ---`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log('------------------------------');

    res.status(200).json({ success: true, message: 'Message received successfully!' });
  });
});

// New route to view all contacts in the database
app.get('/api/contacts', (req, res) => {
  const query = `SELECT * FROM contacts ORDER BY created_at DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching data', err.message);
      return res.status(500).json({ error: 'Failed to retrieve messages.' });
    }
    res.json(rows);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
