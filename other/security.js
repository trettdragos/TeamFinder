let bcrypt = require('bcrypt');
let crypto = require('crypto');

let encryptPassword = (pwd, cb) => bcrypt.hash(pwd, 10, (err, encrypted) => cb(encrypted));
let checkPassword = (pwd, hash, cb) => bcrypt.compare(pwd, hash, (err, res) => cb(res));
let genCookieToken = (email, cb) => cb(crypto.createHmac('sha512', require('./utils').server_secret).update(email).digest('hex'));
let verifyCookieToken = (email, token, cb) => cb(token == crypto.createHmac('sha512', require('./utils').server_secret).update(email).digest('hex'));

module.exports = {encryptPassword, checkPassword, genCookieToken, verifyCookieToken};