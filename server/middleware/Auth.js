import jwt from "jsonwebtoken";
import User from "../models/user.js";

const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "No token provided, please log in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(401)
        .json({ error: "User not found, please login again" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default Auth;
