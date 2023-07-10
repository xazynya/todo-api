
/**
 * @classdesc バリデーションクラス
 */
const escape_html = s => s.replace(/[&'"<>]/g, m=>({
    "&": "&amp;",
    "'": "&apos;",
    '"': '&quot;',
    '<': '&lt;',
    '>': '&gt;',
})[m] );

class Validate
{
    /**
     * 
     */
    constructor() {

    }
    /**
     * 入力値をが正の整数であることをチェック
     * @class Validate
     * @method isNum
     * @param {number} uset_id - 整数であること
     * @returns {boolean} - true false のいずれか
     * @since 0.0.1
     * @example
     * // return true
     * isNum(number)
     * // return false
     * isNum('xxxx')
     * isNum(0.001)
     * isNum(-1)
     * isNum(null)
     */
    isNum (uset_id) {
        //const isNumber = n => typeof n === "number";
        var uid = parseInt(uset_id);
        if (Number.isInteger(uid)) {
            var result = (Math.sign(uid) >= 1) ? true : false;
            return result;
        } else {
            return false;
        }
       
    }

    isEmail (email) {
        const regex = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
    tag_escape

    escapeTag(str) {
        return escape_html

    }

}

module.exports = new Validate();