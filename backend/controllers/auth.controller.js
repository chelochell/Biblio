import {User} from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req,res) => {
    const {username,email,password} =req.body;

    try {
        if(!username || !email || !password) {
            throw new Error ("All fields are required");
        }

        const userAlreadyExists = await User.findOne({ email });
		console.log("userAlreadyExists", userAlreadyExists);

		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}


        const hashedPassword = await bcryptjs.hash(password,10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            username,
            email,
            password:hashedPassword,
            verificationToken,
            verificationTokenExpiry: Date.now() + 20 * 60 * 60 * 1000
        })

        await user.save();
        //jwt
        generateTokenAndSetCookie(res, user._id);

        //send verification email
        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success:true,
            message:"User created successfully",
            user: {
                ...user.doc,
                password:undefined,
            }
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

export const login = async (req,res) => {
    res.send("login route");
}

export const logout = async (req,res) => {
    res.send("logout route")
}