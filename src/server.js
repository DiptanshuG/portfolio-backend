const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();



app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.get('/', (req, res) => {
    res.send('API is running...');
});

// Use the user routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
