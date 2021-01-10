const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
const mongo_crud = require('./crud/crud');

let port = process.env.PORT || 3003;
port = typeof port === 'string' ? parseInt(port) : port;

// Middleware defined here
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/mongo',mongo_crud);

app.listen(port, () => {
    console.log(`MongoDB Server listening at http://localhost:${port}`)
});