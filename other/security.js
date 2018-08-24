let bcrypt = require('bcrypt');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

let encryptPassword = (pwd, cb) => bcrypt.hash(pwd, 10, (err, encrypted) => cb(encrypted));
let checkPassword = (pwd, hash, cb) => bcrypt.compare(pwd, hash, (err, res) => cb(res));
let generateEmailToken = (email, cb) => cb(crypto.createHmac('sha512', require('./utils').server_secret).update(email).digest('hex'));
let verifyEmailToken = (email, token, cb) => cb(token == crypto.createHmac('sha512', require('./utils').server_secret).update(email).digest('hex'));
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

let getUUID = (cb) => {require('request').get({url: 'https://www.uuidgenerator.net/api/version4'}, (error, response, body) => cb(body.toUpperCase()))};
let convertUUIDToBase64 = (UUID, cb) => {cb(require('uuid-base64').encode(UUID).replace(/\./g, '-'))};
let convertBase64ToUUID = (Base64, cb) => {cb(require('uuid-base64').decode(Base64.replace(/-/g, '.')).toUpperCase())};

module.exports = {encryptPassword, checkPassword, generateJWT, verifyJWT, routeTokenVerification, getUUID, convertBase64ToUUID, convertUUIDToBase64, generateEmailToken, verifyEmailToken};