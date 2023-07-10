

const crypto = require("crypto");

class Encryption
{
    constructor() {

    }
    /**
     * パスワードを　MD5 に暗号化。
     * @param {string} password 
     * @returns {string}
     */
    encryptionPassword = (password) => {
        var md5 = crypto.createHash('md5');
        md5.update(password);
        var hash = md5.digest('hex');
        return hash;
    }

}

module.exports = new Encryption();