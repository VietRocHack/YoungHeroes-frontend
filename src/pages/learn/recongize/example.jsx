import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from 'lucide-react'
import PhoneCallScreen from './phone-call-screen'

type ScenarioOption = {
  text: string;
  nextScenario: string | null;
  isCorrect: boolean;
  feedback: string;
}

type Scenario = {
  id: string;
  image: string;
  description: string;
  options: ScenarioOption[];
}

const scenarios: Scenario[] = [
  {
    id: 'home',
    image: '/placeholder.svg?height=300&width=400',
    description: "You're at home and you smell smoke coming from the kitchen. What do you do?",
    options: [
      { 
        text: "Go to the kitchen to check", 
        nextScenario: 'kitchen', 
        isCorrect: false,
        feedback: "It's brave to investigate, but it's safer to get help first when you smell smoke."
      },
      { 
        text: "Open a window", 
        nextScenario: 'window', 
        isCorrect: false,
        feedback: "Opening a window might help with smoke, but it's not addressing the main problem."
      },
      { 
        text: "Call 911", 
        nextScenario: null, 
        isCorrect: true,
        feedback: "Great choice! Calling 911 immediately when you smell smoke is the safest option."
      }
    ]
  },
  {
    id: 'kitchen',
    image: '/placeholder.svg?height=300&width=400',
    description: "You see a small fire on the stove. What's your next move?",
    options: [
      { 
        text: "Try to put it out with water", 
        nextScenario: 'water', 
        isCorrect: false,
        feedback: "Water can make some fires worse, especially if it's an oil fire. It's safer to call for help."
      },
      { 
        text: "Leave the house immediately", 
        nextScenario: 'outside', 
        isCorrect: true,
        feedback: "Good thinking! Getting out of the house quickly is very important when there's a fire."
      },
      { 
        text: "Call 911", 
        nextScenario: null, 
        isCorrect: true,
        feedback: "Excellent choice! Calling 911 right away is the best thing to do in case of a fire."
      }
    ]
  },
  {
    id: 'window',
    image: '/placeholder.svg?height=300&width=400',
    description: "You've opened a window, but the smoke is getting worse. What now?",
    options: [
      { 
        text: "Go back to check the kitchen", 
        nextScenario: 'kitchen', 
        isCorrect: false,
        feedback: "It's dangerous to go towards the source of smoke. It's better to get out and get help."
      },
      { 
        text: "Leave the house", 
        nextScenario: 'outside', 
        isCorrect: true,
        feedback: "Great decision! Getting out of the house when there's smoke is the safe thing to do."
      },
      { 
        text: "Call 911", 
        nextScenario: null, 
        isCorrect: true,
        feedback: "Perfect! Calling 911 is always the right choice when there's a potential fire."
      }
    ]
  },
  {
    id: 'water',
    image: '/placeholder.svg?height=300&width=400',
    description: "The water made the fire worse! It's spreading quickly. What do you do?",
    options: [
      { 
        text: "Try to find a fire extinguisher", 
        nextScenario: 'extinguisher', 
        isCorrect: false,
        feedback: "While fire extinguishers can be helpful, at this point it's safer to get out and call for help."
      },
      { 
        text: "Leave the house immediately", 
        nextScenario: 'outside', 
        isCorrect: true,
        feedback: "Excellent choice! When a fire is spreading, getting out quickly is the best thing to do."
      },
      { 
        text: "Call 911", 
        nextScenario: null, 
        isCorrect: true,
        feedback: "Great thinking! Calling 911 right away is crucial when a fire is spreading."
      }
    ]
  },
  {
    id: 'outside',
    image: '/placeholder.svg?height=300&width=400',
    description: "You're safely outside, but the fire is still burning inside. What's the best action?",
    options: [
      { 
        text: "Wait for help to arrive", 
        nextScenario: 'wait', 
        isCorrect: false,
        feedback: "Waiting is good, but there's one more important step to take."
      },
      { 
        text: "Call 911", 
        nextScenario: null, 
        isCorrect: true,
        feedback: "Perfect! Even when you're safe outside, it's crucial to call 911 to report the fire."
      }
    ]
  },
  {
    id: 'extinguisher',
    image: '/placeholder.svg?height=300&width=400',
    description: "You couldn't find a fire extinguisher, and the fire is getting bigger. What now?",
    options: [
      { 
        text: "Leave the house immediately", 
        nextScenario: 'outside', 
        isCorrect: true,
        feedback: "Great decision! When you can't control a fire, getting out quickly is the best choice."
      },
      { 
        text: "Call 911", 
        nextScenario: null, 
        isCorrect: true,
        feedback: "Excellent! Calling 911 is crucial when a fire is out of control."
      }
    ]
  },
  {
    id: 'wait',
    image: '/placeholder.svg?height=300&width=400',
    description: "You're waiting outside, but no one seems to know about the fire. What should you do?",
    options: [
      { 
        text: "Ask a neighbor for help", 
        nextScenario: 'neighbor', 
        isCorrect: false,
        feedback: "Asking for help is good, but there's a faster way to get professional help."
      },
      { 
        text: "Call 911", 
        nextScenario: null, 
        isCorrect: true,
        feedback: "Perfect! Even if you're safe outside, it's important to call 911 to report the fire."
      }
    ]
  },
  {
    id: 'neighbor',
    image: '/placeholder.svg?height=300&width=400',
    description: "Your neighbor suggests calling the fire department. What's the best way to do that?",
    options: [
      { 
        text: "Call 911", 
        nextScenario: null, 
        isCorrect: true,
        feedback: "Excellent! Calling 911 is the fastest way to reach the fire department in an emergency."
      }
    ]
  }
]

