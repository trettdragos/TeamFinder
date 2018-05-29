let express = require('express');
let app = express();
let path = require('path');
let mysql = require('mysql');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let server = require('http').createServer(app);

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

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

io.on('connection', function (socket) {
    console.log('Client connected...' + socket.id);

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let security = require('./other/security');
security.encryptPassword("test", (hash) => {
   console.log(hash);
   security.checkPassword("test", hash, (res) => {
       console.log(res);
   })
});

let routes = require('./routes');
routes.forEach(item => app.use(item.url, item.router));
app.get('/logout', function (req, res) {
    res.render('pages/logout');
});

app.get('/*', (req, res) => {
    res.render('pages/404.ejs', {page: req.url.substr(0)})
});

server.listen(3000);

console.log('port: 3000');
