const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");

// nodemon ./jail-manager-backend.js

const app = express();
const port = 3000;
app.use(cors({
  origin: "http://localhost:5173"
}));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/prison_management');
mongoose.connection.on('connected', () => console.log('MongoDB connected successfully'));
mongoose.connection.on('error', (err) => console.log('MongoDB connection error:', err));

app.use(express.json());

// Import routes
const prisonerRoutes = require(path.join(__dirname, './routes/prisonerRoutes.js'));
const visitorRoutes = require(path.join(__dirname, './routes/visitorRoutes.js'));
const staffRoutes = require(path.join(__dirname, './routes/staffRoutes.js'))
const dashboardRoutes = require(path.join(__dirname, './routes/dashboard.js'));
const protectedRoutes = require(path.join(__dirname, './routes/protectedRoute.js'));

// Mount routes
app.use('/prisoner', prisonerRoutes);
app.use('/visitor', visitorRoutes);
app.use('/staff', staffRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/protected', protectedRoutes);

app.get('/', (req, res) => {
    res.send('Jail Management System Backend Running!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});