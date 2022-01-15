const express = require('express');
const util = require("util");
const router = express.Router();

const connection = require('./database');

const qy = util.promisify(connection.query).bind(connection);

// SHOW 3 SERVER WITH MORE ALERTS IN THE LAST MONTH
router.get('/servers-more-alerts', async (req, res)=>{
    try {
        let sql = 'SELECT server, COUNT(server) c FROM alerts WHERE MONTH(created_at) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH ) GROUP BY server HAVING c >= 1 LIMIT 3'
        let response = await qy(sql, []);
        res.status(200).send(response);
    } catch (e) {
        res.status(500).send("Unexpected error");
    }
});

module.exports = router;