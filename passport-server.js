var express = require('express');
var app = express();
var sleep = require('sleep');
var path = require('path');
var mysql = require('mysql');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {
    log: false,
    agent: false,
    origins: '*:*'
});

var user=[{
  ID:"",
  EMAIL:"",
  USERNAME:"",
  PASSWORD:""
}]

var con = mysql.createConnection({
  host: "localhost",x 
  user: "root",
  password: "password",
  database: "TeamFinder"
});

passport.use(new Strategy(
  function(username, password, cb) {
    con.query("SELECT * FROM accounts WHERE EMAIL = ? AND PASSWORD = ? LIMIT 1", [username, password], function (err, result, fields) {
    if (err) throw err;
    if(result.EMAIL = username){
      user = result;
      return cb(null, result);
    }
    else return cb(null, false);
  });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  cb(null, user);
});

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket) {
    console.log('Client connected...');
    socket.on('reply with event', function(data){
      //listen for changes in the db
      con.query("SELECT * FROM accounts WHERE EMAIL = ? AND PASSWORD = ? LIMIT 1", [user[0].EMAIL, user[0].PASSWORD], function (err, result, fields) {
        if (err) throw err;
        user=result;
      });
      socket.emit('received event', data);
    });
    socket.on('disconnect', function () {
      console.log("Client disconected...");
  });
});

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  if(!req.user){
    res.redirect('/login');
  }
  res.render('pages/index', { user: req.user })
});

app.get('/login', function(req, res){
  res.render('pages/login');
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

server.listen(3000);

console.log('port: 3000');