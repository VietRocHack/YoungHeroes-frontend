import { Headphones } from "lucide-react"
import planet from "../../assets/planet.png"
import ballon from "../../assets/ballon.png"

export default function PracticeCall() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[375px] h-[812px] bg-pink-200 rounded-3xl shadow-lg overflow-hidden flex flex-col">
        <div className="flex-1 p-6 flex flex-col">
          <div className="w-full flex justify-between items-center mb-8">
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-pink-300 rounded-full opacity-75"></div>
              <div className="absolute inset-4 bg-pink-400 rounded-full opacity-75"></div>
              <div className="absolute inset-8 bg-pink-500 rounded-full opacity-75"></div>
              <div className="absolute inset-12 bg-white rounded-full flex items-center justify-center">
                <Headphones className="text-blue-600" size={40} />
              </div>
              <div className="absolute -top-24 -right-20 w-40 h-40 rounded-full">
                <img src={planet} alt="planet" className="w-50" />
              </div>
              <div className="absolute -bottom-12 -left-20 w-50 h-50 rounded-md transform rotate-12 flex items-center justify-center">
                <img src={ballon} alt="ballon" className="" />
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <h2 className="text-2xl font-semibold mb-4">Emergency Calling...</h2>
          </div>
        </div>
        
        <div className="p-6">
          <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-full transition duration-300 ease-in-out">
            End Call
          </button>
        </div>
      </div>
    </div>
  )
}