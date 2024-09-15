import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import Fire from '../../../assets/fire.png';
import Ambulance from '../../../assets/ambulance.png';
import Policeman from '../../../assets/policeman.png';
import Home from '../../../assets/home.png';
import School from '../../../assets/school.png';
import Playground from '../../../assets/playground.png';
import Mall from '../../../assets/shopping-mall.png';
import Parents from '../../../assets/parents.png';
import Siblings from '../../../assets/siblings.png';
import Friends from '../../../assets/high-five.png';
import Myself from '../../../assets/myself.png';
import Stomachache from '../../../assets/stomachache.png';
import Stuck from '../../../assets/hole.png';
import BrokenLeg from '../../../assets/broken-leg.png';
import Dizzy from '../../../assets/dizziness.png';

const questions = [
  {
    question: "What's your emergency?",
    options: [
      { text: 'Fire!', image: Fire },
      { text: 'Medical Help', image: Ambulance },
      { text: 'Danger!', image: Policeman },
      { text: 'Other', image: 'https://picsum.photos/seed/other/200/200' },
    ],
  },
  {
    question: "Where are you at right now?",
    options: [
      { text: 'Home', image: Home },
      { text: 'School', image: School },
      { text: 'Park', image: Playground },
      { text: 'Shopping Mall', image: Mall },
    ],
  },
  {
    question: "Who is hurt?",
    options: [
      { text: 'Just me', image: Myself },
      { text: 'My parents', image: Parents },
      { text: 'My friends', image: Friends },
      { text: 'My siblings', image: Siblings },
    ],
  },
  {
    question: "What is the problem?",
    options: [
      { text: 'I\'m stuck', image: Stuck },
      { text: 'I broke my legs', image: BrokenLeg },
      { text: 'I am dizzy', image: Dizzy },
      { text: 'My stomach is hurt', image: Stomachache },
    ],
  }
];

export default function Communicate() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);

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

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      navigate('/results'); // Navigate to results page when all questions are answered
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-[375px] h-[812px] bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
        <div className="flex-1 flex flex-col items-center p-6 space-y-6">
          <div className="text-4xl text-black">911 Emergency</div>
          <div className="text-xl text-black">{formatTime(timer)}</div>
          <div className="w-full bg-gray-100 rounded-lg p-6 flex items-center min-h-[100px]">
            <MessageSquare className="w-8 h-8 mr-4 text-gray-500" />
            <div className="text-black text-lg">{currentQuestion.question}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            {currentQuestion.options.map((option, index) => (
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
            onClick={handleContinue}
            className="w-[150px] py-3 px-4 text-lg font-bold bg-white text-black rounded-full shadow-md hover:bg-gray-50 transition duration-300 ease-in-out"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}