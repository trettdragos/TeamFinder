let express = require('express');
let logger = require('morgan');
let app = express();
let path = require('path');
let mysql = require('mysql');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let server = require('http').createServer(app);

let connectedUsers = {};
let connectedSockets = {};
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
app.use(logger('dev'));

io.on('connection', function (socket) {
    console.log('Client connected...' + socket.id);
    //add user to connected list
    socket.emit('request email');
    socket.on('receive email', function(res){
      if(res.email){
        connectedUsers[res.email] = socket.id;
        connectedSockets[socket.id] = res.email;
        console.log(JSON.stringify(connectedUsers));
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
                    io.sockets.connected[connectedUsers[req.leader]].emit('notification', newReq);
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
                    io.sockets.connected[connectedUsers[req.leader]].emit('notification', newReq);
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
        socket.on('answer request', function(req){
    console.log("leader "+req.leader);
        con.query("SELECT NOTIFICATION FROM accounts WHERE EMAIL = ?", [req.leader], function(err, result){
          if(err) throw err;
          console.log(req.leader);
          var stringNotif = result[0].NOTIFICATION;
          var notif = JSON.parse(stringNotif);
          for(i in notif){
            if(notif[i].id===req.id){
              notif[i].vis = "true";
            }
          }
          stringNotif = JSON.stringify(notif);
          con.query("UPDATE accounts SET NOTIFICATION = ? WHERE EMAIL = ?", [stringNotif, req.leader], function(err2, result2){
            if(err2) throw err2;
            if(result2.affectedRows!=0){
              console.log('updated notifications for leader');
              if(req.status==="accept"){
                var table = req.type+'s';
                var col;
                if(table === 'projects')
                  col = 'COLLABORATORS';
                else col = 'POSTS';
                con.query("SELECT "+col+" FROM "+table+" WHERE NAME = ?", [req.name], function(err3, result3){
                    if(err3) throw err3;
                    var coll;
                    if(col=='POSTS')
                    coll = result3[0].POSTS;
                    else coll = result3[0].COLLABORATORS;
                    coll = coll+req.requester+', ';
                    con.query("UPDATE "+table+" SET "+col+" = ? WHERE NAME = ?", [coll, req.name], function(err4, result4){
                      if(err4) throw err4;
                      if(result4.affectedRows!=0){
                        console.log('added requester as colaborator');
                        socket.emit('answer request', {status:'succesfull'});
                      }
                    });
                });
              }
            }
          });
        });
  });
        socket.on('disconnect', function () {
            console.log("Client disconected..." + socket.id+" with email "+ connectedSockets[socket.id]);
            delete connectedUsers[connectedSockets[socket.id]];
            console.log(JSON.stringify(connectedUsers));
            //remove user from conected list
        });
      });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let routes = require('./routes');
routes.forEach(item => app.use(item.url, item.router));
app.get('/logout', function (req, res) {
    console.log(req.query.skip);
    if(req.query.skip)
        res.render('pages/logout', {time: 1});
    else
        res.render('pages/logout', {time: 5000});
});
app.get('/*', (req, res) => {
    res.render('pages/404.ejs', {
        message_main: "The page you're looking for could not be found (404)",
        message_redirect: `Click <a href=\"/\">here</a> to go back to home`,
        message_page: "Requested page: " +req.url.substr(0)
    })
});

server.listen(3000);
console.log('Server listening on port: 3000');
