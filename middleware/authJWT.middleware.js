const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
console.log(req.headers.authorization)
    let token = req.headers.authorization;
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }
    token = token.replace(/^Bearer\s+/, "");
    jwt.verify(token,
               config.secret,
               (err, decoded) => {
                if (err) {
                  return res.status(401).send({
                    message: "Unauthorized!",
                  });
                }
                req.userId = decoded.id;
                next();
               });
  };

  module.exports.authJWT= {verifyToken};