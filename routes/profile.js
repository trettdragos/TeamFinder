let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

router.get('/', (req, res) => {
    res.redirect('/profile/' + req.cookies.username);
});

router.get('/edit', (req, res) => {
    con.query('SELECT * FROM accounts WHERE EMAIL = ?', [req.cookies.username], (db_err, db_res) => {
        if (db_err) throw db_err;
        res.render('pages/edit-profile.ejs', {
            username: req.cookies.username,
            tab: '4',
            name: db_res[0].USERNAME,
            profile: JSON.parse(db_res[0].PROFILE),
        })
    });
});

router.get('/:account_id', (req, res) => {
    // if (req.cookies.username) {
    let searchFor = '%' + req.params.account_id + '%';
    console.log(searchFor);
    con.query("SELECT * FROM projects WHERE COLLABORATORS LIKE ? OR FOUNDER = ?", [searchFor, req.params.account_id], function (err, projects, fields) {
        if (err) throw err;
        con.query("SELECT * FROM teams WHERE POSTS LIKE ? OR LEADER = ?", [searchFor, req.params.account_id], function (errTeams, teams, fields2) {
            if (errTeams) throw errTeams;
            con.query("SELECT * FROM accounts WHERE EMAIL = ?", [req.params.account_id], function (err3, result, fields3) {
                if (err3 || !result[0]) {
                    console.error(err3);
                    res.render('pages/404.ejs', {
                        message_main: "The profile you're looking for does not exist (404)",
                        message_redirect: `Click <a href=\"/profile\">here</a> to go to your profile`,
                        message_page: "Requested profile: " + req.params.account_id
                    });
                    return;
                }
                res.render('pages/profile', {
                    username: req.cookies.username,
                    // profile: "https://identicon-api.herokuapp.com/"+req.params.account_id+"/512?format=png",
                    tab: '4',
                    name: result[0].USERNAME,
                    email: req.params.account_id,
                    projects: projects,
                    teams: teams,
                    profile: JSON.parse(result[0].PROFILE),
                    notifications: JSON.parse(result[0].NOTIFICATION)
                });
            });
        });
    });
});

router.post('/update-profile', (req, res) => {
    let xss = require('xss');
    let security = require('../other/security');
    let req_data = JSON.parse(xss(JSON.stringify(req.body)));
    switch( req_data.action ) {
        case 'CHANGE_PASSWORD': {
            let data = JSON.parse(req_data.body);
            con.query('SELECT PASSWORD FROM accounts WHERE EMAIL = ?', [req.cookies.username], (err, db_res) => {
                if (err) throw err;
                security.checkPassword(data.currentPassword, db_res[0].PASSWORD, (ok) => {
                    if (!ok) {
                        res.end(JSON.stringify({code: 403, message: "Invalid current password!"}));
                    } else {
                        security.encryptPassword(data.newPassword, (enc) => {
                            con.query("UPDATE accounts SET PASSWORD = ? WHERE EMAIL = ?", [enc, req.cookies.username], (err, db_res) => {
                                if (err) throw err;
                                res.end(JSON.stringify({code: 200, message: "Password successfully changed!"}));
                            });
                        });
                    }
                })
            });
            break;
        }
        case 'CHANGE_PROFILE_PICTURE': {
            let data = req_data.body;
            con.query('SELECT * FROM accounts WHERE EMAIL = ?', [req.cookies.username], (db_err, db_res) => {
                if(db_err) throw db_err;
                let db_data = JSON.parse(db_res[0].PROFILE);
                db_data.PROFILE_PICTURE = data;
                con.query('UPDATE accounts SET PROFILE = ? WHERE EMAIL = ?', [JSON.stringify(db_data), req.cookies.username], (db_err_2, db_res_2) => {
                    if(db_err_2) throw db_err_2;
                    res.end(JSON.stringify({code: 200, message: "Profile picture successfully changed!"}));
                })
            });
            break;
        }
        case 'RESET_PROFILE_PICTURE': {
            con.query('SELECT * FROM accounts WHERE EMAIL = ?', [req.cookies.username], (db_err, db_res) => {
                if(db_err) throw db_err;
                let db_data = JSON.parse(db_res[0].PROFILE);
                db_data.PROFILE_PICTURE = '';
                con.query('UPDATE accounts SET PROFILE = ? WHERE EMAIL = ?', [JSON.stringify(db_data), req.cookies.username], (db_err_2, db_res_2) => {
                    if(db_err_2) throw db_err_2;
                    res.end(JSON.stringify({code: 200, message: "Profile picture successfully reset!"}));
                })
            });
            break;
        }
        case 'UPDATE_LINKS_AND_STATUS': {
            let data = JSON.parse(req_data.body);
            con.query('SELECT * FROM accounts WHERE EMAIL = ?', [req.cookies.username], (db_err, db_res) => {
                if(db_err) throw db_err;
                let db_data = JSON.parse(db_res[0].PROFILE);
                db_data.GITHUB = data.githubLink;
                db_data.LINKEDIN = data.linkedinLink;
                db_data.ABOUT = data.about;
                con.query('UPDATE accounts SET PROFILE = ? WHERE EMAIL = ?', [JSON.stringify(db_data), req.cookies.username], (db_err_2, db_res_2) => {
                    if(db_err_2) throw db_err_2;
                    res.end(JSON.stringify({code: 200, message: "Profile picture successfully reset!"}));
                })
            });
            break;
        }
    }
});

router.post('/change-profile-picture', (req, res) => {
    let xss = require('xss');
    let data = JSON.parse(xss(JSON.stringify(req.body)));

    con.query('SELECT * FROM accounts WHERE EMAIL = ?', [req.cookies.username], (db_err, db_res) => {
        if(db_err) throw db_err;
        console.log(data);
        console.log(db_res[0].PROFILE);
        let db_data = JSON.parse(db_res[0].PROFILE);
        console.log(db_data);
        db_data.PROFILE_PICTURE = data.url;
        console.log(db_data);
        con.query('UPDATE accounts SET PROFILE = ? WHERE EMAIL = ?', [JSON.stringify(db_data), req.cookies.username], (db_err_2, db_res_2) => {
            if(db_err_2) throw db_err_2;
            res.end(JSON.stringify({code: 200, message: "Profile picture successfully changed!"}));
        })
    });
});

router.post('/change-password', (req, res) => {
    let security = require('../other/security');
    let xss = require('xss');
    let data = JSON.parse(xss(JSON.stringify(req.body)));


});

module.exports = {url: '/profile', router: router};