let express = require('express');
let router = express.Router();
let mysql = require('mysql');

router.get('/', function (req, res) {
    res.render('pages/register.ejs');
});
router.get('/confirmed', function (req, res) {
    res.render('pages/register-confirmed.ejs');
});

module.exports = router;