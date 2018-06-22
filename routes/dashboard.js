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
    con.query("SELECT * FROM projects WHERE ACTIVE=1 ORDER BY TIMESTAMP DESC", function (err, projects, fields) {
        if (err) throw err;
        projects.forEach((project) => require('../other/security').convertUUIDToBase64(project.ID, (b64) => project.BASE64 = b64));
        con.query("SELECT * FROM teams WHERE ACTIVE=1 ORDER BY TIMESTAMP DESC", function (err, teams, fields) {
            if (err) throw err;
            teams.forEach((team) => require('../other/security').convertUUIDToBase64(team.ID, (b64) => team.BASE64 = b64));
            let list = teams.concat(projects);
            res.render('pages/dashboard.ejs', {email: req.cookies.username, tab: '1', posts: list, term: ''});
        });
    });
});

router.get('/:searchTerm', function (req, res) {
    let searchFor = '%' + req.params.searchTerm + '%';
    con.query("SELECT * FROM projects WHERE NAME LIKE ?", [searchFor], function (err, projects, fields) {
        if (err) throw err;
        con.query("SELECT * FROM teams WHERE NAME LIKE ?", [searchFor], function (err, teams, fields) {
            if (err) throw err;
            let list = teams.concat(projects);
            list.reverse();
            res.render('pages/dashboard.ejs', {
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
}


module.exports = {url: '/dashboard', router: router};