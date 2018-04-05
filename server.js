var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var Worker = require("tiny-worker");
Worker.setRange(2, 20);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
var io = require('socket.io').listen(server, {
    log: false,
    agent: false,
    origins: '*:*'
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "TeamFinder"
});

var pages= ["dashboard", "login", "logout", "register", "settings", "projects"];

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

io.on('connection', function(socket) {
  console.log('Client connected...'+socket.id);
  socket.on('auth login',function (user) {
      con.query("SELECT * FROM accounts WHERE EMAIL = ? AND PASSWORD = ? LIMIT 1", [user.email, user.password], function (err, result, fields) {
        if (err) throw err;
        if(result[0]){
          if(result[0].CONFIRMED=='1'){
            var newNotif = false;
            var not = JSON.parse(result[0].NOTIFICATION);
            for(i in not){
              if(not[i].vis=="false")
                newNotif = true;
            }
            console.log("auth succesfull with user: "+user.email);
            socket.emit('auth login', {status:"succesfull", email:user.email, notifications:JSON.stringify(result[0].NOTIFICATION), newNotif:newNotif});
          }else{
            socket.emit('auth login', {status:"account not verified", email:user.email})
          }
        }
        else{
          console.log("auth failed for user: "+user.email);
          socket.emit('auth login', {status:"failed", email:user.email});
        }
      });
  });
  socket.on('auth register', function(user){
    console.log("checking if user: "+user.email+" is already in the db...")
    con.query("SELECT * FROM accounts WHERE EMAIL = ? LIMIT 1", [user.email], function (err, result, fields) {
        if (err) throw err;
        if(result[0]){
          console.log("user with email "+user.email+" already exists");
          socket.emit('auth register', {status:"Email already used.", email:user.email});
        }
        else{
          console.log("registering user: "+user.name+" with the email: "+user.email);
          con.query("INSERT INTO accounts (ID, USERNAME, EMAIL, PASSWORD, LINKEDIN, GITHUB, SKILLS, CONFIRMED) VALUES (?, ?, ?, ?, ?, ?, ?, '0')", [0, user.name, user.email, user.password, user.linkedin, user.github, JSON.stringify(user.skills)], function (err, result) {
            if (err) throw err;
            socket.emit('auth register', {status:"succesfull", email:user.email});
            var msg = {
              to: 'trettdragos@gmail.com',
              from: 'register@hacksquad.com',
              subject: 'Please verify your email',
              text: 'and easy to do anywhere, even with Node.js',
              html: '<a href="localhost:3000/verification/'+user.email+'">localhost:3000/verification/'+user.email+'</a>',
            };
            sgMail.send(msg);
          console.log('sent verification email to '+user.email);
        });
      }
    });
  });

  socket.on('register team', function(team){
    console.log('checking if team...'+team.name+ ' is in db');
    con.query("SELECT * FROM teams WHERE NAME = ? LIMIT 1", [team.name], function (err, result, fields) {
        if (err) throw err;
        if(result[0]){
          console.log("team failed to register: "+team.name);
          socket.emit('register team', {status:"failed, team already exists"});
        }
        else{
          console.log("register team: "+ result[0]);
          con.query("INSERT INTO teams (ID, NAME, SUMMARY, HACKATON, SECTION, START_DATE, END_DATE, PLATFORMS, NR_MEMBERS, POSTS, LEADER) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [0, team.name, team.summary, team.hackaton, team.section, team.startDate, team.endDate, JSON.stringify(team.platforms), team.nrMembers, JSON.stringify(team.posts), team.leader], function (err, result) {
            if (err){
              socket.emit('register team', {status:JSON.stringify(err)});
            } 
            console.log('registered team '+team.name+' successful');
            socket.emit('register team', {status:"succesfull"});
          });
        }
      });
  });

  socket.on('register project', function(project){
    console.log('checking if project...'+project.name+ ' is in db');
    con.query("SELECT * FROM projects WHERE NAME = ? LIMIT 1", [project.name], function (err, result, fields) {
        if (err) throw err;
        if(result[0]){
          console.log("project failed to register: "+project.name);
          socket.emit('register project', {status:"failed, project already exists"});
        }
        else{
          console.log("register project: "+ result[0]);
          con.query("INSERT INTO projects (ID, NAME, SUMMARY, COMMITMENT, PLATFORMS, PLATFORM_DETAILS, STAGE, BUDGET, FUNDING, NATIONAL, FOUNDER) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [0, project.name, project.summary, project.commitment, JSON.stringify(project.platforms), project.platformDetails, project.stage, project.budget, project.funding, project.national, project.founder], function (err, result) {
            if (err){
              socket.emit('register project', {status:JSON.stringify(err)});
            } 
            console.log('registered project '+project.name+' successful');
            socket.emit('register project', {status:"succesfull"});
          });
        }
      });
  });

  socket.on('request join team', function(req){
    console.log("client "+ req.username + " requested to join team "+ req.teamName +" of user "+req.leader+ " with token "+ req.token);
    con.query("SELECT NOTIFICATION FROM accounts WHERE EMAIL = ? LIMIT 1", [req.leader], function(err, result, fields) {
      if(err) throw err;
      if(result){
        var notifications = JSON.parse(result[0].NOTIFICATION);
        var id = req.username+req.teamName;
        id = id.replace('/','');
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
        var reqtest= JSON.stringify(newReq);
        var isValid = true;
        for(var i in notifications){
          if(reqtest===JSON.stringify(notifications[i])){
            socket.emit('request join team', {status:"already requested"});
            console.log("failed to send request, already exists");
            isValid = false;
            break;
          }
        }
        if(isValid){
          notifications.push(newReq);
          var notifTxt = JSON.stringify(notifications);
          con.query("UPDATE accounts SET NOTIFICATION = ? WHERE EMAIL = ?" , [notifTxt, req.leader], function(err, result){
            if (err) throw err;
            if(result.affectedRows==0){
              socket.emit('request join team', {status:"failed"});
              console.log('failed to register request to team leader ' + req.leader + " from user "+ req.username+" in team "+req.teamName);
            }else{
              console.log('succesfully registered request to team leader ' + req.leader + " from user "+ req.username+" in team "+req.teamName);
              socket.emit('request join team', {status:"succesfull"});
            }
          }); 
        }        
      }
    });
  });

  socket.on('request join project', function(req){
    console.log("client "+ req.username + " requested to join project "+ req.projectName +" of user "+req.leader+ " with token "+ req.token);
    con.query("SELECT NOTIFICATION FROM accounts WHERE EMAIL = ? LIMIT 1", [req.leader], function(err, result, fields) {
      if(err) throw err;
      if(result){
        var notifications = JSON.parse(result[0].NOTIFICATION);
        var id = req.username+req.projectName;
        id = id.replace('/','');
        id = id.replace('@', '');
        id = id.replace('.', '');
        id = id.replace(/\s/g, '');
        var newReq = {
          "user": req.username,
          "vis": "false",
          "type": "project",
          "name": req.projectName,
          "id": id
        };
        var reqtest= JSON.stringify(newReq);
        var isValid = true;
        for(var i in notifications){
          if(reqtest===JSON.stringify(notifications[i])){
            socket.emit('request join project', {status:"already requested"});
            console.log("failed to send request, already exists");
            isValid = false;
            break;
          }
        }
        if(isValid){
          notifications.push(newReq);
          var notifTxt = JSON.stringify(notifications);
          con.query("UPDATE accounts SET NOTIFICATION = ? WHERE EMAIL = ?" , [notifTxt, req.leader], function(err, result){
            if (err) throw err;
            if(result.affectedRows==0){
              socket.emit('request join project', {status:"failed"});
              console.log('failed to register request to team leader ' + req.leader + " from user "+ req.username+" in team "+req.teamName);
            }else{
              console.log('succesfully registered request to team leader ' + req.leader + " from user "+ req.username+" in team "+req.teamName);
              socket.emit('request join project', {status:"succesfull"});
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

  socket.on('listener', function(data){//currently not working
    var worker = new Worker(function(){
      postMessage(process.debugPort); 
      self.onmessage = function(event) {
        var wasSent = false;
        var mysql = require('mysql');//var globale inaccesibile, require nu fucntioneaza in tiny-worker, threadul probabil da crash aici
        postMessage('shit workin');
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "TeamFinder"
        });
        while(!wasSent){
          con.query("SELECT NOTIFICATION FROM accounts WHERE EMAIL = ?", [event.data.email], function(err, result){
            if(err) throw err;
            if(JSON.stringify(result[0].NOTIFICATION) !== JSON.stringify(event.data.notifications)){
              wasSent = true;
              postMessage(JSON.stringify(result[0].NOTIFICATION));
            }
          });
        }   
        
      };
    });
    worker.onmessage = function(event) {
      console.log("Worker said : " + event.data);
      worker.terminate();
    };
    worker.postMessage(data);
  });

  socket.on('disconnect', function () {
      console.log("Client disconected..."+ socket.id);
  });
});

function getPlatformString(platforms){
  var pl = '';
  if(platforms.Android){
    pl = pl+'Android ';
  }
  if(platforms.iOS){
    pl = pl+'iOS ';
  }
  if(platforms.Desktop){
    pl = pl+'Desktop ';
  }
  if(platforms.WebFront){
    pl = pl+'Web FrontEnd ';
  }
  if(platforms.webBack){
    pl = pl+'Web BackEnd';
  }
  return pl;
  console.log(pl);
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/about.ejs');
});

app.get('/dashboard', function(req, res) {

    con.query("SELECT * FROM projects LIMIT 25", function(err, projects, fields){
      if(err) throw err;
      for(i in projects){
        projects[i].PLATFORMS = getPlatformString(JSON.parse(projects[i].PLATFORMS));
      }
      con.query("SELECT * FROM teams LIMIT 25", function(err, teams, fields){
        if(err) throw err;
        for(i in teams){
          teams[i].PLATFORMS = getPlatformString(JSON.parse(teams[i].PLATFORMS));
        }
        var list = teams.concat(projects);
        list.reverse();
        res.render('pages/index.ejs', {email:req.cookies.username, tab:'1', posts:list, term:''});
      });
    });
});

app.get('/dashboard/:searchTerm', function(req, res){
  var searchFor = '%'+req.params.searchTerm+'%';
  con.query("SELECT * FROM projects WHERE NAME LIKE ?",[searchFor], function(err, projects, fields){
      if(err) throw err;
      for(i in projects){
        projects[i].PLATFORMS = getPlatformString(JSON.parse(projects[i].PLATFORMS));
      }
      con.query("SELECT * FROM teams WHERE NAME LIKE ?", [searchFor], function(err, teams, fields){
        if(err) throw err;
        for(i in teams){
          teams[i].PLATFORMS = getPlatformString(JSON.parse(teams[i].PLATFORMS));
        }
        var list = teams.concat(projects);
        list.reverse();
        res.render('pages/index.ejs', {email:req.cookies.username, tab:'1', posts:list, term:req.params.searchTerm});
      });
    });
});

app.get('/login', function(req, res){
  res.render('pages/login');
});

app.get('/logout', function(req, res){
    res.render('pages/logout');
});

app.get('/account', function(req, res){
  if(req.cookies.username){
    var serachFor = '%'+req.cookies.username+'%';
    con.query("SELECT * FROM projects WHERE COLLABORATORS LIKE ?", [serachFor], function(err, projects, fields){
      if(err) throw err;
      con.query("SELECT * FROM teams WHERE POSTS LIKE ?", [serachFor], function(errTeams, teams, fields2){
        if(errTeams) throw errTeams;
        con.query("SELECT NOTIFICATION FROM accounts WHERE EMAIL = ?", [req.cookies.username], function(err3, result, fields3){
          if(err3) throw err3;
          res.render('pages/account', {tab:'4', email:req.cookies.username, projects:projects, teams:teams, notifications:JSON.parse(result[0].NOTIFICATION)});
        });
      });
    });
  }
  else{
    res.redirect('/login');
  }
});
app.get('/projects', function(req, res){
  if(req.cookies.username){
    con.query("SELECT * FROM projects LIMIT 25", function(err, projects, fields){
      if(err) throw err;
      for(i in projects){
        projects[i].PLATFORMS = getPlatformString(JSON.parse(projects[i].PLATFORMS));
      }
      var list = projects;
      list.reverse();
      res.render('pages/projects.ejs', {email:req.cookies.username, tab:'2', posts:list, term:''});
    });
  }
  else{
    res.redirect('/login');
  }
});
app.get('/teams', function(req, res){
    if(req.cookies.username){
      con.query("SELECT * FROM teams LIMIT 25", function(err, teams, fields){
        if(err) throw err;
        for(i in teams){
          teams[i].PLATFORMS = getPlatformString(JSON.parse(teams[i].PLATFORMS));
        }
        var list = teams;
        list.reverse();
        res.render('pages/teams', {email:req.cookies.username, tab:'3', posts:list, term:''});
      });
  }
  else{
    res.redirect('/login');
  }
});

app.get('/createProject', function(req, res){
    if(req.cookies.username){
    res.render('pages/create-project', {tab:'2'});
  }
  else{
    res.redirect('/login');
  }
});

app.get('/createTeam', function(req, res){
    if(req.cookies.username){
    res.render('pages/create-team', {tab:'3'});
  }
  else{
    res.redirect('/login');
  }
});

app.get('/register', function(req, res){
  res.render('pages/register');
});

app.get('/:page', function(req, res){
  if(pages.indexOf(req.params.page) < -1){
    res.send("404 page not found");
  }
  else {
    res.redirect('/');
  }
});

app.get('/projects/:project', function(req, res){
  if(!req.cookies.username) res.redirect('/login');
  con.query("SELECT * FROM projects WHERE NAME = ? LIMIT 1", [req.params.project], function (err, result, fields) {
      if (err) throw err;
      if(result[0]) {
        result[0].PLATFORMS = getPlatformString(JSON.parse(result[0].PLATFORMS))   
        res.render('pages/project-page', {email:req.cookies.username, tab:'2', project:result[0]});
      }
      else res.send('Error 404 project not found with the name '+req.params.project);
  });
});

app.get('/teams/:team', function(req, res){
  if(!req.cookies.username)
    res.redirect('/login');
 con.query("SELECT * FROM teams WHERE NAME = ? LIMIT 1", [req.params.team], function (err, result, fields) {
      if (err) throw err;
      if(result[0]){   
        result[0].PLATFORMS = getPlatformString(JSON.parse(result[0].PLATFORMS))
        res.render('pages/team-page', {email:req.cookies.username, tab:'3', team:result[0]});
      }
      else res.send('Error 404 team not found with the name '+req.params.team);
  });
});

app.get('/teamsSearch/:searchTerm', function(req, res){
  if(!req.cookies.username)
    res.redirect('/login');
  var searchFor = '%'+req.params.searchTerm+'%';
 con.query("SELECT * FROM teams WHERE NAME LIKE ?", [searchFor], function (err, result, fields) {
      if (err) throw err;
      for(i in result){
        result[i].PLATFORMS = getPlatformString(JSON.parse(result[i].PLATFORMS));
      }
      res.render('pages/teams', {email:req.cookies.username, tab:'3', posts:result, term:req.params.searchTerm});
  });
});

app.get('/projectsSearch/:searchTerm', function(req, res){
  if(!req.cookies.username)
    res.redirect('/login');
  var searchFor = '%'+req.params.searchTerm+'%';
 con.query("SELECT * FROM projects WHERE NAME LIKE ?", [searchFor], function (err, result, fields) {
      if (err) throw err;
      for(i in result){
        result[i].PLATFORMS = getPlatformString(JSON.parse(result[i].PLATFORMS));
      }
      res.render('pages/teams', {email:req.cookies.username, tab:'3', posts:result, term:req.params.searchTerm});
  });
});

let verification = require('./routes/verification')

app.use('/verification', verification);

server.listen(3000);

console.log('port: 3000');