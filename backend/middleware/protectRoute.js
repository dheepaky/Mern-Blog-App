import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Cookie la irundhu JWT edukkrom

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // Token verify panrom
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User ah DB la irundhu find pannrom (secure ah)
    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; //  Next middleware/route ku user attach pannrom
    next(); // Continue to the next route
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default protectRoute;
