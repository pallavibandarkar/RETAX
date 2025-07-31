import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const generateToken = async (id, res) => {
  try {
    const cookieOptions = {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    };
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET);
    res.cookie("jwt", token, cookieOptions);
    return token;
  } catch (error) {
    console.log("Error generating token", error);
    return null;
  }
};
