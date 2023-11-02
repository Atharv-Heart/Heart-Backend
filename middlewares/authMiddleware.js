const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    const newToken = token.split(" ")[1];
    if (!newToken) {
      return res.status(403).json({error:"Token is required."});
    }
    jwt.verify(newToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({error: "Invalid token"});
      }
      req.user = user;
      next();
    });
}

module.exports = {
  verifyToken
};
