let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

router.get('/', function (req, res) {
    res.render('pages/register.ejs');
});
router.get('/confirmed', function (req, res) {
    res.render('pages/register-confirmed.ejs');
});

router.get('/auth', function (req, res) {
    user = req.query;
    console.log(user);
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

module.exports = router;