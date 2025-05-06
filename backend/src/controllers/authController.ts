import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { createUser, findUserByEmail, getAllUser } from "../models/userModel";
// import { Role } from "@prisma/client";
import jwt from 'jsonwebtoken'



export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Inside try from registeruser")
        const { name, email, password, role, ...extraData } = req.body;

        if (!name || !email || !password || !role) {
            res.status(400).json({ message: "All fields are required" });
        }

        //check if user exists

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            res.status(400).json({ error: "User already exist!" })
        }

        // Hash password

        const hashedPassword = await bcrypt.hash(password, 10)

        //save user 

        const newUser = await createUser(
            { name, email, password: hashedPassword, role },
            extraData
        );

        res.status(201).json({
            success: true,
            message: "User registered succesfully",
            user: newUser
        })
    } catch (err) {
        res.status(500).json({ error: "Internal server error!" })
    }
}


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const existingUser = await findUserByEmail(email);

        if (!existingUser) {
            res.status(400).json({ error: "Invalid credentails!" })
            return;
        }

        // compare password
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            res.status(400).json({ error: "Invalid credentails!" })
            return;
        }

        // Generate JWT Token

        const token = jwt.sign(
            {  userId: String(existingUser.id), role: existingUser.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        )

        res.status(200).json({
            success: true,
            message: "Logged in successfully!!",
            token,
            existingUser
        })

    } catch (err) {
        res.status(500).json({ error: "Internal server error!" })
    }
}


// getting all user 

export const allUser = async (req: Request, res: Response) => {
    try {
        const users = await getAllUser();

        if (!users || users.length === 0) {
            res.status(404).json({ error: "No users exist" })
        }

        res.status(200).json(users)

    } catch (err) {
        console.error("❌ Error while fetching users:", err);
        res.status(500).json({ message: "Internal server error!!" })
    }
}