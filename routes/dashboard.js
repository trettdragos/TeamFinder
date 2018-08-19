let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

const posts_per_page = 25;

// router.get('/', function (req, res) {
//     con.query("SELECT * FROM projects WHERE ACTIVE=1 ORDER BY TIMESTAMP DESC", function (err, projects, fields) {
//         if (err) throw err;
//         projects.forEach((project) => require('../other/security').convertUUIDToBase64(project.ID, (b64) => project.BASE64 = b64));
//         con.query("SELECT * FROM teams WHERE ACTIVE=1 ORDER BY TIMESTAMP DESC", function (err, teams, fields) {
//             if (err) throw err;
//             teams.forEach((team) => require('../other/security').convertUUIDToBase64(team.ID, (b64) => team.BASE64 = b64));
//             let list = teams.concat(projects);
//             res.render('pages/dashboard.ejs', {email: req.cookies.username, tab: '1', posts: list, term: ''});
//         });
//     });
// });

router.get('/', function (req, res) {
    res.redirect('/dashboard/page/1');
});

router.get('/page', (req, res) => {
    res.redirect('/dashboard/page/1');
});

router.get('/page/:num', (req, res) => {
    let current_page = parseInt(req.params.num);
    if (current_page < 1) {
        res.redirect('/dashboard/page/1');
        return;
    }
    con.query("SELECT * FROM projects WHERE ACTIVE=1 ORDER BY TIMESTAMP DESC", function (err, projects, fields) {
        if (err) throw err;
        con.query("SELECT * FROM teams WHERE ACTIVE=1 ORDER BY TIMESTAMP DESC", function (err, teams, fields) {
            if (err) throw err;
            let list = teams.concat(projects);

            let last_page = projects.length / posts_per_page;
            if (last_page !== parseInt(last_page)) {
                last_page = parseInt(last_page) + 1;
            }
            if(last_page === 0) {
                last_page = 1;
            }

            if (current_page > last_page) {
                res.redirect('/dashboard/page/' + last_page);
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
            if(start_page < 1)
                start_page = 1;
            if(end_page > last_page)
                end_page = last_page;

            let pages = {
                current_page: current_page,
                start_page: start_page,
                end_page: end_page,
                last_page: last_page
            };

            loaded_posts = list.slice((current_page - 1) * posts_per_page, current_page * posts_per_page);
            loaded_posts.forEach((post) => {
                post.PLATFORMS = post.PLATFORMS.replace(/\\'/g, '\\"');
                require('../other/security').convertUUIDToBase64(post.ID, (b64) => post.BASE64 = b64);
            });

            res.render('pages/dashboard.ejs', {
                email: req.cookies.username,
                tab: '1',
                posts: loaded_posts,
                term: '',
                pages: pages
            });
        });
    });
});

router.get('/:searchTerm', function (req, res) {
    res.redirect(`/dashboard/${req.params.searchTerm}/page/1`);
});

router.get('/:searchTerm/page', (req, res) => {
    res.redirect(`/dashboard/${req.params.searchTerm}/page/1`);
});

router.get('/:searchTerm/page/:num', function (req, res) {
    let current_page = parseInt(req.params.num);
    if (current_page < 1) {
        res.redirect('/dashboard/'+req.params.searchTerm+'/page/1');
        return;
    }
    con.query("SELECT * FROM projects WHERE NAME LIKE ? ORDER BY TIMESTAMP DESC", [`%${req.params.searchTerm}%`], function (err, projects, fields) {
        if (err) throw err;
        con.query("SELECT * FROM teams WHERE NAME LIKE ? ORDER BY TIMESTAMP DESC", [`%${req.params.searchTerm}%`], function (err, teams, fields) {
            if (err) throw err;
            let list = teams.concat(projects);

            let last_page = projects.length / posts_per_page;
            if (last_page !== parseInt(last_page)) {
                last_page = parseInt(last_page) + 1;
            }
            if(last_page === 0) {
                last_page = 1;
            }
            if (current_page > last_page) {
                res.redirect('/dashboard/'+req.params.searchTerm+'/page/' + last_page);
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

            let pages = {
                current_page: current_page,
                start_page: start_page,
                end_page: end_page,
                last_page: last_page
            };

            loaded_posts = list.slice((current_page - 1) * posts_per_page, current_page * posts_per_page);
            loaded_posts.forEach((post) => {
                post.PLATFORMS = post.PLATFORMS.replace(/\\'/g, '\\"');
                require('../other/security').convertUUIDToBase64(post.ID, (b64) => post.BASE64 = b64);
            });

            res.render('pages/dashboard.ejs', {
                email: req.cookies.username,
                tab: '1',
                posts: loaded_posts,
                term: '',
                pages: pages
            });
        });
    });
});


module.exports = {url: '/dashboard', router: router};