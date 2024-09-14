// import React from 'react';
import { Headphones } from "lucide-react"

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 w-full p-4 py-4">
      <div className="w-full max-w-md bg-pink-200 rounded-lg shadow-lg overflow-hidden min-h-screen md:min-h-0">
        <div className="p-6 flex flex-col items-center h-full justify-between">
          <div className="w-full flex justify-start mb-4">
            <span className="text-sm font-semibold">9:41</span>
          </div>
          
          <div className="flex-grow flex items-center justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-pink-300 rounded-full opacity-75"></div>
              <div className="absolute inset-4 bg-pink-400 rounded-full opacity-75"></div>
              <div className="absolute inset-8 bg-pink-500 rounded-full opacity-75"></div>
              <div className="absolute inset-12 bg-white rounded-full flex items-center justify-center">
                <Headphones className="text-blue-600" size={40} />
              </div>
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-yellow-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 border-2 border-gray-400 rounded-md transform rotate-12 flex items-center justify-center">
                <div className="w-12 h-8 bg-gray-400 rounded-t-full"></div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 mb-4">
            <h2 className="text-2xl font-semibold mb-4">Emergency Calling...</h2>
            <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out">
              End Call
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}