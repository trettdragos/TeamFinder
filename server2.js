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
    console.log('Client connected...');
    socket.on('auth login',function (client) {
        con.query("SELECT * FROM accounts WHERE EMAIL = ? AND PASSWORD = ? LIMIT 1", [client.email, client.password], function (err, result, fields) {
          if (err) throw err;
          if(result[0]){
            console.log("auth succesfull");
            socket.emit('auth login', {status:"succesfull", email:client.email});
          }
          else{
            console.log("auth failed");
            socket.emit('auth login', {status:"failed", email:client.email});
          }
        });
    });
    socket.on('disconnect', function () {
      console.log("Client disconected...");
  });
});

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
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