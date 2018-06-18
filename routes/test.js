let express = require('express');
let router = express.Router();
tests = ['/email', '/cookie-token', '/verify-cookie-token'];
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
    let email_template = require('../other/utils').emailTemplate;
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
    require('../other/security').generateCookieToken('teo.vecerdi@gmail.com', (token) => res.send(`Input: teo.vecerdi@gmail.com<br>Expected output:<br>&nbsp;&nbsp;&nbsp;74278ec6598d65961460ce1c0b58d30fd34db9ea5f5869d6f1b896a904b063d8d61a9424dff2be7330321b800ffff3ae6f11b035b193ad025841186a5bc0a3cf<br>Actual output:<br>&nbsp;&nbsp;&nbsp;${token}`));
});

router.get('/verify-cookie-token', (req, res) => {
    require('../other/security').verifyCookieToken('teo.vecerdi@gmail.com', '74278ec6598d65961460ce1c0b58d30fd34db9ea5f5869d6f1b896a904b063d8d61a9424dff2be7330321b800ffff3ae6f11b035b193ad025841186a5bc0a3cf', (valid) => {
        res.send(`Inputs:<br>&nbsp;&nbsp;&nbsp;teo.vecerdi@gmail.com<br>&nbsp;&nbsp;&nbsp;74278ec6598d65961460ce1c0b58d30fd34db9ea5f5869d6f1b896a904b063d8d61a9424dff2be7330321b800ffff3ae6f11b035b193ad025841186a5bc0a3cf<br>Expected output:<br>&nbsp;&nbsp;&nbsp;true<br>Actual output:<br>&nbsp;&nbsp;&nbsp;${valid}`)
    });
});

module.exports = {url: '/test', router: router};