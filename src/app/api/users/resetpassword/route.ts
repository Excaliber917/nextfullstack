/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
connect()

export async function POST(req: NextRequest) {
    try {
        const { token, newPassword } = await req.json()
        if (!token)
            throw new Error("can not get the token")


        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }

        })

        if (!user)
            return NextResponse.json({
                message: "User not found"
            })

        const hashedPassowrd = await bcryptjs.hash(newPassword, 10)

        user.password = hashedPassowrd
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message: "Password changed",
            success: true
        })


    } catch (error: any) {
        console.log(error)

    }

}