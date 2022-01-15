const express = require('express');
const util = require("util");
const router = express.Router();

const connection = require('./database');

const qy = util.promisify(connection.query).bind(connection);

// ALERT RECEIVED
router.post('/alert', async (req, res)=>{
    try {
        const server = req.body.server;
        const description = req.body.description;
        const server_type = req.body.server_type;

        sql = 'INSERT INTO alerts (server, description, server_type) VALUE (?, ?, ?)';
        response = await qy(sql, [server, description, server_type]);

        let lastAlert = response.insertId;
        sql = "SELECT * FROM alerts WHERE id = ?";
        response = await qy(sql, [lastAlert]);

        res.status(200).send(response[0]);
    } catch (e) {
        res.status(500).send("Unexpected error");
    }
});

module.exports = router;