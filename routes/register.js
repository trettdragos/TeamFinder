let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let request = require('request');
let security = require('../other/security');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

router.post('/auth', function (req, res) {
    user = req.body;
    debug.log(user);
    //https://www.google.com/recaptcha/api/siteverify
    debug.log(user.grecaptcharesponse);
    request(
        'https://www.google.com/recaptcha/api/siteverify?secret=6LfoYGgUAAAAAFqy55ilTtFvaF4p0ShFVwPd3Iq2&response='+user.grecaptcharesponse+'&remoteip='+req.connection.remoteAddress,
        function (error, response, body) {
            body = JSON.parse(body);
            if(body.success !== undefined && !body.success) {
                debug.log(body);
                res.send({status: "recaptcha invalid", email: user.email});
            } else {
                debug.log('recaptcha ok');
                con.query("SELECT * FROM accounts WHERE EMAIL = ? LIMIT 1", [user.email], function (err, result, fields) {
                    if (err) throw err;
                    if (result[0]) {
                        // debug.log("user with email " + user.email + " already exists");
                        res.send({status: "Email already used.", email: user.email});
                    }
                    else {
                        // debug.log("registering user: " + user.name + " with the email: " + user.email);
                        /* Encrypt password */
                        security.encryptPassword(user.password, (hash) => {
                            // debug.log(user.skills);
                            // debug.log(JSON.stringify(user.skills));
                            let skills = [];
                            if (user.skills) {
                                skills = user.skills;
                                // debug.log('ADDED SKILLS')
                            }
                            let profile = {
                                "GITHUB": user.github,
                                "LINKEDIN": user.linkedin,
                                "SKILLS": skills,
                                "ABOUT": "",
                                "PROFILE_PICTURE": ""
                            };
                            security.getUUID((uuid) => {
                                con.query("INSERT INTO accounts (ID, USERNAME, EMAIL, PASSWORD, PROFILE, CONFIRMED, NOTIFICATION) VALUES (?, ?, ?, ?, ?, '0', '[]')", [uuid, user.name, user.email, hash, JSON.stringify(profile)], function (err, result) {
                                    if (err) throw err;
                                    let email_template = require('../other/utils').activateAccountEmailTemplate;
                                    email_template = email_template.replace(new RegExp('{{LINK}}', 'g'), 'http://localhost:3000/verification/' + user.email);
                                    let msg = {
                                        to: user.email,
                                        from: 'register@hacksquad.com',
                                        subject: 'Please verify your email',
                                        text: 'and easy to do anywhere, even with Node.js',
                                        html: email_template,
                                    };
                                    sgMail.send(msg);
                                    // debug.log('sent verification email to ' + user.email);
                                    res.send({status: "successful"});
                                });
                            });
                        });
                    }
                })
            }
        }
    );
});


module.exports = {url: '/register', router: router};