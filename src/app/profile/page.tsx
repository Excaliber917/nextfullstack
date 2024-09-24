/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

// Interface for user data
interface UserData {
  _id: string,
  name: string,
  username: string,
  email: string,
  createdAt: string
}

function ProfilePage() {
  const [user, setUser] = useState<UserData>({
    _id: "",
    name: "",
    username: "",
    email: "",
    createdAt: ""
  })
  const [isReset, setIsReset] = useState(false)
  const router = useRouter()

  // Logout function
  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout")
      toast.success(res.data.message)
      router.push("/login")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  // Fetch user profile
  const profile = async () => {
    try {
      const res = await axios.get("/api/users/me")
      const userData = res.data.user

      // Format the createdAt date
      const dt = new Date(userData.createdAt)
      const formattedDate = dt.toLocaleDateString('en-GB') // Format: DD/MM/YYYY

      // Update the user state with the formatted createdAt date
      setUser({
        _id: userData._id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        createdAt: formattedDate
      })

      console.log(user)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  // Fetch user profile when the component mounts
  useEffect(() => {
    profile()
  }, [])


  const resetPassword = async () => {
    try {

      const res = await axios.post("api/users/resetpasswordmail", { user })
      console.log(res.data)
      setIsReset(true)
    } catch (error: any) {
      console.log(error)

    }

  }

  return (
    <div className="h-screen flex justify-center items-center gap-2 flex-col">
      <div className="border rounded w-full p-8 max-w-md">
        <h1 className="text-center text-lg font-bold">Profile</h1>
        <div className="flex flex-col gap-2 items-center">
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Member since: {user.createdAt}</p>
        </div>
      </div>
      <button
        className="text-black bg-orange-500 px-4 py-2 rounded-md font-semibold"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="text-black bg-orange-500 px-4 py-2 rounded-md font-semibold"
        onClick={resetPassword}
      >
        change password
      </button>
      {isReset && <p>check your email to reset your password</p>}
    </div>
  )
}

export default ProfilePage
