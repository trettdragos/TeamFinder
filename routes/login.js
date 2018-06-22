let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let security = require("../other/security");

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

router.get('/', function (req, res) {
    if (req.cookies.username)
        res.redirect('/profile');
    else
        res.render('pages/login.ejs');
});

router.get('/auth', function (req, res) {
    user = req.query;
    con.query("SELECT * FROM accounts WHERE EMAIL = ? LIMIT 1", [user.email], function (err, result, fields) {
        if (err) throw err;

        if (result[0]) {
            security.checkPassword(user.password, result[0].PASSWORD, (passwordMatches) => {
                if (passwordMatches) {
                    if (result[0].CONFIRMED == '1') {
                        let newNotif = false;
                        let not = JSON.parse(result[0].NOTIFICATION);
                        for (i in not) {
                            if (not[i].vis == "false")
                                newNotif = true;
                        }
                        // debug.log("auth successful with user: " + user.email);
                        require('../other/security').generateJWT(user.email, (token) => {
                            res.send({
                                status: "successful",
                                token: token,
                                email: user.email,
                                uuid: result[0].ID,
                                notifications: JSON.stringify(result[0].NOTIFICATION),
                                newNotif: newNotif
                            });
                        });
                    } else {
                        res.send({status: "account not verified", email: user.email})
                    }
                } else {
                    // debug.log("auth failed for user: " + user.email);
                    res.send({status: "faileded", email: user.email});
                }
            });
        }
        else {
            // debug.log("auth failed for user: " + user.email);
            res.send({status: "faileded", email: user.email});
        }
    });
});
// router.get('/confirmed', function (req, res) {
//     res.render('pages/register-confirmed.ejs');
// });

module.exports = {url: '/login', router: router};