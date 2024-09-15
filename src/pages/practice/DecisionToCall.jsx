import React from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneCall from '../../assets/phone-call.png';

const DecisionToCall = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-[375px] h-[812px] bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col items-center justify-between py-8 px-6">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-800 mt-16">Having an Emergency?</h1>
                    <p className="text-lg text-gray-600 mt-4">
                        Press the button below
                        <br/>
                        help will come soon.
                    </p>
                </div>
        
                <div className="relative w-64 h-64">
                    <div className="absolute inset-0 bg-green-200 rounded-full" style={{ width: '256px', height: '256px' }}></div>
                    <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-50 rounded-full"
                        style={{ width: '311px', height: '311px' }}
                    ></div>
                    <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-200 rounded-full"
                        style={{ width: '256px', height: '256px' }}
                    ></div>
                    <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full flex items-center justify-center"
                        style={{ width: '191px', height: '191px' }}
                        onClick={() => navigate('/practice/call')}
                    >
                        <img
                            src={PhoneCall}
                            alt="Completed"
                            
                        />
                    </div>
                </div>
        
               <button 
                    onClick={() => navigate(-1)}
                    className="w-[150px] py-3 px-4 text-lg font-bold bg-white mb-16 text-black rounded-full shadow-md hover:bg-gray-50 transition duration-300 ease-in-out"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default DecisionToCall;