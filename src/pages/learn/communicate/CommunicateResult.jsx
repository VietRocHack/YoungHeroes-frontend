import React from 'react';
import Check from '../../../assets/check-circle.png';
import { useNavigate } from 'react-router-dom';

const CommunicateResult = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-[375px] h-[812px] bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col items-center justify-between py-8 px-6">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-2">You have completed!</h1>
                    <p className="text-lg text-gray-600">This is your result</p>
                </div>
        
                <div className="relative w-64 h-64">
                    <div className="absolute inset-0 bg-green-200 rounded-full" style={{ width: '256px', height: '256px' }}></div>
                    <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-50 rounded-full"
                        style={{ width: '311px', height: '311px' }}
                    ></div>
                    <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-200 rounded-full"
                        style={{ width: '256px', height: '256px' }}
                    ></div>
                    <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
                        style={{ width: '191px', height: '191px', backgroundColor: '#3cdb7f' }}
                    >
                        <img
                            src={Check}
                            alt="Completed"
                            
                        />
                    </div>
                </div>
        
                <div className="bg-gray-100 rounded-lg p-4 w-full max-w-xs">
                    <h2 className="text-lg font-semibold mb-2 text-black">Summary</h2>
                    <p className="text-gray-700">
                        You've successfully completed all tasks. Great job on your performance!
                    </p>
                </div>
        
                <button 
                    onClick={() => navigate('/')}
                    className="w-[150px] py-3 px-4 text-lg font-bold bg-white text-black rounded-full shadow-md hover:bg-gray-50 transition duration-300 ease-in-out"
                >
                    Home
                </button>
            </div>
        </div>
    );
}

export default CommunicateResult;