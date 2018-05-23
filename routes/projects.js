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

router.get('/search', function (req, res) {
    res.redirect('/projects');
});

router.get('/search/:searchTerm', function (req, res) {
    if (!req.cookies.username)
        res.redirect('/login');
    let searchFor = '%' + req.params.searchTerm + '%';
    con.query("SELECT * FROM projects WHERE NAME LIKE ?", [searchFor], function (err, result, fields) {
        if (err) throw err;
        for (i in result) {
            result[i].PLATFORMS = getPlatformString(JSON.parse(result[i].PLATFORMS));
        }
        res.render('pages/projects', {
            email: req.cookies.username,
            tab: '2',
            posts: result,
            term: req.params.searchTerm
        });
    });
});

router.get('/create', function (req, res) {
    if (req.cookies.username) {
        res.render('pages/create-project', {tab: '2'});
    }
    else {
        res.redirect('/login');
    }
});

router.get('/register', function (req, res) {
    project = req.query;
    console.log('checking if project...' + project.name + ' is in db');
    con.query("SELECT * FROM projects WHERE NAME = ? LIMIT 1", [project.name], function (err, result, fields) {
        if (err) throw err;
        if (result[0]) {
            console.log("project failed to register: " + project.name);
            res.send({status: "failed, project already exists"});
        }
        else {
            console.log("register project: " + result[0]);
            con.query("INSERT INTO projects (ID, NAME, SUMMARY, COMMITMENT, PLATFORMS, PLATFORM_DETAILS, STAGE, BUDGET, FUNDING, NATIONAL, FOUNDER) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [0, project.name, project.summary, project.commitment, JSON.stringify(project.platforms), project.platformDetails, project.stage, project.budget, project.funding, project.national, project.founder], function (err, result) {
                if (err) {
                    res.send({status: JSON.stringify(err)});
                }
                console.log('registered project ' + project.name + ' successful');
                res.send({status: "succesfull"});
            });
        }
    });
});

router.get('/:project', function (req, res) {
    if (!req.cookies.username)
        res.redirect('/login');

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