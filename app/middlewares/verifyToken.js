const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");

function verifyToken(req, res, next) {
    // splitで半角スペースで分割して後ろ側がTokenになる
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
  
    if (token) {
      jwt.verify(token, config.jwt.secret, function (error, decoded) {
        if (error) {
          return res.status(401).send({"status":"NG","message":"エラー"});
        } else {
          req.decoded = decoded;
          // 次の処理に進む
          next();
        }
      });
    } else {
      return res.status(401).send({"status":"NG","message":"エラー"});
    }
  }
  module.exports = verifyToken;
