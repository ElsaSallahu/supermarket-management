const jwt = require("jsonwebtoken");

const verifyToken = (
  req,
  res,
  next
) => {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({
        message:
          "No token",
      });
  }

  const token =
    authHeader.split(
      " "
    )[1];

  try {
    const verified =
      jwt.verify(
        token,
        "supermarket_secret"
      );

    req.user =
      verified;

    next();
  } catch (err) {
    return res
      .status(403)
      .json({
        message:
          "Invalid token",
      });
  }
};

module.exports =
  verifyToken;