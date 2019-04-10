let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

router.get('/:accountToken', function (req, res) {
    let sql = "UPDATE accounts SET CONFIRMED = '1' WHERE email = ?";
    con.query(sql, [req.params.accountToken], function (err, result) {
        if (err) {
            res.render('pages/error.ejs', {
                message_main: "Internal Server Error (500)",
                message_redirect: `${err.errno}/${err.code}`,
                message_page: "Requested page: " + req.url.substr(0)
            });
            throw err;
        }
        res.render('pages/verified-confirmation');
    });
});

module.exports = {url: '/verification', router: router};