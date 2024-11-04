const MySQL = require("mysql");
const config = require("./config.json")

let MysqlMerpati = MySQL.createPool(config.mysql)
MysqlMerpati.getConnection((err, connect) => {
    if(connect) return console.log("\x1b[36m[MYSQL]: \x1b[0mDatabase MySql telah berhasil terhubung!");
    console.log("\x1b[36m[MYSQL]: \x1b[0mDatabase MySql tidak dapat terhubung!")
})

module.exports = MysqlMerpati;