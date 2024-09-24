/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendMail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {


    try {

        const { user } = await req.json()
        if (!user)
            return NextResponse.json({
                message: "User not found"

            })

        const res =await sendMail({
            email: user.email,
            emailType: 'RESETPASSWORD',
            userId: user._id
        })
        console.log(res)
        return NextResponse.json({
            message: "mail has been sent successfully"
        })
    } catch (error: any) {
        console.log(error)
    }

}