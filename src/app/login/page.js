"use client"
import { login } from "@/actions/server"
import { useRef } from "react"
export default function Login()
{
    const formRef = useRef(null)
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <form
          ref={formRef}
          action={(e)=>{login(e); formRef.current.reset()}}
          className="bg-white p-8 shadow-lg rounded-lg max-w-sm w-full"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Login Form</h2>
          
         
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    )

    //hello
    //to
    //all
}