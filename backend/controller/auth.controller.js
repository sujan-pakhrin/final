import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/user.model.js'

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
    success: false,
    message: "User Already exists with the same email! Please try again",
  });
  
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
    role: "user",
  });
  
  await newUser.save();
  res.status(200).json({
    success: true,
    message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare( 
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role, 
        email: checkUser.email,
        username: checkUser.username,
      },
      process.env.JWT_SECRET, 
      { expiresIn: "60m" }
    );
    
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        username: checkUser.username,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

``
export const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

