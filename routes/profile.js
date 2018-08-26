let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let security = require('../other/security');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

router.get('/*', (req, res, next) => security.routeTokenVerification(req, res, next));

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
    debug.log(notification);
    con.query("SELECT NOTIFICATION FROM accounts WHERE EMAIL = ?", [notification.leader], function (err, result) {
        if (err) throw err;
        let stringNotif = result[0].NOTIFICATION;
        let notif = JSON.parse(stringNotif);
        for (i in notif) {
            if (notif[i].id === notification.id) {
                notif.splice(i, 1);
            }
        }
        stringNotif = JSON.stringify(notif);
        con.query("UPDATE accounts SET NOTIFICATION = ? WHERE EMAIL = ?", [stringNotif, notification.leader], function (err2, result2) {
            if (err2) throw err2;
            if (result2.affectedRows != 0) {
                // debug.log('updated notifications for leader');
                if (notification.status === "accept") {
                    con.query("UPDATE accounts SET REPUTATION = REPUTATION + 1 WHERE EMAIL = ?", [notification.requester], function (err22, result22) {
                        if (err22) throw err22;
                        let table = notification.type + 's';
                        let col;
                        if (table === 'projects')
                            col = 'COLLABORATORS';
                        else col = 'POSTS';
                        con.query("SELECT " + col + " FROM " + table + " WHERE ID = ?", [notification.name], function (err3, result3) {
                            if (err3) throw err3;
                            let coll;
                            if (col == 'POSTS')
                                coll = result3[0].POSTS;
                            else coll = result3[0].COLLABORATORS;
                            coll = coll + notification.requester + ',';
                            con.query("UPDATE " + table + " SET " + col + " = ? WHERE ID = ?", [coll, notification.name], function (err4, result4) {
                                if (err4) throw err4;
                                if (result4.affectedRows != 0) {
                                    res.send({status: "successful"});
                                }
                            });
                        });
                    })
                } else {
                    res.send({status: "successful"});
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
                    let notifications = JSON.parse(result[0].NOTIFICATION);
                    let requests = notifications.map((notification) => {
                        return new Promise((resolve) => {
                            con.query("SELECT USERNAME, EMAIL, REPUTATION FROM accounts WHERE email = ?", [notification.user], (errNotif, account) => {
                                if (errNotif) throw errNotif;
                                let data = {
                                    USERNAME: account[0].USERNAME,
                                    EMAIL: account[0].EMAIL,
                                    REPUTATION: account[0].REPUTATION
                                };
                                notification.user = data;
                                con.query("SELECT NAME FROM " + notification.type + "s WHERE ID = ?", [notification.uuid], (errPT, project_team) => {
                                    if(errPT) throw errPT;
                                    notification.data = {
                                        NAME: project_team[0].NAME,
                                        UUID: notification.uuid
                                    };
                                    security.convertUUIDToBase64(notification.uuid, (b64) => {notification.data.BASE64 = b64; resolve()});
                                });
                            });
                        });
                    });
                    Promise.all(requests).then(() => {
                        projects.forEach((project) => security.convertUUIDToBase64(project.ID, (base64) => project.BASE64 = base64));
                        teams.forEach((team) => security.convertUUIDToBase64(team.ID, (base64) => team.BASE64 = base64));
                        debug.log(notifications);
                        res.render('pages/profile', {
                            username: req.cookies.username,
                            // profile: "https://identicon-api.herokuapp.com/"+req.params.account_id+"/512?format=png",
                            tab: '4',
                            name: result[0].USERNAME,
                            email: req.params.account_id,
                            projects: projects,
                            teams: teams,
                            profile: JSON.parse(result[0].PROFILE),
                            notifications: notifications,
                            reputation: JSON.parse(result[0].REPUTATION)
                        });
                    });
                }
            });
        });
    });
});

router.get('/:account_id/chat', (req, res) => {
    if(!req.cookies.username)
        res.redirect('/login');
    con.query("SELECT ID FROM accounts WHERE EMAIL = ? LIMIT 1", [req.params.account_id], function(err, result, fields){
        if(err) throw err;
        con.query("SELECT * FROM group_messages WHERE (group_uuid = ? AND from_uuid = ?) OR (group_uuid = ? AND from_uuid = ?)", [req.cookies.uuid, result[0].ID, result[0].ID, req.cookies.uuid], function(err2, result2, fields2){
            if(err2) throw err2;
            let options = {
                weekday: "long", year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit",
                second: '2-digit', hour12: false
            };
            for (index in result2) {
                result2[index].timestamp = new Date(parseInt(result2[index].timestamp)).toLocaleTimeString("en-us", options);
            }
            res.render('pages/pm.ejs', {
                tab: '4',
                email: req.cookies.username,
                messages: result2,
                uuid: req.cookies.uuid,
                receiver: req.params.account_id
            });
        });
    }); 
});

router.post('/update-profile', (req, res) => {
    let xss = require('xss');
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
                    res.end(JSON.stringify({code: 200, message: "Links, about and skills successfully updated!"}));
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
    let xss = require('xss');
    let data = JSON.parse(xss(JSON.stringify(req.body)));


});

module.exports = {url: '/profile', router: router};