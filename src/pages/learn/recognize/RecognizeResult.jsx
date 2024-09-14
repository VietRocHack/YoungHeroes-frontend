import { HomeIcon, AlertCircle, CheckCircle, Heart } from "lucide-react";
import dog from "../../../assets/dog.png";
import reported from "../../../assets/reported.png";
import delivered from "../../../assets/delivered.png";
import calm from "../../../assets/calm.png";

export default function RecognizeResult() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 flex flex-col items-center">
          <div className="flex justify-center space-x-4">
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
          <img src={dog} alt="dog" className="w-64 h-64" />
          <h1 className="font-bold text-black">Excellent!</h1>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <div className="w-full flex flex-row justify-between">
              <span className="font-medium text-blue-800 my-auto">
                Emergency reported!
              </span>
              <img src={reported} alt="reported" className="w-12 h-12" />
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div className="w-full flex flex-row justify-between">
              <span className="font-medium text-green-800 my-auto">
                Situation delivered!
              </span>
              <img src={delivered} alt="delivered" className="w-16 h-14" />
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-3">
            <Heart className="w-6 h-6 text-purple-500" />
            <div className="w-full flex flex-row justify-between">
              <span className="font-medium text-purple-800 my-auto">
                You kept calm!
              </span>
              <img src={calm} alt="calm" className="w-16 h-16" />
            </div>
          </div>
        </div>
        <div className="p-6 pt-0 flex justify-center items-center">
          
          <button className="w-80 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition duration-300 ease-in-out">
            <HomeIcon className="w-5 h-5 mr-2" />
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
