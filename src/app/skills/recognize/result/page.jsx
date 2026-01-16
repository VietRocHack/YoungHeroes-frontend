'use client'

import { HomeIcon, AlertCircle, CheckCircle, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecognizeResult() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-[400px] h-[812px] bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
        <div className="flex-1 p-6 flex flex-col items-center overflow-y-auto">
          <div className="flex justify-center space-x-4 mb-4">
            {[...Array(3)].map((_, i) => (
              <svg
                key={i}
                className={`w-12 h-12 text-yellow-200 ${
                  i === 1 ? "-mt-2" : "mt-2"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            ))}
          </div>
          <img src="/assets/dog.png" alt="dog" className="w-64 h-64 mb-4" />
          <h1 className="font-bold text-black text-xl mb-6">Excellent!</h1>
          <div className="w-full space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div className="w-full flex flex-row justify-between">
                <span className="font-medium text-blue-800 my-auto">
                  Emergency reported!
                </span>
                <img src="/assets/reported.png" alt="reported" className="w-12 h-12 flex-shrink-0" />
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div className="w-full flex flex-row justify-between">
                <span className="font-medium text-green-800 my-auto">
                  Situation delivered!
                </span>
                <img src="/assets/delivered.png" alt="delivered" className="w-16 h-14 flex-shrink-0" />
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-3">
              <Heart className="w-6 h-6 text-purple-500 flex-shrink-0" />
              <div className="w-full flex flex-row justify-between">
                <span className="font-medium text-purple-800 my-auto">
                  You kept calm!
                </span>
                <img src="/assets/calm.png" alt="calm" className="w-16 h-16 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0 flex justify-center items-center flex-shrink-0">
          <button 
            onClick={() => router.push('/')}
            className="w-[150px] py-3 px-4 text-lg font-bold bg-white text-black rounded-full shadow-md hover:bg-gray-50 transition duration-300 ease-in-out"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

