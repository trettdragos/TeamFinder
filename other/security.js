let bcrypt = require('bcrypt');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

let encryptPassword = (pwd, cb) => bcrypt.hash(pwd, 10, (err, encrypted) => cb(encrypted));
let checkPassword = (pwd, hash, cb) => bcrypt.compare(pwd, hash, (err, res) => cb(res));
let generateCookieToken = (email, cb) => cb(crypto.createHmac('sha512', require('./utils').server_secret).update(email).digest('hex'));
let verifyCookieToken = (email, token, cb) => cb(token == crypto.createHmac('sha512', require('./utils').server_secret).update(email).digest('hex'));
let generateJWT = (email, cb, expiresIn='7d') => cb(jwt.sign({username: email}, require('./utils').server_secret, {algorithm: 'HS512', expiresIn: expiresIn}));
let verifyJWT = (email, token, cb) => {
    jwt.verify(token, require('./utils').server_secret, {algorithms: ['HS512']}, (err, payload) => {
       if(err || payload.username != email) cb(false);
       else cb(true);
    });
};

let routeTokenVerification = (req, res, next) => {
    if (!req.cookies.username || !req.cookies.token) {
        res.redirect('/logout?skip=true');
    } else if (req.cookies.username) {
        verifyJWT(req.cookies.username, req.cookies.token, (valid) => {
            if (!valid)
                res.redirect('/logout?skip=true');
            else {
                generateJWT(req.cookies.username, (token) => res.cookie('token', token, {maxAge: 1000*60*60*24*7}));
                next();
            }
        })
    }
};

module.exports = {encryptPassword, checkPassword, generateJWT, verifyJWT, routeTokenVerification};