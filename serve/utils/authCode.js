/**
 * 加密解密
 */

const JWT = require("jsonwebtoken");
const key = 'mgyCAcDt+jOI3wGL6vq4Py2SDMDsyuwjksSaondw8';

const authcode = function (str, operation){
    operation ? operation : 'DECODE';
    if (operation == 'DECODE') {
       return JWT.verify(str, key);
    }else {
      return JWT.sign({ str }, key, {
        expiresIn: "1d"
      });
    }
}

module.exports = authcode;