var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
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
              console.log("auth succesfull with user: "+user.email);
              socket.emit('auth login', {status:"succesfull", email:user.email});
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
        res.render('pages/index.ejs', {email:req.cookies.username, tab:'1', posts:list});
      });
    });
});

app.get('/login', function(req, res){
  res.render('pages/login');
});

app.get('/logout', function(req, res){
    res.render('pages/logout');
});

app.get('/settings', function(req, res){
  if(req.cookies.username){
    res.render('pages/settings', {tab:'4'});
  }
  else{
    res.redirect('/');
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
      res.render('pages/projects.ejs', {email:req.cookies.username, tab:'2', posts:list});
    });
  }
  else{
    res.redirect('/');
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
        res.render('pages/teams', {email:req.cookies.username, tab:'3', posts:list});
      });
  }
  else{
    res.redirect('/');
  }
});

app.get('/createProject', function(req, res){
    if(req.cookies.username){
    res.render('pages/create-project', {tab:'2'});
  }
  else{
    res.redirect('/');
  }
});

app.get('/createTeam', function(req, res){
    if(req.cookies.username){
    res.render('pages/create-team', {tab:'3'});
  }
  else{
    res.redirect('/');
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
  con.query("SELECT * FROM projects WHERE NAME = ? LIMIT 1", [req.params.project], function (err, result, fields) {
      if (err) throw err;
      if(result[0])    
        res.render('pages/project-page', {email:req.cookies.username, tab:'2', project:result[0]});
      else res.send('Error 404 project not found with the name '+req.params.project);
  });
});

app.get('/teams/:team', function(req, res){
 con.query("SELECT * FROM teams WHERE NAME = ? LIMIT 1", [req.params.team], function (err, result, fields) {
      if (err) throw err;
      if(result[0]){   
        result[0].PLATFORMS = getPlatformString(JSON.parse(result[0].PLATFORMS))
        res.render('pages/team-page', {email:req.cookies.username, tab:'3', team:result[0]});
      }
      else res.send('Error 404 team not found with the name '+req.params.team);
  });
});

let verification = require('./routes/verification')

app.use('/verification', verification);

server.listen(3000);

console.log('port: 3000');