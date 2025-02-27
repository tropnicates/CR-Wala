import express from 'express';
import passport from "passport";
import { register, login, logout, getProfile, editProfile,  forgotPassword, resetPassword,getAllUsers, changeUserStatusActive,changeUserStatusInactive,sendEnquiry} from '../controllers/authController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
// import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (user) => {
    return jwt.sign(
      { _id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  };


router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', isAuthenticated, getProfile);
router.put('/edit-profile', isAuthenticated, editProfile);  
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/',getAllUsers);
router.put('/:id/active',changeUserStatusActive);
router.put('/:id/inactive',changeUserStatusInactive);
router.post('/enquiry', sendEnquiry);

// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     const token = generateToken(req.user);
//     res.json({ success: true, message: "Google login successful", token, user: req.user });
//   }
// );

// router.get("/apple", passport.authenticate("apple", { scope: ["profile", "email"] }));

// router.get(
//   "/apple/callback",
//   passport.authenticate("apple", { failureRedirect: "/login" }),
//   (req, res) => {
//     const token = generateToken(req.user);
//     res.json({ success: true, message: "Apple login successful", token, user: req.user });
//   }
// );


export default router;
