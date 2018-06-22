module.exports.server_secret = '6250655368566D597133743677397A244326462948404D635166546A576E5A7234753778214125442A472D4B614E645267556B58703273357638792F423F4528';
module.exports.imgurCliendID = 'ded9a48e51f9ef7';
module.exports.emailTemplate = require('fs').readFileSync("./other/emailTemplate.txt", "utf-8");
module.exports.debug_log = (v, n = '', p = 16) => {
    if(n === '') {
        console.log(`\x1b[31m[DEBUG] \x1b[36m${JSON.stringify(v)}\x1b[0m`);
        return;
    }
    console.log(`\x1b[31m[DEBUG]  \x1b[32m${n}${' '.repeat(p - n.length + 1)}\x1b[36m${JSON.stringify(v)}\x1b[0m`);
};
module.exports.debug_err = (v, n = '', p = 16) => {
    if(n === '') {
        console.error(`\x1b[31m[ERROR] \x1b[31m${JSON.stringify(v)}\x1b[0m`);
        return;
    }
    console.error(`\x1b[31m[ERROR]  \x1b[32m${n}${' '.repeat(p - n.length + 1)}\x1b[31m${JSON.stringify(v)}\x1b[0m`);
};

