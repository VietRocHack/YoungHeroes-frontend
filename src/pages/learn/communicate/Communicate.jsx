import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import Fire from '../../../assets/fire.png';
import Policeman from '../../../assets/policeman.png';
import Ambulance from '../../../assets/ambulance.png';

const emergencyOptions = [
  { text: 'Fire!', image: Fire },
  { text: 'Medical Help', image: Ambulance },
  { text: 'Danger!', image: Policeman },
];

export default function Communicate() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [randomOptions, setRandomOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    try {
      const shuffled = [...emergencyOptions].sort(() => 0.5 - Math.random());
      setRandomOptions(shuffled.slice(0, 4));
    } catch (err) {
      setError('Failed to load emergency options');
      console.error('Error in useEffect:', err);
    }

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-[375px] h-[812px] bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
        <div className="flex-1 flex flex-col items-center p-6 space-y-6">
          <div className="text-4xl text-black">911 Emergency</div>
          <div className="text-xl text-black">{formatTime(timer)}</div>
          <div className="w-full bg-gray-100 rounded-lg p-6 flex items-center min-h-[100px]">
            <MessageSquare className="w-8 h-8 mr-4 text-gray-500" />
            <div className="text-black text-lg">What's your emergency?</div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            {randomOptions.map((option, index) => (
                <div 
                    key={index} 
                    className="rounded-full flex items-center justify-center p-2 aspect-square border-2 border-gray-300 overflow-hidden"
                    >
                    <img
                        src={option.image}
                        alt={option.text}
                        className="w-[90%] h-[90%] object-cover rounded-full"
                    />
                </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between p-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-[150px] py-3 px-4 text-lg font-bold bg-white text-gray-800 rounded-full border border-gray-300 shadow-md hover:bg-gray-50 transition duration-300 ease-in-out"
          >
            Back
          </button>
          <button 
            onClick={() => navigate('/next-page')}
            className="w-[150px] py-3 px-4 text-lg font-bold bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}