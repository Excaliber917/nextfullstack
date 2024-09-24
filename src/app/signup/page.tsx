/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useSignUp } from "@/hooks/useSignUp"
import Link from "next/link"

import { useState } from "react"

function SignupPage() {

  const { loading, signup } = useSignUp()
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: ""

  })

  const onSignUp = async (e: any) => {
    e.preventDefault()
    console.log(user)

    signup(user)


  }
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border rounded w-full max-w-md p-8 ">
        <h1 className="font-bold text-2xl text-center">Sign up</h1>
        {loading && <p>processing</p>}
        <form className="flex flex-col gap-3 " onSubmit={onSignUp}>
          <div className="flex flex-col gap-1  ">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="enter your name" className="py-2 px-4  rounded text-gray-700" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="enter your username" className="py-2 px-4  rounded text-gray-700" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" placeholder="enter your email" className="py-2 px-4  rounded text-gray-700"
              value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="enter your password" className="py-2 px-4  rounded text-gray-700" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
          </div>
          <button type="submit" className="w-full px-6 py-2 bg-gray-700 rounded-md text-xl cursor-pointer mt-4 hover:bg-gray-800 duration-200">Sign up</button>
        </form>
        <p className="text-center mt-2">

        <Link href="/login" className="text-slate-300 hover:underline cursor-pointer ">wanna Login...</Link>
        </p>
      </div>

    </div>
  )
}

export default SignupPage
