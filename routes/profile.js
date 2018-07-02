let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

router.get('/*', (req, res, next) => require('../other/security').routeTokenVerification(req, res, next));

router.get('/', (req, res) => {
    res.redirect('/profile/' + req.cookies.username);
});

router.get('/edit', (req, res) => {
    con.query('SELECT * FROM accounts WHERE EMAIL = ?', [req.cookies.username], (db_err, db_res) => {
        if (db_err) throw db_err;
        // debug.log(db_res[0].PROFILE);
        res.render('pages/edit-profile.ejs', {
            username: req.cookies.username,
            tab: '4',
            name: db_res[0].USERNAME,
            profile: JSON.parse(db_res[0].PROFILE),
        })
    });
});

router.get('/answer', (req, res) => {
    notification = req.query;
    // debug.log(notification);
    con.query("SELECT NOTIFICATION FROM accounts WHERE EMAIL = ?", [notification.leader], function (err, result) {
        if (err) throw err;
        let stringNotif = result[0].NOTIFICATION;
        let notif = JSON.parse(stringNotif);
        for (i in notif) {
            if (notif[i].id === notification.id) {
                notif[i].vis = "true";
            }
        }
        stringNotif = JSON.stringify(notif);
        con.query("UPDATE accounts SET NOTIFICATION = ? WHERE EMAIL = ?", [stringNotif, notification.leader], function (err2, result2) {
            if (err2) throw err2;
            if (result2.affectedRows != 0) {
                // debug.log('updated notifications for leader');
                if (notification.status === "accept") {
                    let table = notification.type + 's';
                    let col;
                    if (table === 'projects')
                        col = 'COLLABORATORS';
                    else col = 'POSTS';
                    con.query("SELECT " + col + " FROM " + table + " WHERE NAME = ?", [notification.name], function (err3, result3) {
                        if (err3) throw err3;
                        let coll;
                        if (col == 'POSTS')
                            coll = result3[0].POSTS;
                        else coll = result3[0].COLLABORATORS;
                        coll = coll + notification.requester + ',';
                        con.query("UPDATE " + table + " SET " + col + " = ? WHERE NAME = ?", [coll, notification.name], function (err4, result4) {
                            if (err4) throw err4;
                            if (result4.affectedRows != 0) {
                                // debug.log('added requester as colaborator');
                                res.send({status: "successful"});
                            }
                        });
                    });
                }
            }
        });
    });
});

router.get('/:account_id', (req, res) => {
    // if (req.cookies.username) {
    let searchFor = '%' + req.params.account_id + '%';
    con.query("SELECT * FROM projects WHERE COLLABORATORS LIKE ? OR FOUNDER = ? ORDER BY TIMESTAMP DESC", [searchFor, req.params.account_id], function (err, projects, fields) {
        if (err) throw err;
        con.query("SELECT * FROM teams WHERE POSTS LIKE ? OR LEADER = ? ORDER BY TIMESTAMP DESC", [searchFor, req.params.account_id], function (errTeams, teams, fields2) {
            if (errTeams) throw errTeams;
            con.query("SELECT * FROM accounts WHERE EMAIL = ?", [req.params.account_id], function (err3, result, fields3) {
                if (err3 || !result[0]) {
                    console.error(err3);
                    res.render('pages/404.ejs', {
                        message_main: "The profile you're looking for does not exist (404)",
                        message_redirect: `Click <a href=\"/profile\">here</a> to go to your profile`,
                        message_page: "Requested profile: " + req.params.account_id
                    });
                } else {
                    projects.forEach((project) => require('../other/security').convertUUIDToBase64(project.ID, (base64) => project.BASE64 = base64));
                    teams.forEach((team) => require('../other/security').convertUUIDToBase64(team.ID, (base64) => team.BASE64 = base64));
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
                }
            });
        });
    });
});

router.post('/update-profile', (req, res) => {
    let xss = require('xss');
    let security = require('../other/security');
    debug.log(req.body);
    let req_data = JSON.parse(xss(JSON.stringify(req.body)));
    switch (req_data.action) {
        case 'CHANGE_PASSWORD': {
            let data = JSON.parse(req_data.body);
            // debug.log(data);
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
                if (db_err) throw db_err;
                let db_data = JSON.parse(db_res[0].PROFILE);
                db_data.PROFILE_PICTURE = data;
                con.query('UPDATE accounts SET PROFILE = ? WHERE EMAIL = ?', [JSON.stringify(db_data), req.cookies.username], (db_err_2, db_res_2) => {
                    if (db_err_2) throw db_err_2;
                    res.end(JSON.stringify({code: 200, message: "Profile picture successfully changed!"}));
                })
            });
            break;
        }
        case 'RESET_PROFILE_PICTURE': {
            con.query('SELECT * FROM accounts WHERE EMAIL = ?', [req.cookies.username], (db_err, db_res) => {
                if (db_err) throw db_err;
                let db_data = JSON.parse(db_res[0].PROFILE);
                db_data.PROFILE_PICTURE = '';
                con.query('UPDATE accounts SET PROFILE = ? WHERE EMAIL = ?', [JSON.stringify(db_data), req.cookies.username], (db_err_2, db_res_2) => {
                    if (db_err_2) throw db_err_2;
                    res.end(JSON.stringify({code: 200, message: "Profile picture successfully reset!"}));
                })
            });
            break;
        }
        case 'UPDATE_LINKS_AND_STATUS': {
            let data = JSON.parse(req_data.body);
            con.query('SELECT * FROM accounts WHERE EMAIL = ?', [req.cookies.username], (db_err, db_res) => {
                if (db_err) throw db_err;
                let db_data = JSON.parse(db_res[0].PROFILE);
                db_data.GITHUB = data.githubLink;
                db_data.LINKEDIN = data.linkedinLink;
                db_data.ABOUT = data.about;
                db_data.SKILLS = data.SKILLS;
                con.query('UPDATE accounts SET PROFILE = ? WHERE EMAIL = ?', [JSON.stringify(db_data), req.cookies.username], (db_err_2, db_res_2) => {
                    if (db_err_2) throw db_err_2;
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
        if (db_err) throw db_err;
        let db_data = JSON.parse(db_res[0].PROFILE);
        db_data.PROFILE_PICTURE = data.url;
        con.query('UPDATE accounts SET PROFILE = ? WHERE EMAIL = ?', [JSON.stringify(db_data), req.cookies.username], (db_err_2, db_res_2) => {
            if (db_err_2) throw db_err_2;
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