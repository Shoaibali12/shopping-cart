const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  console.log("🛠️ Received Authorization Header:", authHeader); // Debugging

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );

    console.log("✅ Token Verified! User ID:", decoded.userId); // Debugging

    req.user = decoded; // Attach decoded token data to request

    next();
  } catch (error) {
    console.error("🚨 Token Verification Failed:", error.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
