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
    con.query("SELECT * FROM projects LIMIT 25", function (err, projects, fields) {
        if (err) throw err;
        for (i in projects) {
            projects[i].PLATFORMS = getPlatformString(JSON.parse(projects[i].PLATFORMS));
        }
        con.query("SELECT * FROM teams LIMIT 25", function (err, teams, fields) {
            if (err) throw err;
            for (i in teams) {
                teams[i].PLATFORMS = getPlatformString(JSON.parse(teams[i].PLATFORMS));
            }
            let list = teams.concat(projects);
            list.reverse();
            res.render('pages/index.ejs', {email: req.cookies.username, tab: '1', posts: list, term: ''});
        });
    });
});

router.get('/:searchTerm', function (req, res) {
    let searchFor = '%' + req.params.searchTerm + '%';
    con.query("SELECT * FROM projects WHERE NAME LIKE ?", [searchFor], function (err, projects, fields) {
        if (err) throw err;
        for (i in projects) {
            projects[i].PLATFORMS = getPlatformString(JSON.parse(projects[i].PLATFORMS));
        }
        con.query("SELECT * FROM teams WHERE NAME LIKE ?", [searchFor], function (err, teams, fields) {
            if (err) throw err;
            for (i in teams) {
                teams[i].PLATFORMS = getPlatformString(JSON.parse(teams[i].PLATFORMS));
            }
            let list = teams.concat(projects);
            list.reverse();
            res.render('pages/index.ejs', {
                email: req.cookies.username,
                tab: '1',
                posts: list,
                term: req.params.searchTerm
            });
        });
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