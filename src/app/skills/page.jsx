'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Skills() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-[400px] h-[812px] bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">

                <h1 className="text-3xl font-thin leading-tight text-center mt-8 text-black">
                    Explore skills to know
                    <br/>
                    in an emergency
                </h1>
               
                <div className="flex flex-col items-center space-y-8">
                    <div className="relative">
                        <img 
                            src="/assets/searching.png" 
                            alt="Recognize" 
                            className="w-[300px] h-[300px] mx-auto rounded-lg"
                        />
                        <button 
                            onClick={() => router.push('/skills/recognize')}
                            className="absolute bottom-[-28px] left-1/2 transform -translate-x-1/2 w-[211px] h-[56px] py-3 px-4 text-lg font-bold bg-white text-gray-800 rounded-full border border-gray-100 shadow-xl hover:bg-gray-50 transition duration-300 ease-in-out"
                        >
                            Recognize
                        </button>
                    </div>
                    
                    <div className="relative mt-8">
                        <img 
                            src="/assets/relationship.png" 
                            alt="Communicate" 
                            className="w-[300px] h-[300px] mx-auto rounded-lg"
                        />
                        <button 
                            onClick={() => router.push('/skills/communicate')}
                            className="absolute bottom-[-28px] left-1/2 transform -translate-x-1/2 w-[211px] h-[56px] py-3 px-4 text-lg font-bold bg-white text-gray-800 rounded-full border border-gray-100 shadow-xl hover:bg-gray-50 transition duration-300 ease-in-out"
                        >
                            Communicate
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

