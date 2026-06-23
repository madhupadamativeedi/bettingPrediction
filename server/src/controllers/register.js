const user = require("../moduls/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @name registerUser
 * @description Register a new user with the provided name, email, and password. The password is hashed before storing in the database.
 * @param {Object} req - The request object containing the user details in the body.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the registration status and user details.
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "required all fileds plz enter name, email, password",
      });
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        msg: "User allready exist plz register with new Mail id",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json({
      msg: "user Register Sucessfully",
      newUser: {
        name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: "Sonthing went Wrong",
      err: error.message,
    });
  }
};

/**
 * @name loginUser
 * @description Authenticate a user with the provided email and password. If the credentials are valid, a success message is returned.
 * @param {Object} req - The request object containing the user credentials in the body.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the authentication status.

 */

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        msg: "Enter Email and Password",
      });
    }
    const existingUser = await user.findOne({
      $or: [{ email }, { password }],
    });
    if (!existingUser) {
      return res.status(401).json({
        msg: "invalid credintial",
      });
    }
    const comparePassword = await bcrypt.compare(password, existingUser.password);
    if (!comparePassword) {
      return res.status(400).json({
        msg: "Invalid password",
      });
    }
    const token = await jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      "madhu1234",
      { expiresIn: "1d" },
    );

    res.cookie("token", token)

    res.status(200).json({
        msg:'user Log in Sucessfully',
        UserLoginDetails:{
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email
        },
        token
    })
  } catch (error) {
    res.status(500).json({
      msg: "Sonthing went Wrong",
      err: error.message,
    });
  }
};


// const User = require("../moduls/user");

const dummydata = async (req, res) => {
  try {
    const getData = await user.find();

    res.status(200).json({
      msg: "Data fetched successfully",
      getData,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { dummydata };

module.exports ={ registerUser, loginUser, dummydata};
