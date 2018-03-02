var express = require('express');
var app = express();
var sleep = require('sleep');
var path = require('path');
var mysql = require('mysql');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let xss = require('xss');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {
    log: false,
    agent: false,
    origins: '*:*'
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "TeamFinder"
});

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
            console.log("auth succesfull with user: "+user.email);
            socket.emit('auth login', {status:"succesfull", email:user.email});
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
            con.query("INSERT INTO accounts (ID, USERNAME, EMAIL, PASSWORD, LINKEDIN, GITHUB, SKILLS) VALUES (?, ?, ?, ?, ?, ?, ?)", [0, user.name, user.email, user.password, user.linkedin, user.github, JSON.stringify(user.skills)], function (err, result) {
              if (err) throw err;
              socket.emit('auth register', {status:"succesfull", email:user.email});
            });
          }
        });
    });

    socket.on('disconnect', function () {
      console.log("Client disconected...");
  });
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  if(req.cookies.username){
    res.render('pages/index.ejs', {email:req.cookies.username});
  }
  else{
    res.redirect('/login');
  }
});

app.get('/dashboard', function(req, res) {
  if(req.cookies.username){
    res.render('pages/index.ejs', {email:req.cookies.username});
  }
  else{
    res.redirect('/login');
  }
});

app.get('/login', function(req, res){
  res.render('pages/login');
});

app.get('/logout', function(req, res){
    res.render('pages/logout');

});

app.get('/register', function(req, res){
  res.render('pages/register');
});

server.listen(3000);

console.log('port: 3000');