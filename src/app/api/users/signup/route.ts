/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendMail } from "@/helpers/mailer";

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { name, username, email, password } = reqBody

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // Create new user
        const newUser = await new User({
            name,
            username,
            email,
            password: hashedPassword
        }).save()

      

        // Send verification email
        await sendMail({ email: email, emailType: 'VERIFY', userId: newUser._id })

        return NextResponse.json({ newUser, message: "User added" }, { status: 201 })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })  // Always return 500 for unexpected errors
    }
}
