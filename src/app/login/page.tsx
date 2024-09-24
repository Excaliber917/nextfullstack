/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useLogin } from '@/hooks/useLogin'
import Link from 'next/link'
import React, { useState } from 'react'

function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const { loading, login } = useLogin()
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // New state for the error message

  const onLogin = async (e: any) => {
    e.preventDefault()
    setErrorMessage(null) // Clear any previous errors

    const res = await login(user)

    // If there's an error, set the error message to display
    if (res?.error) {
      setErrorMessage(res.error)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      {/* Display error message if exists */}
      {errorMessage && (
        <div className="text-red-500 mb-4 font-semibold">
          {errorMessage}
        </div>
      )}

      <div className="shadow-lg rounded-lg p-8 w-full max-w-md bg-gray-900">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        {loading && <p className="text-center text-white mb-4">Processing...</p>}

        <form className="flex flex-col gap-4" onSubmit={onLogin}>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="py-2 px-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="py-2 px-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white rounded-lg text-xl transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          Dont have an account? <Link href="/signup" className="hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
