let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

tests = ['/email', '/cookie-token', '/verify-cookie-token', '/jwt', '/verify-jwt-true', '/verify-jwt-false', '/uuid', '/uuid-base64', '/create-test-projects', '/create-test-teams'];
router.get('/', (req, res) => {
    let construct = '';
    tests.forEach((test) => {
        construct += `<a href="/test${test}" target="_blank">${test}</a><br>`
    });
    res.send(`Available tests: <br>${construct}`);
});

router.get('/email', (req, res) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    let email_template = require('../other/utils').activateAccountEmailTemplate;
    let useremail = req.cookies.username;
    email_template = email_template.replace(new RegExp('{{LINK}}', 'g'), 'http://localhost:3000/verification/' + useremail);
    let msg = {
        to: useremail,
        from: 'register@hacksquad.com',
        subject: 'Please verify your email',
        text: 'and easy to do anywhere, even with Node.js',
        html: email_template,
    };
    sgMail.send(msg);
    res.send('Successfully sent test email verification to ' + useremail)
});

router.get('/cookie-token', (req, res) => {
    require('../other/security').generateCookieToken('teo.vecerdi@gmail.com', (token) => res.send(`Input:<br>&nbsp;&nbsp;&nbsp;teo.vecerdi@gmail.com<br>Expected output:<br>&nbsp;&nbsp;&nbsp;74278ec6598d65961460ce1c0b58d30fd34db9ea5f5869d6f1b896a904b063d8d61a9424dff2be7330321b800ffff3ae6f11b035b193ad025841186a5bc0a3cf<br>Actual output:<br>&nbsp;&nbsp;&nbsp;${token}`));
});

router.get('/verify-cookie-token', (req, res) => {
    require('../other/security').verifyCookieToken('teo.vecerdi@gmail.com', '74278ec6598d65961460ce1c0b58d30fd34db9ea5f5869d6f1b896a904b063d8d61a9424dff2be7330321b800ffff3ae6f11b035b193ad025841186a5bc0a3cf', (valid) => {
        res.send(`Input:<br>&nbsp;&nbsp;&nbsp;teo.vecerdi@gmail.com<br>&nbsp;&nbsp;&nbsp;74278ec6598d65961460ce1c0b58d30fd34db9ea5f5869d6f1b896a904b063d8d61a9424dff2be7330321b800ffff3ae6f11b035b193ad025841186a5bc0a3cf<br>Expected output:<br>&nbsp;&nbsp;&nbsp;true<br>Actual output:<br>&nbsp;&nbsp;&nbsp;${valid}`)
    });
});

router.get('/jwt', (req, res) => {
    require('../other/security').generateJWT('teo.vecerdi@gmail.com', (token) => {
        res.cookie('token', token);
        res.send(`Input:<br>&nbsp;&nbsp;&nbsp;teo.vecerdi@gmail.com<br>Output:<br>&nbsp;&nbsp;&nbsp;${token}`);
    })
});

router.get('/verify-jwt-true', (req, res) => {
    require('../other/security').verifyJWT('teo.vecerdi@gmail.com', 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlby52ZWNlcmRpQGdtYWlsLmNvbSIsImlhdCI6MTUyOTQwNzY4NX0.GsSO9Jl3rUsqt8x06rIpPhra_wS7WuhNAooNEOjxpajsAAa3GueTK2LOmDMcvKwqXZlx5j1Tq1Ss5r9-r9KvGQ', (valid) => {
        res.send(`Input:<br>&nbsp;&nbsp;&nbsp;teo.vecerdi@gmail.com<br>&nbsp;&nbsp;&nbsp;eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlby52ZWNlcmRpQGdtYWlsLmNvbSIsImlhdCI6MTUyOTQwNzY4NX0.GsSO9Jl3rUsqt8x06rIpPhra_wS7WuhNAooNEOjxpajsAAa3GueTK2LOmDMcvKwqXZlx5j1Tq1Ss5r9-r9KvGQ<br>Expected output:<br>&nbsp;&nbsp;&nbsp;true<br>Actual output:<br>&nbsp;&nbsp;&nbsp;${valid}`)
    })
});

