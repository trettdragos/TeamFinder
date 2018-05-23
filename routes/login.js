let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

router.get('/', function (req, res) {
    res.render('pages/login.ejs');
});

router.get('/auth', function (req, res) {
    user = req.query;
    con.query("SELECT * FROM accounts WHERE EMAIL = ? AND PASSWORD = ? LIMIT 1", [user.email, user.password], function (err, result, fields) {
        if (err) throw err;
        if (result[0]) {
            if (result[0].CONFIRMED == '1') {
                var newNotif = false;
                var not = JSON.parse(result[0].NOTIFICATION);
                for (i in not) {
                    if (not[i].vis == "false")
                        newNotif = true;
                }
                console.log("auth succesfull with user: " + user.email);
                res.send({
                    status: "succesfull",
                    email: user.email,
                    notifications: JSON.stringify(result[0].NOTIFICATION),
                    newNotif: newNotif
                });
            } else {
                res.send({status: "account not verified", email: user.email})
            }
        }
        else {
            console.log("auth failed for user: " + user.email);
            res.send({status: "faileded", email: user.email});
        }
    });
});
// router.get('/confirmed', function (req, res) {
//     res.render('pages/register-confirmed.ejs');
// });

module.exports = router;