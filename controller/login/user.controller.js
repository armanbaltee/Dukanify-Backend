const User = require("../../model/SignUpModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("No user found");
      return res.status(400).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({
      message: "Login Successfll",
      token,
      user: {
        _id: user._id,
        email: user.email,
        password: user.password
      },
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send(error.message || "Something went wrong");
  }
};

module.exports = {
  login
};