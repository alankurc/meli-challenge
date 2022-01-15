const mysql = require("mysql");

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

module.exports = connection;