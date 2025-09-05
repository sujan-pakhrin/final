import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied! No token provided.",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token!",
        });
      }

      req.user = decoded; 
      next();
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during token verification",
    });
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "You are not authorized!",
      });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.role === "admin") {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Admin access required!",
      });
    }
  });
};
