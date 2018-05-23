let express = require('express');
let router = express.Router();
let mysql = require('mysql');

router.get('/', function (req, res) {
    res.render('pages/about.ejs');
});

module.exports = {url: '/', router: router};