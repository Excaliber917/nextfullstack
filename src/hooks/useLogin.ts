/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";

interface LoginData {
    email: string;
    password: string;
}

export const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const login = async (data: LoginData) => {
        // Destructure the data object
        const { email, password } = data;

        const success = verifyInput({ email, password })
        if (!success) return { error: "Please provide both email and password" }

        try {
            setLoading(true)
            // Send a POST request with the data
            const res = await axios.post("api/users/login", data)
            router.push("/profile")
            toast.success(res.data.message)
            return res.data

        } catch (error: any) {
           toast.error(error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, login }
}

// Define the type for the input to verifyInput
const verifyInput = ({ email, password }: LoginData): boolean => {
    // Verify if all fields are provided
    if (!email || !password) {
        toast.error("all fields must be filled")
        return false
    }
    return true
}
