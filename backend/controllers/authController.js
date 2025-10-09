const User = require("../model/userModel");
const generateOtp = require("../utils/generateOtp");
const createSendToken = require("../utils/createSendToken");
const sendEmail = require("../utils/email");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  let { username, email, password, passwordConfirm } = req.body;

  let exist = await User.findOne({ email });
  if (exist) {
    return res.send({ status: 0, msg: "User already exists" });
  }

  let otp = generateOtp();
  let otpExpires = Date.now() + 24 * 60 * 60 * 1000;

  let user = new User({
    username,
    email,
    password,
    passwordConfirm,
    otp,
    otpExpires,
    isVerified: false,
  });

  user
    .save()
    .then(async () => {
      try {
        await sendEmail({
          email: user.email,
          subject: "OTP for email verification",
          html: `<h1>Your OTP is: ${otp}</h1>`,
        });
        let userWithoutPassword = await User.findById(user._id).select("-password ");
        res.send({
          status: 1,
          msg: "User created successfully,OTP sent to your email",
          user: userWithoutPassword,
        });
      } catch (err) {
        await User.findByIdAndDelete(user._id);
        res.send({
          status: 0,
          msg: "User created but failed to send email",
          error: err.message,
        });
      }
    })
    .catch((err) => {
      res.send({ status: 0, msg: "Failed to save user", error: err.message });
    });
};

exports.verfifyAccount = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      return res.send({ status: 0, msg: "Otp is required" });
    }
    const user = await User.findOne({ otp });
    if (!user) {
      return res.send({ status: 0, msg: "Invalid otp" });
    }
    if (user.otpExpires < Date.now()) {
      return res.send({ status: 0, msg: "Otp expired" });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });
    createSendToken(user, 201, res);
  } catch (err) {
    res.send({
      status: 0,
      msg: "Failed to verify account",
      error: err.message,
    });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({
        status: 0,
        msg: "User not found",
      });
    }
    if (user.isVerified) {
      return res.send({
        status: 0,
        msg: "User already verified",
      });
    }
    const otp = generateOtp();
    const otpExpires = Date.now() + 24 * 60 * 60 * 1000;
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save({ validateBeforeSave: false });
    try {
      await sendEmail({
        email: user.email,
        subject: "OTP for email verification",
        html: `<h1>Your OTP is: ${otp}</h1>`,
      });
      res.send({
        status: 1,
        msg: "OTP is resent to your email",
      });
    } catch (err) {
      await User.findByIdAndDelete(user._id);
      res.send({
        status: 0,
        msg: "Failed to send email",
        error: err.message,
      });
    }
  } catch (err) {
    res.send({
      status: 0,
      msg: "Failed to resend otp",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send({ status: 0, msg: "Email and password are required" });
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.send({ status: 0, msg: "Invalid email or password" });
  }
  createSendToken(user, 201, res);
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    status: 1,
    msg: "Logged out successfully",
  });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send({
      status: 0,
      msg: "User not found",
    });
  }
  const otp = generateOtp();
  user.resetPasswordOtp = otp;
  user.resetPasswordOtpExpires = Date.now() + 20 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: "OTP for password reset",
      html: `<h1>Your OTP is: ${otp}</h1>`,
    });

    res.send({
      status: 1,
      msg: "Password reset OTP sent to your email",
    });
  } catch (err) {
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.send({
      status: 0,
      msg: "Failed to password reset send email",
      error: err.message,
    });
  }
};

exports.verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.send({
        status: 0,
        msg: "User not found",
      });
    }

    console.log("DB OTP:", user.resetPasswordOtp, "Received OTP:", otp);

    if (otp !== user.resetPasswordOtp) {
      return res.send({
        status: 0,
        msg: "Invalid OTP",
      });
    }

    if (user.resetPasswordOtpExpires < Date.now()) {
      return res.send({
        status: 0,
        msg: "OTP expired",
      });
    }

    res.send({
      status: 1,
      msg: "OTP verified",
    });
  } catch (err) {
    res.send({
      status: 0,
      msg: "Failed to verify OTP",
      error: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, password, passwordConfirm } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
      resetPasswordOtp: otp,
      resetPasswordOtpExpires: { $gt: Date.now() },
    });
    console.log(email, otp, password, passwordConfirm, user);

    if (!user) {
      return res.send({
        status: 0,
        msg: "Invalid OTP or OTP expired",
      });
    }

    if (password !== passwordConfirm) {
      return res.send({
        status: 0,
        msg: "Passwords do not match",
      });
    }

    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpires = undefined;

    await user.save();

    createSendToken(user, 201, res);
  } catch (err) {
    res.send({
      status: 0,
      msg: "Failed to reset password",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.find();

    res.send({
      status: 1,
      msg: "User found",
      user,
    });
  } catch (err) {
    res.send({
      status: 0,
      msg: "Failed to get user",
      error: err.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.send({
        status: 0,
        msg: "User not Found",
      });
    } else {
      res.send({
        status: 1,
        msg: "User found",
        user,
      });
    }
  } catch (err) {
    res.send({
      status: 0,
      msg: "FAile to get user ",
      error: err.message,
    });
  }
};
