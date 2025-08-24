let express = require("express");
const {
  signup,
  verfifyAccount,
  resendOtp,
  login,
  logout,
  forgetPassword,
  verifyResetOtp,
  resetPassword,
  getUser,
getUserById
  
} = require("../controllers/authController");

let userRouter = new express.Router();

userRouter.post("/signup", signup);
userRouter.post("/verify", verfifyAccount);
userRouter.post("/resend-otp", resendOtp);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/forget-password", forgetPassword);
userRouter.post("/verify-reset-otp", verifyResetOtp);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/get-user", getUser);
userRouter.get("/current-user/:id",getUserById)


module.exports = userRouter;