router.get('/verify-jwt-false', (req, res) => {
    require('../other/security').verifyJWT('teo.vecerdi@gmail.com', 'EyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlby52ZWNlcmRpQGdtYWlsLmNvbSIsImlhdCI6MTUyOTQwNzY4NX0.GsSO9Jl3rUsqt8x06rIpPhra_wS7WuhNAooNEOjxpajsAAa3GueTK2LOmDMcvKwqXZlx5j1Tq1Ss5r9-r9KvGQ', (valid) => {
        res.send(`Input:<br>&nbsp;&nbsp;&nbsp;teo.vecerdi@gmail.com<br>&nbsp;&nbsp;&nbsp;EyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlby52ZWNlcmRpQGdtYWlsLmNvbSIsImlhdCI6MTUyOTQwNzY4NX0.GsSO9Jl3rUsqt8x06rIpPhra_wS7WuhNAooNEOjxpajsAAa3GueTK2LOmDMcvKwqXZlx5j1Tq1Ss5r9-r9KvGQ<br>Expected output:<br>&nbsp;&nbsp;&nbsp;false<br>Actual output:<br>&nbsp;&nbsp;&nbsp;${valid}`)
    })
});

router.get('/uuid', (req, res) => {
    require('../other/security').getUUID((uuid) => res.send(`${uuid}`));
    require('../other/security').getUUID((uuid) => {
        require('../other/security').convertUUIDToBase64(uuid, (base64) => {
            require('../other/security').convertBase64ToUUID(base64, (uuid2) => {
                debug.log(`Original UUID: ${uuid}`);
                debug.log(`Encoded Base64: ${base64}`);
                debug.log(`Decoded UUID: ${uuid2}`);
            })
        })
    })
});

router.get('/chat/a', (req, res) => {
    res.render('pages/chat.ejs', {
        from: {uuid: '8CCB2690-68A2-491C-A726-A83312E49B55', name: 'Teodor Vecerdi'},
        to: {uuid: '96FA97C7-FADD-4EB1-997F-68FB02C64AA2', name: 'Trett Dragos'},
        profile: 'https://thumbs.dreamstime.com/b/profile-icon-senior-female-head-chat-bubble-isolated-elderly-woman-avatar-cartoon-character-portrait-profile-icon-senior-female-108359162.jpg'
    });
});
router.get('/chat/b', (req, res) => {
    res.render('pages/chat.ejs', {
        from: {uuid: '96FA97C7-FADD-4EB1-997F-68FB02C64AA2', name: 'Trett Dragos'},
        to: {uuid: '8CCB2690-68A2-491C-A726-A83312E49B55', name: 'Teodor Vecerdi'},
        profile: 'https://thumbs.dreamstime.com/b/profile-icon-senior-female-head-chat-bubble-isolated-elderly-woman-avatar-cartoon-character-portrait-flat-vector-illustration-108360340.jpg'
    });
});

router.get('/uuid-base64', (req, res) => {
    require('../other/security').getUUID((uuid) => require('../other/security').convertUUIDToBase64(uuid, (base64) => res.send(`${uuid}<br>${base64}`)));
});

router.get('/create-test-projects', (req, res) => {
    res.send(`Go to /test/create-test-projects/:num to create <b>num</b> projects<br>Example:<br><a href="/test/create-test-projects/50">Create 50 projects</a>`)
});

router.get('/create-test-projects/:num', (req, res) => {
    for (i = 0; i < req.params.num; i++) {
        require('../other/security').getUUID((uuid) => {
            let date = Date.now().toString();
            con.query("INSERT INTO projects (ID, TIMESTAMP, NAME, SUMMARY, COMMITMENT, PLATFORMS, PLATFORM_DETAILS, RESOURCE_LINK, STAGE, BUDGET, FUNDING, NATIONAL, FOUNDER, ACTIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [uuid, date, 'Test project @ ' + date, 'Test summary', 'Contractual', '["Platform 1", "Platform 2"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', 1], function (err, result) {
                if (err)
                    throw err;
            })
        });
    }
    res.send(`Created ${req.params.num} projects successfully`);
});
router.get('/create-test-teams', (req, res) => {
    res.send(`Go to /test/create-test-teams/:num to create <b>num</b> teams<br>Example:<br><a href="/test/create-test-teams/50">Create 50 projects</a>`)
});

router.get('/create-test-teams/:num', (req, res) => {
    for (i = 0; i < req.params.num; i++) {
        require('../other/security').getUUID((uuid) => {
            let date = Date.now().toString();
            con.query("INSERT INTO teams (ID, TIMESTAMP, NAME, SUMMARY, HACKATON, SECTION, START_DATE, END_DATE, PLATFORMS, RESOURCE_LINK, NR_MEMBERS, POSTS, LEADER, ACTIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [uuid, date, `Test team @ ${date}`, 'Team summary', 'Team hackaton', 'Team section', date, date, '["Platform 1", "Platform 2"]', 'Resource link', 0, '', 'teo.vecerdi@gmail.com', 1], function (err, result) {
            })
        });
    }
    res.send(`Created ${req.params.num} teams successfully`);
});

module.exports = {url: '/test', router: router};