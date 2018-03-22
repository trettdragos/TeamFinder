let express = require('express');
let router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "TeamFinder"
});

router.get('/:accountToken', function(req, res){
	var sql = "UPDATE accounts SET CONFIRMED = '1' WHERE email = ?";
  con.query(sql, [req.params.accountToken], function (err, result) {
    if (err) throw err;
    res.render('pages/verified-confirmation');
  });
});

module.exports = router;