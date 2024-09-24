/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

interface TokenData {
    id: string;
}

export const getTokenValues = (req: NextRequest): string | null => {
    try {
        const token = req.cookies.get("token")?.value || '';
        if (!token) {
            throw new Error("Token not found");
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenData;

        return decodedToken.id;
    } catch (error: any) {
        console.error("Error decoding token:", error.message);
        return null; // Explicitly returning null when token is invalid
    }
};
