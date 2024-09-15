import { Headphones } from "lucide-react"
import { useState, useEffect } from 'react'
import planet from "../../assets/planet.png"
import ballon from "../../assets/ballon.png"
import { useNavigate } from "react-router-dom"

export default function PracticeCall() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[375px] h-[812px] bg-red-100 rounded-3xl shadow-lg overflow-hidden flex flex-col">
        <div className="flex-1 p-6 flex flex-col">
          <div className="text-center mt-8">
            <h1 className="text-4xl text-black">911</h1>
            <h2 className="text-2xl font-semibold mt-1 text-red-400">Emergency Calling...</h2>
            <div className="text-xl text-red-400">{formatTime(timer)}</div>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* <div className="absolute inset-0 bg-red-200 rounded-full opacity-75 animate-pulse"></div>
              <div className="absolute inset-4 bg-red-300 rounded-full opacity-75 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="absolute inset-8 bg-red-400 rounded-full opacity-75 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              <div className="absolute inset-12 bg-white rounded-full flex items-center justify-center">
                <Headphones className="text-blue-600 animate-wiggle" size={70} />
              </div> */}
              {/* <div className="absolute inset-0 bg-green-200 rounded-full" style={{ width: '256px', height: '256px' }}></div> */}
                    <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-200 rounded-full opacity-25 animate-pulse"
                        style={{ width: '311px', height: '311px', animationDelay: "0.2s" }}
                    ></div>
                    <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-300 rounded-full opacity-30 animate-pulse"
                        style={{ width: '256px', height: '256px', animationDelay: "0.4s" }}
                    ></div>
                    <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-400 rounded-full flex items-center justify-center opacity-65 animate-pulse"
                        style={{ width: '191px', height: '191px' }}
                    >
                        <Headphones className="text-white animate-wiggle" size={70} />
                    </div>
              <div className="absolute -top-24 -right-20 w-40 h-40 rounded-full">
                <img src={planet} alt="planet" className="w-50" />
              </div>
              <div className="absolute -bottom-12 -left-20 w-50 h-50 rounded-md transform rotate-12 flex items-center justify-center">
                <img src={ballon} alt="ballon" className="" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 pt-0 flex justify-center items-center">
          <button 
            className="w-60 mb-8 bg-white text-gray-800 font-semibold py-3 px-4 rounded-full transition duration-300 ease-in-out shadow-xl"
            onClick={() => navigate('/practice/recognize/result')}
          >
            End Call
          </button>
        </div>
      </div>
    </div>
  )
}