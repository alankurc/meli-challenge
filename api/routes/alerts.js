const express = require('express');
const util = require("util");
const router = express.Router();

const connection = require('../helpers/database');

const qy = util.promisify(connection.query).bind(connection);

// ALL ALERTS
router.get('/alerts', async (req, res)=>{
    try {
        let sql = 'SELECT server, description, created_at, server_type FROM alerts ORDER BY created_at DESC';
        let response = await qy(sql, []);
        res.status(200).send(response);
    } catch (e) {
        res.status(500).send("Unexpected error");
    }
});

// ALERT BY PROBLEM
router.get('/alerts/:description', async (req, res)=>{
    try {
        let sql = 'SELECT server, description, created_at, server_type FROM alerts WHERE description LIKE ? ORDER BY created_at DESC';
        let response = await qy(sql, ['%' + req.params.description + '%']);
        if (response.length > 0) {
            res.json(response);
        } else {
            res.status(404).send("Alert doesn't exist");
        }
    }catch (e) {
        res.status(500).send("Unexpected error");
    }
});

// ALL ALERTS BY SERVER
router.get('/servers/:server', async (req, res)=>{
    try {
        let sql = 'SELECT server, description, created_at, server_type FROM alerts WHERE server = ? ORDER BY created_at DESC';
        let response = await qy(sql, ['%' + req.params.server + '%']);
        if (response.length > 0) {
            res.json(response);
        } else {
            res.status(404).send("Server doesn't exist");
        }
    }catch (e) {
        res.status(500).send("Unexpected error");
    }
});

module.exports = router;