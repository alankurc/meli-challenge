const express = require("express");
const mysql = require("mysql");
const util = require("util");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "meli-db"
});
connection.connect((error) => {
    if (error) {throw error;}
});

const qy = util.promisify(connection.query).bind(connection);

// ALERT RECEIVED
app.post("/api/alert", async (req, res) => {
    try {
        const server = req.body.server;
        const description = req.body.description;
        const server_type = req.body.server_type;

        let query = "INSERT INTO alerts (server, description, server_type) VALUE (?, ?, ?)";
        let response = await qy(query, [server, description, server_type]);
        res.status(200).send(response[0]);
    }
    catch (error) {
        res.status(500).send("Unexpected error")
        console.log(req.body.server);
    }
});

// GET ALL ALERTS
app.get("/api/alerts", async (req, res) => {
    try {
        let query = 'SELECT * from alerts';
        let response = await qy(query, []);
        res.status(200).send(response);
    } catch (e) {
        res.status(500).send("Unexpected error");
    }
});

// GET ALERTS BY SERVER
app.get("/api/servers/:server", async (req, res) => {
    try {
        let query = 'SELECT *, COUNT(server) from alerts WHERE server = ?';
        let response = await qy(query, [req.params.server]);
        if (response.length > 0) {
            res.json(response[0]);
        } else {
            res.status(404).send("Server doesn't exist");
        }
    }catch (e) {
        res.status(500).send("Unexpected error");
    }
});

// GET ALERTS BY DESCRIPTION
app.get("/api/alerts/:description", async (req, res) => {
    try {
        let query = 'SELECT *, COUNT(description) from alerts WHERE description LIKE ?';
        let response = await qy(query, [req.params.description]);
        if (response.length > 0) {
            res.json(response[0]);
        } else {
            res.status(404).send("The alert doesn't exist");
        }
    }catch (e) {
        res.status(500).send("Unexpected error");
    }
});

app.listen(port, () => { console.log("Server is running on port", port) });