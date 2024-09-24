/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(req: NextRequest) {

    try {


        const { token } = await req.json()
        if (!token)
            throw new Error("can not get the token")
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }

        })

        if (!user)
            return NextResponse.json({
                message: "User not found or user is already verified"
            })

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: "email verified",
            success: true
        })

    } catch (error: any) {
        console.log(error)
    }

}