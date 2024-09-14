import React from 'react';
import Teamwork from '../assets/teamwork.png';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="w-full max-w-[375px] h-[812px] bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">

            <h1 className="text-5xl font-bold leading-tight text-center mt-16 mb-8 text-black">Young Heroes</h1>
            <img 
                src={Teamwork} 
                alt="Workflow Teamwork Illustration" 
                className="w-[320px] h-[320px] mx-auto rounded-lg"
            />
        
            <div className="flex flex-col items-center space-y-4 mb-16">
                <h2 className="w-[192px] h-[28px] text-2xl font-semibold text-center text-black">
                    Save Your <span className="text-emerald-400">Soul</span>
                </h2>
                <p className="w-[295px] h-[20px] text-sx text-gray-600 text-center">
                    Empower kids to escape from danger
                </p>
            </div>
            
            <div className="flex flex-col items-center space-y-4">
                <button 
                    onClick={() => navigate('/skills')}
                    className="w-[211px] h-[56px] py-3 px-4 text-lg font-bold bg-black text-white rounded-full border border-gray-100 shadow-xl duration-300 ease-in-out"
                >
                    Skills
                </button>
                <button 
                    onClick={() => {/* Add navigation logic here */}}
                    className="w-[211px] h-[56px] py-3 px-4 text-lg font-bold bg-white text-gray-800 rounded-full border border-gray-100 shadow-xl hover:bg-gray-50 transition duration-300 ease-in-out"
                >
                    Practice
                </button>
            </div>
              
          </div>
        </div>
    );
}

export default HomePage;