/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function ResetPasswordPage() {
  const [token, setToken] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Extract the token from the URL
  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken);
    console.log("Token from URL:", urlToken);
  }, []);

  // Form submission handler
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if both passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Send the request to the reset password API
      const res = await axios.post('/api/users/resetpassword', { token, newPassword: password });

      if (res.data.success) {
        setSuccess(true);
      }
    } catch (error: any) {
      setError("Failed to reset the password. Please try again.");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-md bg-gray-900">
        <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>

        {success ? (
          <p className="text-green-500 text-center mb-4">Password has been changed successfully!</p>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
            {/* Password Input */}
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-white">New Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your new password"
                className="py-2 px-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="mb-1 text-white">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your new password"
                className="py-2 px-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-2 bg-orange-600 text-white rounded-lg text-xl transition duration-200 ${
                loading || success ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading || success}
            >
              {loading ? 'Processing...' : 'Reset Password'}
            </button>
          </form>
        )}

        {/* Redirect to login link */}
        {success && (
          <p className="text-center mt-4 text-white">
            Password reset successfully. 
          </p>
        )}
      </div>
    </div>
  );
}
