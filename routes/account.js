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
    if (req.cookies.username) {
        let searchFor = '%' + req.cookies.username + '%';
        console.log(searchFor);
        con.query("SELECT * FROM projects WHERE COLLABORATORS LIKE ? OR FOUNDER = ?", [searchFor, req.cookies.username], function (err, projects, fields) {
            if (err) throw err;
            con.query("SELECT * FROM teams WHERE POSTS LIKE ? OR LEADER = ?", [searchFor, req.cookies.username], function (errTeams, teams, fields2) {
                if (errTeams) throw errTeams;
                con.query("SELECT NOTIFICATION FROM accounts WHERE EMAIL = ?", [req.cookies.username], function (err3, result, fields3) {
                    if (err3) throw err3;
                    res.render('pages/account', {
                        tab: '4',
                        email: req.cookies.username,
                        projects: projects,
                        teams: teams,
                        notifications: JSON.parse(result[0].NOTIFICATION)
                    });
                });
            });
        });
    }
    else {
        res.redirect('/login');
    }
});

module.exports = {url: '/account', router: router};