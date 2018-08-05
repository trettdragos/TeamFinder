let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

const teams_per_page = 25;

router.get('/*', (req, res, next) => require('../other/security').routeTokenVerification(req, res, next));

router.get('/', function (req, res) {
    res.redirect('/teams/page/1');
    // if (req.cookies.username) {
    //     con.query("SELECT * FROM teams WHERE ACTIVE=1  ORDER BY TIMESTAMP DESC", function (err, teams, fields) {
    //         if (err) throw err;
    //         teams.forEach((team) => {
    //             team.PLATFORMS = team.PLATFORMS.replace(/\\'/g, '\\"');
    //             require('../other/security').convertUUIDToBase64(team.ID, (b64) => team.BASE64 = b64);
    //         });
    //         res.render('pages/teams', {email: req.cookies.username, tab: '3', posts: teams, term: ''});
    //     });
    // }
    // else {
    //     res.redirect('/login');
    // }
});

router.get('/page', (req, res) => {
    res.redirect('/projects/page/1');
});

router.get('/page/:num', (req, res) => {
    let current_page = parseInt(req.params.num);
    if (current_page < 1) {
        res.redirect('/teams/page/1');
        return;
    }
    if (req.cookies.username) {
        con.query("SELECT * FROM teams WHERE ACTIVE=1 ORDER BY TIMESTAMP DESC", function (err, teams, fields) {
            if (err) throw err;

            let last_page = teams.length / teams_per_page;
            if (last_page !== parseInt(last_page)) {
                last_page = parseInt(last_page) + 1;
            }

            if (current_page > last_page) {
                res.redirect('/teams/page/' + last_page);
                return;
            }
            if (last_page === 0) {
                last_page = 1;
            }

            let start_page = current_page - 2;
            let end_page = current_page + 2;
            if (current_page <= 2) {
                start_page = 1;
                end_page = 5 <= last_page ? 5 : last_page;
            } else if (current_page >= last_page - 1) {
                start_page = last_page - 4;
                end_page = last_page;
            }

            if (start_page < 1)
                start_page = 1;
            if (end_page > last_page)
                end_page = last_page;


            let pages = {
                current_page: current_page,
                start_page: start_page,
                end_page: end_page,
                last_page: last_page
            };

            loaded_teams = teams.slice((current_page - 1) * teams_per_page, current_page * teams_per_page);
            loaded_teams.forEach((team) => {
                team.PLATFORMS = team.PLATFORMS.replace(/\\'/g, '\\"');
                require('../other/security').convertUUIDToBase64(team.ID, (b64) => team.BASE64 = b64);
            });

            res.render('pages/teams.ejs', {
                email: req.cookies.username,
                tab: '3',
                posts: loaded_teams,
                term: '',
                pages: pages
            });
        });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/create', function (req, res) {
    if (req.cookies.username) {
        res.render('pages/create-team', {tab: '3'});
    }
    else {
        res.redirect('/login');
    }
});

router.get('/search', function (req, res) {
    res.redirect('/teams');
});

router.get('/search/:searchTerm', function (req, res) {
    res.redirect(`/teams/search/${req.params.searchTerm}/page/1`);
});

router.get('/search/:searchTerm/page', (req, res) => {
    res.redirect(`/teams/search/${req.params.searchTerm}/page/1`);
});

router.get('/search/:searchTerm/page/:num', (req, res) => {
    let current_page = parseInt(req.params.num);
    if (current_page < 1) {
        res.redirect('/teams/search/' + req.params.searchTerm + '/page/1');
        return;
    }
    if (req.cookies.username) {
        con.query("SELECT * FROM teams WHERE NAME LIKE ? ORDER BY TIMESTAMP DESC", [`%${req.params.searchTerm}%`], function (err, teams, fields) {
            if (err) throw err;

            let last_page = teams.length / teams_per_page;
            if (last_page !== parseInt(last_page)) {
                last_page = parseInt(last_page) + 1;
            }
            if (last_page === 0) {
                last_page = 1;
            }

            if (current_page > last_page) {
                res.redirect('/teams/search/' + req.params.searchTerm + '/page/' + last_page);
                return;
            }

            let start_page = current_page - 2;
            let end_page = current_page + 2;
            if (current_page <= 2) {
                start_page = 1;
                end_page = 5 <= last_page ? 5 : last_page;
            } else if (current_page >= last_page - 1) {
                start_page = last_page - 4;
                end_page = last_page;
            }

            if (start_page < 1)
                start_page = 1;
            if (end_page > last_page)
                end_page = last_page;

            let pages = {
                current_page: current_page,
                start_page: start_page,
                end_page: end_page,
                last_page: last_page
            };

            loaded_teams = teams.slice((current_page - 1) * teams_per_page, current_page * teams_per_page);
            loaded_teams.forEach((team) => {
                team.PLATFORMS = team.PLATFORMS.replace(/\\'/g, '\\"');
                require('../other/security').convertUUIDToBase64(team.ID, (b64) => team.BASE64 = b64);
            });

            res.render('pages/teams.ejs', {
                email: req.cookies.username,
                tab: '3',
                posts: loaded_teams,
                term: '',
                pages: pages
            });
        });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/register', function (req, res) {
    team = req.query;
    con.query("SELECT * FROM teams WHERE NAME = ? LIMIT 1", [team.name], function (err, result, fields) {
        if (err) throw err;
        if (result[0]) {
            res.send({status: "failed, team already exists"});
        }
        else {
            let platforms = [];
            if (team.platforms) {
                platforms = team.platforms;
            }
            require('../other/security').getUUID((uuid) => {
                con.query("INSERT INTO teams (ID, TIMESTAMP, NAME, SUMMARY, HACKATON, SECTION, START_DATE, END_DATE, PLATFORMS, RESOURCE_LINK, NR_MEMBERS, POSTS, LEADER, ACTIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [uuid, Date.now().toString(), team.name, team.summary, team.hackaton, team.section, team.startDate, team.endDate, JSON.stringify(platforms), team.resource_link, team.nrMembers, '', team.leader, 1], function (err, result) {
                    if (err) {
                        socket.emit('register team', {status: JSON.stringify(err)});
                    }
                    res.send({status: "successful"});
                })
            });
        }
    });
});

router.post('/finish', function (req, res) {
    debug.log(req.body);
    let team = req.body;
    con.query("UPDATE teams SET ACTIVE=0 WHERE ID=?", [team.team_id], function (err, result) {
        if (err) throw err;
        team.team_collaborators.substr(0, team.team_collaborators.length - 1).split(',').concat([team.team_founder]).forEach((user) => {
            con.query("UPDATE accounts SET REPUTATION = REPUTATION + 2 WHERE EMAIL = ?", [user], (err, res) => {
                if (err) throw err;
            });
        });
        res.send({status: "successful"});
    })
});

router.post('/update', function (req, res) {
    team = req.body;
    debug.log(team);
    let platforms = [];
    if (team.platforms) {
        platforms = JSON.parse(team.platforms);
    }
    require('../other/security').convertBase64ToUUID(team.BASE64, (uuid) => {
        con.query("UPDATE teams SET SUMMARY=?, RESOURCE_LINK=?, PLATFORMS=?, HACKATON=?, SECTION=?, START_DATE=?, END_DATE=? WHERE ID=?", [team.summary, team.resource_link, JSON.stringify(platforms), team.hackaton, team.section, team.startDate, team.endDate, uuid], function (err, result) {
            if (err) throw err;
            res.send({status: "successful"});
        })
    });
});

router.post('/remove-member', (req, res) => {
    let members = req.body.team_posts.trim().substr(0, req.body.team_posts.length - 1).split(',');
    con.query("UPDATE accounts SET REPUTATION = REPUTATION - 2 WHERE EMAIL = ?", [req.body.collaborator], function (err1, result1) {
        if (err1) throw err1;
        let index = members.indexOf(req.query.collaborator);
        members.splice(index, 1);
        let newMembers = '';
        members.forEach((member) => newMembers += member + ',');
        con.query('UPDATE teams SET POSTS = ? WHERE ID = ?', [newMembers, req.body.team_id], (err, result) => {
            if (err) throw err;
            res.send({status: 'successful'})
        });
    })
});

router.get('/:team', function (req, res) {
    if (!req.cookies.username)
        res.redirect('/login');

    if (req.params.team == 'create')
        return;
    require('../other/security').convertBase64ToUUID(req.params.team, (uuid) => {
        con.query("SELECT * FROM teams WHERE ID = ? LIMIT 1", [uuid], function (err, result, fields) {
            if (err) throw err;
            if (result[0]) {
                result[0].BASE64 = req.params.team;
                con.query("SELECT * FROM group_messages WHERE group_uuid = ?", [uuid], function (error, result2) {
                    if (error) throw error;
                    let options = {
                        weekday: "long", year: "numeric", month: "short",
                        day: "numeric", hour: "2-digit", minute: "2-digit",
                        second: '2-digit', hour12: false
                    };
                    for (index in result2) {
                        result2[index].timestamp = new Date(parseInt(result2[index].timestamp)).toLocaleTimeString("en-us", options);
                    }
                    let people = result[0].POSTS.trim().substr(0, result[0].POSTS.trim().length - 1).split(',');
                    let list = '';
                    people.forEach((person) => {
                        list += `\'${person}\', `
                    });
                    list = list.substr(0, list.length - 2);
                    con.query(`SELECT * FROM accounts WHERE EMAIL in (${list})`, (err, result3) => {
                        con.query('SELECT * FROM accounts WHERE EMAIL = ?', [result[0].LEADER], (err, result4) => {
                            result[0].PLATFORMS = result[0].PLATFORMS.replace(/\\'/g, '\\"');
                            res.render('pages/team-page', {
                                email: req.cookies.username,
                                uuid: req.cookies.uuid,
                                tab: '3',
                                team: result[0],
                                messages: result2,
                                accounts: result3,
                                leader: result4[0]
                            });
                        });
                    });
                });
            }
            else {
                res.render('pages/404.ejs', {
                    message_main: "The team you're looking for does not exist (404)",
                    message_redirect: `Click <a href=\"/teams\">here</a> to go back`,
                    message_page: "Requested team: " + req.params.team
                });
            }
        })
    });
});


router.get('/edit/:team', function (req, res) {
    if (!req.cookies.username)
        res.redirect('/login');

    require('../other/security').convertBase64ToUUID(req.params.team, (uuid) => {
        con.query("SELECT * FROM teams WHERE ID = ? LIMIT 1", [uuid], function (err, result, fields) {
            if (err) throw err;
            if (result[0]) {
                if (result[0].LEADER != req.cookies.username) {
                    res.render('pages/404.ejs', {
                        message_main: "You are not allowed to edit the team (403)",
                        message_redirect: `Click <a href=\"/teams/${req.params.team}\">here</a> to go back`,
                        message_page: "Requested team: " + req.params.team
                    });
                } else {
                    result[0].BASE64 = req.params.team;
                    result[0].PLATFORMS = result[0].PLATFORMS.replace(/\\'/g, '\\"');
                    res.render('pages/edit-team', {email: req.cookies.username, tab: '3', team: result[0]});
                }
            }
            else {
                res.render('pages/404.ejs', {
                    message_main: "The team you're looking for does not exist (404)",
                    message_redirect: `Click <a href=\"/teams\">here</a> to go back`,
                    message_page: "Requested team: " + req.params.team
                });
            }
        })
    });
});


module.exports = {url: '/teams', router: router};