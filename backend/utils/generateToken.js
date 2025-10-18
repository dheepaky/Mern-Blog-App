import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // JS la access panna mudiyadhu (XSS safe)//
    // secure: process.env.NODE_ENV === "production", // HTTPS only in prod//
    // sameSite: "strict", // CSRF protect
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });
};

export default generateToken;
