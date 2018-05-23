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
        con.query("SELECT * FROM teams LIMIT 25", function (err, teams, fields) {
            if (err) throw err;
            for (i in teams) {
                teams[i].PLATFORMS = getPlatformString(JSON.parse(teams[i].PLATFORMS));
            }
            let list = teams;
            list.reverse();
            res.render('pages/teams', {email: req.cookies.username, tab: '3', posts: list, term: ''});
        });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/create', function (req, res) {
    if (req.cookies.username) {
        res.render('pages/create-team', {tab: '3'});
    }
    else {
        res.redirect('/login');
    }
});

router.get('/teams/:team', function (req, res) {
    if (!req.cookies.username)
        res.redirect('/login');

    if(req.params.team == 'create')
        return;

    con.query("SELECT * FROM teams WHERE NAME = ? LIMIT 1", [req.params.team], function (err, result, fields) {
        if (err) throw err;
        if (result[0]) {
            result[0].PLATFORMS = getPlatformString(JSON.parse(result[0].PLATFORMS))
            res.render('pages/team-page', {email: req.cookies.username, tab: '3', team: result[0]});
        }
        else res.send('Error 404 team not found with the name ' + req.params.team);
    });
});

function getPlatformString(platforms) {
    let pl = '';
    if (platforms.Android) {
        pl = pl + 'Android ';
    }
    if (platforms.iOS) {
        pl = pl + 'iOS ';
    }
    if (platforms.Desktop) {
        pl = pl + 'Desktop ';
    }
    if (platforms.WebFront) {
        pl = pl + 'Web FrontEnd ';
    }
    if (platforms.webBack) {
        pl = pl + 'Web BackEnd';
    }
    return pl;
    console.log(pl);
}

module.exports = router;