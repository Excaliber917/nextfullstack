/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "No user found with this email" }, { status: 400 });
        }

        // Check if user is verified
        if (!user.isVerified) {
            return NextResponse.json({ message: "User is not verified" }, { status: 400 });
        }

        // Verify password
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return NextResponse.json({ message: "Wrong Password" }, { status: 400 });
        }

        // Create JWT
        const tokenData = { id: user._id };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "15h" });

        // Set token in cookies with security settings
        const res = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        // Adjust `maxAge` to match JWT expiry (15 hours)
        res.cookies.set("token", token, {
            httpOnly: true, // Makes cookie accessible only via HTTP(S), not JS
            secure: process.env.NODE_ENV === 'production', // Ensure it's secure in production (HTTPS only)
            sameSite: 'lax',  // Allows the cookie to be sent with top-level navigation while preventing CSRF
            path: '/',  // Makes the cookie available across the entire site
            maxAge: 15 * 60 * 60,  // 15 hours (in seconds), matching JWT expiration
        });

        return res;

    } catch (error: any) {
        console.error("Error during login:", error.message);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
