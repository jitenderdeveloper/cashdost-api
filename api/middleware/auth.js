const jwt = require("jsonwebtoken");
const jwtSecret =
  "4715aed3c946f7b0f74f472fdd9j9j7h7h7jy804700770d572af3dce43625dd";

exports.adminAuth = (req, res, next) => {
  // const token = req.headers.authorization.split(" ")[1];
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          if (decodedToken.role !== "admin") {
            return res.status(401).json({ message: "Not authorized" });
          } else {
            next();
          }
        }
      });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

exports.userAuth = (req, res, next) => {
  // const token = req.headers.authorization.split(" ")[1];

  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          if (decodedToken.role !== "normal") {
            return res.status(401).json({ message: "Not authorized" });
          } else {
            next();
          }
        }
      });
    } 
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};
