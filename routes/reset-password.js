let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let security = require('../other/security');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

router.get('/', (req, res) => {
    res.render('pages/reset-password.ejs');
});


router.get('/check-email', (req, res) => {
    res.render('pages/reset-password-check-email.ejs');
});

router.get('/success', (req, res) => {
    res.render('pages/reset-password-success.ejs');
});

router.get('/:token', (req, res) => {
    let [token,email] = req.params.token.split(';');
    debug.log(token);
    debug.log(email);
    if(token == null || email == null) {
        res.render('pages/404.ejs', {
            message_main: "Invalid token (400)",
            message_redirect: `Click <a href=\"/\">here</a> to go back to home`,
            message_page: ""
        });
    } else {
        security.verifyEmailToken(email, token, (result) => {
            if(!result) {
                res.render('pages/404.ejs', {
                    message_main: "Invalid token (400)",
                    message_redirect: `Click <a href=\"/\">here</a> to go back to home`,
                    message_page: ""
                });
            } else {
                // res.send('Success');
                res.render('pages/reset-password-form.ejs', {email: email});
            }
        })
    }
});

router.post('/reset', (req, res) => {
    let email = req.body.email;
    con.query('SELECT EMAIL from accounts WHERE EMAIL = ?', [email], (err, results) => {
        if (err) throw err;
        if (results.length == 0) {
            res.send({status: 'Fail'})
        } else {
            security.generateEmailToken(email, (token) => {
                let email_template = require('../other/utils').resetPasswordEmailTemplate;
                email_template = email_template.replace(new RegExp('{{LINK}}', 'g'), 'http://localhost:3000/reset-password/' + token+';'+email);
                let msg = {
                    to: email,
                    from: 'register@hacksquad.com',
                    subject: 'Reset your password',
                    text: 'Reset your password',
                    html: email_template,
                };
                sgMail.send(msg);
                res.send({status: "Success"});
            });
        }
    });
});

router.post('/reset-success', (req, res) => {
   let password = req.body.password;
   let email = req.body.email;
   debug.log(password);
   debug.log(email);

   security.encryptPassword(password, (encrypted) => {
      con.query('UPDATE accounts SET PASSWORD = ? WHERE EMAIL = ?', [encrypted, email], (err, results) => {
          if (err) throw err;
          res.send({status: 'Success'});
      })
   });
});

module.exports = {url: '/reset-password', router: router};