/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const res = NextResponse.json({
            message: "logout successfull",
            status: 200
        })

        res.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return res

    } catch (error: any) {
        console.log(error.message)

    }

}