export default function CYOAScenario() {
  const [currentScenario, setCurrentScenario] = useState<Scenario>(scenarios[0])
  const [call911, setCall911] = useState(false)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)

  const handleOptionClick = (option: ScenarioOption) => {
    setShowFeedback(true)
    setFeedback(option.feedback)
    
    if (option.isCorrect) {
      setScore(prevScore => prevScore + 1)
    }

    setTimeout(() => {
      setShowFeedback(false)
      if (option.nextScenario === null) {
        setCall911(true)
      } else {
        const nextScenario = scenarios.find(s => s.id === option.nextScenario)
        if (nextScenario) {
          setCurrentScenario(nextScenario)
        }
      }
    }, 3000)
  }

  useEffect(() => {
    if (call911) {
      const finalScore = Math.round((score / scenarios.length) * 100)
      alert(Great job, Hero! Your final score is ${finalScore}%)
    }
  }, [call911, score])

  if (call911) {
    return <PhoneCallScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-indigo-600 flex flex-col items-center justify-center p-4 text-white">
      <Card className="w-full max-w-2xl bg-white text-indigo-900 rounded-3xl shadow-xl overflow-hidden">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6">911 Hero Academy</h1>
          <div className="relative">
            <img
              src={currentScenario.image}
              alt="Scenario illustration"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9rKxToSXoOF74yWHg4idrL5AJ2YP64.png" 
              alt="911 Hero Academy Mascot" 
              className="absolute -bottom-4 -right-4 w-24 h-24 transform rotate-12"
            />
          </div>
          <p className="text-lg mb-6">{currentScenario.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentScenario.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`${
                  option.nextScenario === null
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-indigo-500 hover:bg-indigo-600'
                } text-white font-bold py-3 px-4 rounded-full text-sm transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400`}
              >
                {option.text}
              </Button>
            ))}
          </div>
          {showFeedback && (
            <div className={`mt-4 p-4 rounded-lg ${feedback.includes("Great") || feedback.includes("Excellent") || feedback.includes("Perfect") ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
              <div className="flex items-center">
                {feedback.includes("Great") || feedback.includes("Excellent") || feedback.includes("Perfect") ? (
                  <CheckCircle className="w-6 h-6 mr-2" />
                ) : (
                  <AlertCircle className="w-6 h-6 mr-2" />
                )}
                <p>{feedback}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}