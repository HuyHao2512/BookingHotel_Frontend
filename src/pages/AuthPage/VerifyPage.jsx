// src/pages/VerifyEmail.js
import React from "react";
import { Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const VerifyEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-50 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H7.5A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12H9.75M15.75 15.75L19.5 12m-3.75-3.75L19.5 12"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Sign in with email
        </h2>
        <p className="text-center text-sm text-gray-500 mt-2">
          Make a new doc to bring your words, data, and teams together. For free
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <div className="relative mt-1">
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
            <p className="text-right mt-2 text-sm text-blue-500 cursor-pointer">
              Forgot password?
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <p className="text-center text-gray-500 mb-4">Or sign in with</p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
            >
              <img src="/icons/google.svg" alt="Google" className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
            >
              <img
                src="/icons/facebook.svg"
                alt="Facebook"
                className="w-6 h-6"
              />
            </button>
            <button
              type="button"
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
            >
              <img src="/icons/apple.svg" alt="Apple" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
