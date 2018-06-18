let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

router.get('/*', (req, res, next) => {
    if (!req.cookies.username || !req.cookies.token) {
        res.redirect('/login');
    } else if (req.cookies.username) {
        require('../other/security').verifyCookieToken(req.cookies.username, req.cookies.token, (result) => {
            if (!result)
                res.redirect('/logout?skip=true');
            else next();
        })
    }
});

router.get('/', function (req, res) {
    if (req.cookies.username) {
        con.query("SELECT * FROM teams WHERE ACTIVE=1 LIMIT 25", function (err, teams, fields) {
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

router.get('/search', function (req, res) {
    res.redirect('/teams');
});

router.get('/search/:searchTerm', function (req, res) {
    if (!req.cookies.username)
        res.redirect('/login');
    let searchFor = '%' + req.params.searchTerm + '%';
    con.query("SELECT * FROM teams WHERE NAME LIKE ?", [searchFor], function (err, result, fields) {
        if (err) throw err;
        for (i in result) {
            result[i].PLATFORMS = getPlatformString(JSON.parse(result[i].PLATFORMS));
        }
        res.render('pages/teams', {
            email: req.cookies.username,
            tab: '3',
            posts: result,
            term: req.params.searchTerm
        });
    });
});

router.get('/register', function (req, res) {
    team = req.query;
    console.log('checking if team...' + team.name + ' is in db');
    con.query("SELECT * FROM teams WHERE NAME = ? LIMIT 1", [team.name], function (err, result, fields) {
        if (err) throw err;
        if (result[0]) {
            console.log("team failed to register: " + team.name);
            res.send({status: "failed, team already exists"});
        }
        else {
            console.log("register team: " + result[0]);
            con.query("INSERT INTO teams (ID, NAME, SUMMARY, HACKATON, SECTION, START_DATE, END_DATE, PLATFORMS, RESOURCE_LINK, NR_MEMBERS, POSTS, LEADER, ACTIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [0, team.name, team.summary, team.hackaton, team.section, team.startDate, team.endDate, JSON.stringify(team.platforms), team.resource_link, team.nrMembers, '', team.leader, 1], function (err, result) {
                if (err) {
                    socket.emit('register team', {status: JSON.stringify(err)});
                }
                console.log('registered team ' + team.name + ' successful');
                res.send({status: "succesfull"});
            });
        }
    });
});

router.get('/finish', function(req, res){
    team = req.query.name;
    con.query("UPDATE teams SET ACTIVE=0 WHERE NAME=?", [team], function(err, result){
        if(err) throw err;
        res.send({status:"succesfull"});
    });
});

router.get('/update', function(req, res){
    team = req.query;
    console.log("this is the update: "+JSON.stringify(team));
    con.query("UPDATE teams SET SUMMARY=?, RESOURCE_LINK=?, HACKATON=?, SECTION=?, START_DATE=?, END_DATE=? WHERE NAME=?", [team.summary, team.resource_link, team.hackaton, team.section, team.startDate, team.endDate, team.name], function(err, result){
        if(err) throw err;
        res.send({status:"succesfull"});
    });
});

router.get('/:team', function (req, res) {
    if (!req.cookies.username)
        res.redirect('/login');

    console.log('Access teams from page: ' + req.params.team);

    if (req.params.team == 'create')
        return;

    con.query("SELECT * FROM teams WHERE NAME = ? LIMIT 1", [req.params.team], function (err, result, fields) {
        if (err) throw err;
        if (result[0]) {
            result[0].PLATFORMS = getPlatformString(JSON.parse(result[0].PLATFORMS))
            res.render('pages/team-page', {email: req.cookies.username, tab: '3', team: result[0]});
        }
        else {
            res.render('pages/404.ejs', {
                message_main: "The team you're looking for does not exist (404)",
                message_redirect: `Click <a href=\"/teams\">here</a> to go back`,
                message_page: "Requested team: " + req.params.team
            });
        }
    });
});

router.get('/edit/:team', function (req, res) {
    if (!req.cookies.username)
        res.redirect('/login');

    console.log('Access teams from page: ' + req.params.team);

    if (req.params.team == 'create')
        return;

    con.query("SELECT * FROM teams WHERE NAME = ? LIMIT 1", [req.params.team], function (err, result, fields) {
        if (err) throw err;
        if (result[0]) {
            result[0].PLATFORMS = getPlatformString(JSON.parse(result[0].PLATFORMS))
            res.render('pages/edit-team', {email: req.cookies.username, tab: '3', team: result[0]});
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

module.exports = {url: '/teams', router: router};