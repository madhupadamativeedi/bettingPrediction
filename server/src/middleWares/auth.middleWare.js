const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, "madhu1234");

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid or Expired Token",
    });
  }
};

module.exports = authMiddleWare;