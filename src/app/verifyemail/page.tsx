/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function VerifyEmailPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null) // For error handling

    // Extract token from URL when the component mounts
    useEffect(() => {
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken)
        console.log(urlToken)
    }, [])

    const verifyEmail = async () => {
        try {
            setErrorMessage(null) // Clear any previous errors
            const res = await axios.post("/api/users/verifyemail", { token })  // Ensure the URL is correct
            console.log(res.data)
            if (res.data.success) {
                setVerified(true)
            } else {
                setErrorMessage(res.data.message) // Capture any failure message
            }
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "An error occurred during verification")  // Display the error message
        }
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center gap-4'>
            <div className='flex items-center justify-center gap-2'>
                <h1 className='text-2xl'>Verify your email</h1>
                <button
                    className='px-4 py-2 bg-orange-600 text-black text-xl rounded-md'
                    onClick={verifyEmail}
                    disabled={verified} // Disable button if already verified
                >
                    {verified ? "Verified" : "Click to verify"}
                </button>
            </div>

            {/* Display success message */}
            {verified && (
                <div className="text-green-500 mt-4 text-xl">
                    Email verified successfully! You can now <Link href="/login" className='underline'>login</Link>.
                </div>
            )}

            {/* Display error message */}
            {errorMessage && (
                <div className="text-red-500 mt-4 text-xl">
                    {errorMessage}
                </div>
            )}
        </div>
    )
}

export default VerifyEmailPage
