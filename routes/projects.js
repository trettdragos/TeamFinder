let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

router.get('/*', (req, res, next) => require('../other/security').routeTokenVerification(req, res, next));

router.get('/', function (req, res) {
    if (req.cookies.username) {
        con.query("SELECT * FROM projects WHERE ACTIVE=1 LIMIT 25", function (err, projects, fields) {
            if (err) throw err;
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
    // console.log('checking if project...' + project.name + ' is in db');
    con.query("SELECT * FROM projects WHERE NAME = ? LIMIT 1", [project.name], function (err, result, fields) {
        if (err) throw err;
        if (result[0]) {
            // console.log("project failed to register: " + project.name);
            res.send({status: "failed, project already exists"});
        }
        else {
            // console.log("register project: " + result[0]);
            let platforms = [];
            if (project.platforms) {
                platforms = project.platforms;
            }
            con.query("INSERT INTO projects (ID, NAME, SUMMARY, COMMITMENT, PLATFORMS, PLATFORM_DETAILS, RESOURCE_LINK, STAGE, BUDGET, FUNDING, NATIONAL, FOUNDER, ACTIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [0, project.name, project.summary, project.commitment, JSON.stringify(platforms), project.platformDetails, project.resource_link, project.stage, project.budget, project.funding, project.national, project.founder, 1], function (err, result) {
                if (err) {
                    res.send({status: JSON.stringify(err)});
                }
                // console.log('registered project ' + project.name + ' successful');
                res.send({status: "successful"});
            });
        }
    });
});

router.get('/finish', function(req, res){
    project = req.query.name;
    con.query("UPDATE projects SET ACTIVE=0 WHERE NAME=?", [project], function(err, result){
        if(err) throw err;
        res.send({status:"successful"});
    });
});

router.get('/update', function(req, res){
    project = req.query;
    let platforms = [];
    if (project.platforms) {
        platforms = project.platforms;
    }
    con.query("UPDATE projects SET SUMMARY=?, RESOURCE_LINK=?, PLATFORMS=?, COMMITMENT=?, STAGE=?, BUDGET=?, FUNDING=? WHERE NAME=?", [project.summary, project.resource_link, JSON.stringify(platforms), project.commitment, project.stage, project.budget, project.funding, project.name], function(err, result){
        if(err) throw err;
        res.send({status:"successful"});
    });
});

router.get('/remove-member', (req, res) => {
    let project = req.query.project;
    let members = project.COLLABORATORS.trim().substr(0, project.COLLABORATORS.length - 1).split(',');
    let index = members.indexOf(req.query.collaborator);
    members.splice(index, 1);
    let newMembers = '';
    members.forEach((member) => newMembers += member+',')
    con.query('UPDATE projects SET COLLABORATORS = ? WHERE ID = ?', [newMembers, project.ID], (err, result) => {
        if(err) throw err;
        res.send({status: 'successful'})
    });
});

router.get('/:project', function (req, res) {
    if (!req.cookies.username)
        res.redirect('/login');

    con.query("SELECT * FROM projects WHERE NAME = ? LIMIT 1", [req.params.project], function (err, result, fields) {
        if (err) throw err;
        if (result[0]) {
            res.render('pages/project-page', {email: req.cookies.username, tab: '2', project: result[0]});
        }
        else {
            res.render('pages/404.ejs', {
                message_main: "The project you're looking for does not exist (404)",
                message_redirect: `Click <a href=\"/projects\">here</a> to go back`,
                message_page: "Requested project: " + req.params.project
            });
        }
    });
});

router.get('/edit/:project', function (req, res) {
    if (!req.cookies.username)
        res.redirect('/login');

    con.query("SELECT * FROM projects WHERE NAME = ? LIMIT 1", [req.params.project], function (err, result, fields) {
        if (err) throw err;
        if (result[0]) {
            if(result[0].FOUNDER != req.cookies.username) {
                res.render('pages/404.ejs', {
                    message_main: "You are not allowed to edit the project (403)",
                    message_redirect: `Click <a href=\"/projects/${req.params.project}\">here</a> to go back`,
                    message_page: "Requested project: " + req.params.team
                });
            }else {
                res.render('pages/edit-project', {email: req.cookies.username, tab: '2', project: result[0]});
            }
        }
        else {
            res.render('pages/404.ejs', {
                message_main: "The project you're looking for does not exist (404)",
                message_redirect: `Click <a href=\"/projects\">here</a> to go back`,
                message_page: "Requested project: " + req.params.project
            });
        }
    });
});

module.exports = {url: '/projects', router: router};