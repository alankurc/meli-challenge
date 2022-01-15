const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors())

const port = process.env.port || 3050;
app.use(express.json());

// ROUTES
app.use('/', require('./routes/alerts'));
app.use('/', require('./routes/servers'));
app.use('/', require('./routes/entries'));


app.listen(port, () => { console.log("Server is running on port", port) });