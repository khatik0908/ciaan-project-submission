const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // <-- THIS LINE WAS MISSING

// Load the variables from our .env file
dotenv.config();

const app = express();

// Add CORS middleware
app.use(cors()); // <-- THIS LINE WAS MISSING

// Middleware to parse JSON bodies
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));

// Health Check Route for Render
app.get('/', (req, res) => {
    res.send('Backend API is running...');
});

// Connect to our MongoDB database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));