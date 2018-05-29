let bcrypt = require('bcrypt');
let crypto = require('crypto');

let encryptPassword = (pwd, cb) => {
    const saltRounds = 10;
    bcrypt.hash(pwd, saltRounds, function(err, encrypted) {
        if (cb)
            cb(encrypted);
        else return encrypted;
    });

};

let checkPassword = (pwd, hash, cb) => {
    bcrypt.compare(pwd, hash, function(err, res) {
        if(cb) cb(res);
        else return res;
    });
};

let genDiffieHelmanKey = () => {
    let prime = crypto.DiffieHellman.getPrime();
    console.log(prime);
};

module.exports = {encryptPassword, checkPassword, genDiffieHelmanKey};