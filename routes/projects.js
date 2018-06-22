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
        con.query("SELECT * FROM projects WHERE ACTIVE=1 ORDER BY TIMESTAMP DESC", function (err, projects, fields) {
            if (err) throw err;
            projects.forEach((project) => {
                project.PLATFORMS = project.PLATFORMS.replace(/\\'/g, '\\"');
                require('../other/security').convertUUIDToBase64(project.ID, (b64) => project.BASE64 = b64);
            });
            res.render('pages/projects.ejs', {email: req.cookies.username, tab: '2', posts: projects, term: ''});
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
    // let searchFor = '%' + req.params.searchTerm + '%';
    con.query("SELECT * FROM projects WHERE NAME LIKE ?", [`%${req.params.searchTerm}%`], function (err, result, fields) {
        if (err) throw err;
        result.forEach((project) => {
            project.PLATFORMS = project.PLATFORMS.replace(/\\'/g, '\\"');
            require('../other/security').convertUUIDToBase64(project.ID, (b64) => project.BASE64 = b64);
        });
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
    let xss = require('xss');
    project = JSON.parse(xss(JSON.stringify(req.query)));
    // debug.log('checking if project...' + project.name + ' is in db');
    con.query("SELECT * FROM projects WHERE NAME = ? LIMIT 1", [project.name], function (err, result, fields) {
        if (err) throw err;
        if (result[0]) {
            // debug.log("project failed to register: " + project.name);
            res.send({status: "failed, project already exists"});
        }
        else {
            // debug.log("register project: " + result[0]);
            let platforms = [];
            if (project.platforms) {
                platforms = project.platforms;
            }
            require('../other/security').getUUID((uuid) => {
                con.query("INSERT INTO projects (ID, TIMESTAMP, NAME, SUMMARY, COMMITMENT, PLATFORMS, PLATFORM_DETAILS, RESOURCE_LINK, STAGE, BUDGET, FUNDING, NATIONAL, FOUNDER, ACTIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [uuid, Date.now().toString(), project.name, project.summary, project.commitment, JSON.stringify(platforms), project.platformDetails, project.resource_link, project.stage, project.budget, project.funding, project.national, project.founder, 1], function (err, result) {
                    if (err) {
                        res.send({status: JSON.stringify(err)});
                    }
                    // debug.log('registered project ' + project.name + ' successful');
                    res.send({status: "successful"});
                })
            });
        }
    });
});

router.get('/finish', function (req, res) {
    project = req.query.name;
    con.query("UPDATE projects SET ACTIVE=0 WHERE NAME=?", [project], function (err, result) {
        if (err) throw err;
        res.send({status: "successful"});
    });
});

router.get('/update', function (req, res) {
    project = req.query;
    let platforms = [];
    if (project.platforms) {
        platforms = project.platforms;
    }
    require('../other/security').convertBase64ToUUID(project.BASE64, (uuid) => {
        con.query("UPDATE projects SET SUMMARY=?, RESOURCE_LINK=?, PLATFORMS=?, COMMITMENT=?, STAGE=?, BUDGET=?, FUNDING=? WHERE ID=?", [project.summary, project.resource_link, JSON.stringify(platforms), project.commitment, project.stage, project.budget, project.funding, uuid], function (err, result) {
            if (err) throw err;
            res.send({status: "successful"});
        })
    });
});

router.get('/remove-member', (req, res) => {
    let project = req.query.project;
    let members = project.COLLABORATORS.trim().substr(0, project.COLLABORATORS.length - 1).split(',');
    let index = members.indexOf(req.query.collaborator);
    members.splice(index, 1);
    let newMembers = '';
    members.forEach((member) => newMembers += member + ',')
    con.query('UPDATE projects SET COLLABORATORS = ? WHERE ID = ?', [newMembers, project.ID], (err, result) => {
        if (err) throw err;
        res.send({status: 'successful'})
    });
});

router.get('/:project', function (req, res) {
    if (!req.cookies.username)
        res.redirect('/login');
    require('../other/security').convertBase64ToUUID(req.params.project, (uuid) => {
        con.query("SELECT * FROM projects WHERE ID = ? LIMIT 1", [uuid], function (err, result, fields) {
            if (err) throw err;
            if (result[0]) {
                result[0].BASE64 = req.params.project;
                con.query("SELECT * FROM group_messages WHERE group_uuid = ?", [uuid], function (error, result2) {
                    if (error) throw error;
                    let options = {
                        weekday: "long", year: "numeric", month: "short",
                        day: "numeric", hour: "2-digit", minute: "2-digit",
                        second: '2-digit', hour12: false
                    };
                    for (index in result2) {
                        result2[index].timestamp = new Date(parseInt(result2[index].timestamp)).toLocaleTimeString("en-us", options);
                    }
                    result[0].PLATFORMS = result[0].PLATFORMS.replace(/\\'/g, '\\"');

                    let people = result[0].COLLABORATORS.trim().substr(0, result[0].COLLABORATORS.trim().length - 1).split(',');
                    let list = '';
                    people.forEach((person) => {
                        list += `\'${person}\', `
                    });
                    list = list.substr(0, list.length - 2);
                    con.query(`SELECT * FROM accounts WHERE EMAIL in (${list})`, (err, result3) => {
                        con.query('SELECT * FROM accounts WHERE EMAIL = ?', [result[0].FOUNDER], (err, result4) => {
                            res.render('pages/project-page', {
                                email: req.cookies.username,
                                uuid: req.cookies.uuid,
                                tab: '2',
                                project: result[0],
                                messages: result2,
                                accounts: result3,
                                leader: result4[0]
                            });
                        });
                    });
                });
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
});

router.get('/edit/:project', function (req, res) {
    if (!req.cookies.username)
        res.redirect('/login');
    require('../other/security').convertBase64ToUUID(req.params.project, (uuid) => {
        con.query("SELECT * FROM projects WHERE ID = ? LIMIT 1", [uuid], function (err, result, fields) {
            if (err) throw err;
            if (result[0]) {
                if (result[0].FOUNDER != req.cookies.username) {
                    res.render('pages/404.ejs', {
                        message_main: "You are not allowed to edit the project (403)",
                        message_redirect: `Click <a href=\"/projects/${req.params.project}\">here</a> to go back`,
                        message_page: "Requested project: " + req.params.team
                    });
                } else {
                    result[0].PLATFORMS = result[0].PLATFORMS.replace(/\\'/g, '\\"');
                    result[0].BASE64 = req.params.project;
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
        })
    });
});

module.exports = {url: '/projects', router: router};