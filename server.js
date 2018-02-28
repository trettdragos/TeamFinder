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

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "TeamFinder"
});

passport.use(new Strategy(
  function(username, password, cb) {
    con.query("SELECT * FROM accounts WHERE EMAIL = ? AND PASSWORD = ? LIMIT 1", [username, password], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    if(result.EMAIL = username)
      return cb(null, result);
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
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });
    socket.on('client connected', console.log);
    var data = 0 + 1 ;
    socket.on('reply with event', function(data){
      //listen for changes in the db
      data = data + 1;
      socket.emit('received event', data)
    });
});

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  if(!req.user){
    res.redirect('/login');
  }
  res.render('pages/index', { user: req.user })
  console.log(req.user);
});

app.get('/login', function(req, res){
  console.log("lojin")
  res.render('pages/login.ejs');
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