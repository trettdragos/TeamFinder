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
        con.query("SELECT * FROM projects LIMIT 25", function (err, projects, fields) {
            if (err) throw err;
            for (i in projects) {
                projects[i].PLATFORMS = getPlatformString(JSON.parse(projects[i].PLATFORMS));
            }
            let list = projects;
            list.reverse();
            res.render('pages/projects.ejs', {email: req.cookies.username, tab: '2', posts: list, term: ''});
        });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/create', function (req, res) {
    if (req.cookies.username) {
        res.render('pages/create-project', {tab: '2'});
    }
    else {
        res.redirect('/login');
    }
});

router.get('/:project', function (req, res) {
    if (!req.cookies.username)
        res.redirect('/login');

    if(req.params.project == 'create') {
        console.log("TEST CACA /:project instead of /create")
        return;
    }
    con.query("SELECT * FROM projects WHERE NAME = ? LIMIT 1", [req.params.project], function (err, result, fields) {
        if (err) throw err;
        if (result[0]) {
            result[0].PLATFORMS = getPlatformString(JSON.parse(result[0].PLATFORMS))
            res.render('pages/project-page', {email: req.cookies.username, tab: '2', project: result[0]});
        }
        else res.send('Error 404 project not found with the name ' + req.params.project);
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