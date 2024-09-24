/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"

interface SignUpData {
    name: string;
    username: string;
    email: string;
    password: string;
}

export const useSignUp = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const signup = async (data: SignUpData) => {

        // Destructure the data object
        const { name, username, email, password } = data;

        const success = verifyInput({ name, username, email, password })

        if (!success) return
        try {
            setLoading(true)
            // Send a POST request with the data
           await axios.post("api/users/signup", data)
            
            router.push("/login")
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }

    }

    return { loading, signup }  // Moved the return statement out of signup function
}

// Define the type for the input to verifyInput
const verifyInput = ({ name, username, email, password }: SignUpData): boolean => {
    // Verify if all fields are provided
    if (!name || !username || !email || !password) {
        return false
    }
    return true
}
