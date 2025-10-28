import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import cloudinary from "cloudinary";

export const registerController = async (req, res) => {
  try {
    let { userName, email, password, profileImg } = req.body;

    userName = userName.toLowerCase().replace(/\s+/g, "").trim();
    email = email.toLowerCase().trim();

    if (!userName || !email || !password) {
      return res.status(404).json("Required All Fields");
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid Email" });
    }

    const existedUsername = await userModel.findOne({ userName });

    if (existedUsername) {
      return res.status(400).json({ error: "Username already Exist" });
    }
    const existedEmail = await userModel.findOne({ email });

    if (existedEmail) {
      return res.status(400).json({ error: "Email already Exist" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password Must be 6 Characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const users = new userModel({
      userName,
      email,
      password: hashedPassword,
      profileImg,
    });

    const newUser = await users.save();
    generateToken(res, newUser._id);

    res.status(201).json({
      message: "user created successfully",
      userName: newUser.userName,
      email: newUser.email,
      profileImg: newUser.profileImg || "",
    });
  } catch (error) {
    res.status(500).json(error.message, "error in registerController");
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(res, existingUser._id);

    return res.status(200).json({
      message: "Login success",
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};

export const getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    res.status(200).json({ loggedIn: true, user });
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfileImg = async (req, res) => {
  try {
    const { profileImg } = req.body;
    const userId = req.params.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let uploadedUrl = user.profileImg; // keep old image if none provided
    if (profileImg) {
      const uploadedResponse = await cloudinary.uploader.upload(profileImg, {
        folder: "cloudinary-project",
      });
      uploadedUrl = uploadedResponse.secure_url;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { profileImg: uploadedUrl },
      { new: true }
    );

    return res.status(200).json({
      message: "Profile image updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfileImg controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const viewimg = async (req, res) => {
//   try {
//     const uploads = await cloudinarymodel.find().sort({ createdAt: -1 });
//     res.status(201).json(uploads);
//     console.log(uploads);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
