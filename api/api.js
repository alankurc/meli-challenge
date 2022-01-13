const express = require("express");
const mysql = require("mysql");
const util = require('util');
let {response} = require("express");

const app = express();
const port = process.env.port || 80;

app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "meli-db"
});
connection.connect(error => {
    if (error) throw error;
    console.log("Server is running");
});

const qy = util.promisify(connection.query).bind(connection);

// ALERT RECEIVED
app.post('/alert', async (req, res)=>{
    try {
        const server = req.params.server;
        const description = req.params.description;
        const server_type = req.params.server_type;

        sql = 'INSERT INTO alerts (server, description, server_type) VALUE (?, ?, ?)';
        response = await qy(sql, [server, description, server_type]);
        res.status(200).send(response[0]);
    } catch (e) {
        res.status(500).send("Unexpected error");
    }
});

// ALL ALERTS
app.get('/alerts', async (req, res)=>{
    try {
        let sql = 'SELECT server, description, created_at, server_type FROM alerts ORDER BY created_at DESC';
        let response = await qy(sql, []);
        res.status(200).send(response);
    } catch (e) {
        res.status(500).send("Unexpected error");
    }
});

// ALERT BY PROBLEM
app.get('/alerts/:description', async (req, res)=>{
    try {
        let sql = 'SELECT server, description, created_at, server_type FROM alerts WHERE description LIKE ? ORDER BY created_at DESC';
        let response = await qy(sql, ['%' + req.params.description + '%']);
        if (response.length > 0) {
            res.json(response[0]);
        } else {
            res.status(404).send("Alert doesn't exist");
        }
    }catch (e) {
        res.status(500).send("Unexpected error");
    }
});

// ALL ALERTS BY SERVER
app.get('/servers/:server', async (req, res)=>{
    try {
        let sql = 'SELECT server, description, created_at, server_type FROM alerts WHERE server = ?';
        let response = await qy(sql, [req.params.server]);
        if (response.length > 0) {
            res.json(response[0]);
        } else {
            res.status(404).send("Server doesn't exist");
        }
    }catch (e) {
        res.status(500).send("Unexpected error");
    }
});

// SHOW 3 SERVER WITH MORE ALERTS IN THE LAST MONTH
app.get('/servers-more-alerts', async (req, res)=>{
    try {
        let sql = 'SELECT server, COUNT(server) c FROM alerts GROUP BY server HAVING c >= 1 LIMIT 3'
        let response = await qy(sql, []);
        res.status(200).send(response);
    } catch (e) {
        res.status(500).send("Unexpected error");
    }
});

app.listen(port, () => { console.log("Server is running on port", port) });