var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var server = require('http').createServer(app);

const sgMail = require('@sendgrid/mail');
let io = require('socket.io').listen(server, {
    log: false,
    agent: false,
    origins: '*:*'
});

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

let pages = ["dashboard", "login", "logout", "register", "settings", "projects"];

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/auth-login', function (req, res) {
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

app.get('/auth-register', function (req, res) {
    user = req.query;
    console.log(user)
    console.log("checking if user: " + user.email + " is already in the db...")
    con.query("SELECT * FROM accounts WHERE EMAIL = ? LIMIT 1", [user.email], function (err, result, fields) {
        if (err) throw err;
        if (result[0]) {
            console.log("user with email " + user.email + " already exists");
            res.send({status: "Email already used.", email: user.email});
        }
        else {
            console.log("registering user: " + user.name + " with the email: " + user.email);
            //schimba CONFIRMED la 0 imediat repun pe picioare sendgrid
            con.query("INSERT INTO accounts (ID, USERNAME, EMAIL, PASSWORD, LINKEDIN, GITHUB, SKILLS, CONFIRMED, NOTIFICATION) VALUES (?, ?, ?, ?, ?, ?, ?, '1', '[]')", [0, user.name, user.email, user.password, user.linkedin, user.github, JSON.stringify(user.skills)], function (err, result) {
                if (err) throw err;
                res.send({status: "succesfull"});
                /*var msg = {
                  to: 'trettdragos@gmail.com',
                  from: 'register@hacksquad.com',
                  subject: 'Please verify your email',
                  text: 'and easy to do anywhere, even with Node.js',
                  html: '<a href="localhost:3000/verification/'+user.email+'">localhost:3000/verification/'+user.email+'</a>',
                };
                sgMail.send(msg);*/
                console.log('sent verification email to ' + user.email);
            });
        }
    });
});

app.get('/register-team', function (req, res) {
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
            con.query("INSERT INTO teams (ID, NAME, SUMMARY, HACKATON, SECTION, START_DATE, END_DATE, PLATFORMS, NR_MEMBERS, POSTS, LEADER) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [0, team.name, team.summary, team.hackaton, team.section, team.startDate, team.endDate, JSON.stringify(team.platforms), team.nrMembers, '', team.leader], function (err, result) {
                if (err) {
                    socket.emit('register team', {status: JSON.stringify(err)});
                }
                console.log('registered team ' + team.name + ' successful');
                res.send({status: "succesfull"});
            });
        }
    });
});

