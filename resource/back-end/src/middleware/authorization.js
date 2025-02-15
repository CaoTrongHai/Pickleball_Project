const jwt = require("jsonwebtoken");
// middleware authorization
const vertifyToken = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "No Token, authorization denied" });
  }
  token = token.split(" ")[1];
  const jwtsecret = process.env.JWt_SECRET;
  jwt.verify(token, jwtsecret, (error, decoded) => {
    if (error) {
      return res.status(401).send({ message: error });
    }
    req.UserID = decoded.id;
    next();
  });
};

module.exports = { vertifyToken };
