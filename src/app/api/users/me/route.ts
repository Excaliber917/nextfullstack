/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import { getTokenValues } from "@/helpers/getTokenValues";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function GET(req: NextRequest) {

    try {
        const userId =  getTokenValues(req)
        if (!userId)
            throw new Error("can not get the userId")
        const user = await User.findOne({ _id: userId }).select("-password")
        if (!user)
            throw new Error("can not find the user")

        return NextResponse.json({
            user
        })
    } catch (error: any) {
        console.log(error.message)
    }

}