app.get('/register-project', function (req, res) {
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

io.on('connection', function (socket) {
    console.log('Client connected...' + socket.id);

    socket.on('request join team', function (req) {
        console.log("client " + req.username + " requested to join team " + req.teamName + " of user " + req.leader + " with token " + req.token);
        con.query("SELECT NOTIFICATION FROM accounts WHERE EMAIL = ? LIMIT 1", [req.leader], function (err, result, fields) {
            if (err) throw err;
            if (result) {
                var notifications = JSON.parse(result[0].NOTIFICATION);
                var id = req.username + req.teamName;
                id = id.replace('/', '');
                id = id.replace('@', '');
                id = id.replace('.', '');
                id = id.replace(/\s/g, '');
                var newReq = {
                    "user": req.username,
                    "vis": "false",
                    "type": "team",
                    "name": req.teamName,
                    "id": id
                };
                var reqtest = JSON.stringify(newReq);
                var isValid = true;
                for (var i in notifications) {
                    if (reqtest === JSON.stringify(notifications[i])) {
                        socket.emit('request join team', {status: "already requested"});
                        console.log("failed to send request, already exists");
                        isValid = false;
                        break;
                    }
                }
                if (isValid) {
                    notifications.push(newReq);
                    var notifTxt = JSON.stringify(notifications);
                    con.query("UPDATE accounts SET NOTIFICATION = ? WHERE EMAIL = ?", [notifTxt, req.leader], function (err, result) {
                        if (err) throw err;
                        if (result[0]) {
                            console.log("project failed to register: " + project.name);
                            socket.emit('register project', {status: "failed, project already exists"});
                        }
                        else {
                            console.log("register project: " + result[0]);
                            con.query("INSERT INTO projects (ID, NAME, SUMMARY, COMMITMENT, PLATFORMS, PLATFORM_DETAILS, STAGE, BUDGET, FUNDING, NATIONAL, FOUNDER) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [0, project.name, project.summary, project.commitment, JSON.stringify(project.platforms), project.platformDetails, project.stage, project.budget, project.funding, project.national, project.founder], function (err, result) {
                                if (err) {
                                    socket.emit('register project', {status: JSON.stringify(err)});
                                }
                                console.log('registered project ' + project.name + ' successful');
                                socket.emit('register project', {status: "succesfull"});
                            });
                        }
                    });
                }
            }
        });

        socket.on('request join team', function (req) {
            console.log("client " + req.username + " requested to join team " + req.teamName + " of user " + req.leader + " with token " + req.token);
            con.query("SELECT NOTIFICATION FROM accounts WHERE EMAIL = ? LIMIT 1", [req.leader], function (err, result, fields) {
                if (err) throw err;
                if (result) {
                    let notifications = JSON.parse(result[0].NOTIFICATION);
                    let id = req.username + req.teamName;
                    id = id.replace('/', '');
                    id = id.replace('@', '');
                    id = id.replace('.', '');
                    id = id.replace(/\s/g, '');
                    let newReq = {
                        "user": req.username,
                        "vis": "false",
                        "type": "team",
                        "name": req.teamName,
                        "id": id
                    };
                    let reqtest = JSON.stringify(newReq);
                    let isValid = true;
                    for (let i in notifications) {
                        if (reqtest === JSON.stringify(notifications[i])) {
                            socket.emit('request join team', {status: "already requested"});
                            console.log("failed to send request, already exists");
                            isValid = false;
                            break;
                        }
                    }
                    if (isValid) {
                        notifications.push(newReq);
                        let notifTxt = JSON.stringify(notifications);
                        con.query("UPDATE accounts SET NOTIFICATION = ? WHERE EMAIL = ?", [notifTxt, req.leader], function (err, result) {
                            if (err) throw err;
                            if (result.affectedRows == 0) {
                                socket.emit('request join team', {status: "failed"});
                                console.log('failed to register request to team leader ' + req.leader + " from user " + req.username + " in team " + req.teamName);
                            } else {
                                console.log('succesfully registered request to team leader ' + req.leader + " from user " + req.username + " in team " + req.teamName);
                                socket.emit('request join team', {status: "succesfull"});
                            }
                        });
                    }
                }
            });
        });

        socket.on('request join project', function (req) {
            console.log("client " + req.username + " requested to join project " + req.projectName + " of user " + req.leader + " with token " + req.token);
            con.query("SELECT NOTIFICATION FROM accounts WHERE EMAIL = ? LIMIT 1", [req.leader], function (err, result, fields) {
                if (err) throw err;
                if (result) {
                    let notifications = JSON.parse(result[0].NOTIFICATION);
                    let id = req.username + req.projectName;
                    id = id.replace('/', '');
                    id = id.replace('@', '');
                    id = id.replace('.', '');
                    id = id.replace(/\s/g, '');
                    let newReq = {
                        "user": req.username,
                        "vis": "false",
                        "type": "project",
                        "name": req.projectName,
                        "id": id
                    };
                    let reqtest = JSON.stringify(newReq);
                    let isValid = true;
                    for (let i in notifications) {
                        if (reqtest === JSON.stringify(notifications[i])) {
                            socket.emit('request join project', {status: "already requested"});
                            console.log("failed to send request, already exists");
                            isValid = false;
                            break;
                        }
                    }
                    if (isValid) {
                        notifications.push(newReq);
                        let notifTxt = JSON.stringify(notifications);
                        con.query("UPDATE accounts SET NOTIFICATION = ? WHERE EMAIL = ?", [notifTxt, req.leader], function (err, result) {
                            if (err) throw err;
                            if (result.affectedRows == 0) {
                                socket.emit('request join project', {status: "failed"});
                                console.log('failed to register request to team leader ' + req.leader + " from user " + req.username + " in team " + req.teamName);
                            } else {
                                console.log('succesfully registered request to team leader ' + req.leader + " from user " + req.username + " in team " + req.teamName);
                                socket.emit('request join project', {status: "succesfull"});
                            }
                        });
                    }
                }
            });
        });

        socket.on('disconnect', function () {
            console.log("Client disconected..." + socket.id);
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.get('/', function (req, res) {
//     res.render('pages/about.ejs');
// });

// app.get('/register-confirmed', function (req, res) {
//     res.render('pages/register-confirmed.ejs');
// });

app.get('/dashboard', function (req, res) {

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

app.get('/dashboard/:searchTerm', function (req, res) {
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

// app.get('/login', function (req, res) {
//     res.render('pages/login');
// });

app.get('/logout', function (req, res) {
    res.render('pages/logout');
});

app.get('/account', function (req, res) {
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
// app.get('/projects', function (req, res) {
//     if (req.cookies.username) {
//         con.query("SELECT * FROM projects LIMIT 25", function (err, projects, fields) {
//             if (err) throw err;
//             for (i in projects) {
//                 projects[i].PLATFORMS = getPlatformString(JSON.parse(projects[i].PLATFORMS));
//             }
//             let list = projects;
//             list.reverse();
//             res.render('pages/projects.ejs', {email: req.cookies.username, tab: '2', posts: list, term: ''});
//         });
//     }
//     else {
//         res.redirect('/login');
//     }
// });
// app.get('/teams', function (req, res) {
//     if (req.cookies.username) {
//         con.query("SELECT * FROM teams LIMIT 25", function (err, teams, fields) {
//             if (err) throw err;
//             for (i in teams) {
//                 teams[i].PLATFORMS = getPlatformString(JSON.parse(teams[i].PLATFORMS));
//             }
//             let list = teams;
//             list.reverse();
//             res.render('pages/teams', {email: req.cookies.username, tab: '3', posts: list, term: ''});
//         });
//     }
//     else {
//         res.redirect('/login');
//     }
// });

// app.get('/createProject', function (req, res) {
//     if (req.cookies.username) {
//         res.render('pages/create-project', {tab: '2'});
//     }
//     else {
//         res.redirect('/login');
//     }
// });

// app.get('/createTeam', function (req, res) {
//     if (req.cookies.username) {
//         res.render('pages/create-team', {tab: '3'});
//     }
//     else {
//         res.redirect('/login');
//     }
// });

// app.get('/register', function (req, res) {
//     res.render('pages/register');
// });

// app.get('/:page', function (req, res) {
//     if (pages.indexOf(req.params.page) < -1) {
//         res.send("404 page not found");
//     }
//     else {
//         res.redirect('/');
//     }
// });

// app.get('/projects/:project', function (req, res) {
//     if (!req.cookies.username) res.redirect('/login');
//     con.query("SELECT * FROM projects WHERE NAME = ? LIMIT 1", [req.params.project], function (err, result, fields) {
//         if (err) throw err;
//         if (result[0]) {
//             result[0].PLATFORMS = getPlatformString(JSON.parse(result[0].PLATFORMS))
//             res.render('pages/project-page', {email: req.cookies.username, tab: '2', project: result[0]});
//         }
//         else res.send('Error 404 project not found with the name ' + req.params.project);
//     });
// });
//
// app.get('/teams/:team', function (req, res) {
//     if (!req.cookies.username)
//         res.redirect('/login');
//     con.query("SELECT * FROM teams WHERE NAME = ? LIMIT 1", [req.params.team], function (err, result, fields) {
//         if (err) throw err;
//         if (result[0]) {
//             result[0].PLATFORMS = getPlatformString(JSON.parse(result[0].PLATFORMS))
//             res.render('pages/team-page', {email: req.cookies.username, tab: '3', team: result[0]});
//         }
//         else res.send('Error 404 team not found with the name ' + req.params.team);
//     });
// });

app.get('/teamsSearch/:searchTerm', function (req, res) {
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

app.get('/projectsSearch/:searchTerm', function (req, res) {
    if (!req.cookies.username)
        res.redirect('/login');
    let searchFor = '%' + req.params.searchTerm + '%';
    con.query("SELECT * FROM projects WHERE NAME LIKE ?", [searchFor], function (err, result, fields) {
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

let verification = require('./routes/verification');
let home = require('./routes/home');
let register = require('./routes/register');
let login = require('./routes/login');
let projects = require('./routes/projects');
let teams = require('./routes/teams');
app.use('/verification', verification);
app.use('/', home);
app.use('/register', register);
app.use('/login', login);
app.use('/projects', projects);
app.use('/teams', teams);

server.listen(3000);

console.log('port: 3000');
