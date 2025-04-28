import express from 'express'
import { getAllUser, login, profile, signup } from '../controllers/user.js';
import { authenticated } from '../middleware/auth.js';

const router=express.Router();

// register new user
router.post("/signup",signup)

// login user

router.post("/login",login)

///get all the users
router.get("/all",getAllUser);
// profile of a user
router.get("/profile",authenticated,profile);



export default router;

