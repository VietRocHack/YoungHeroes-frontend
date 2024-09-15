import { Volume2, Heart } from "lucide-react";
import { useState } from "react";
import star from "../../../assets/star.png";
import deco1 from "../../../assets/learnRec1.png";
import deco2 from "../../../assets/learnRec2.png";
import kitchenSmoke from "../../../assets/KitchenSmoke.jpg";
import stoveFire from "../../../assets/StoveFire.jpg";
import windowOpen from "../../../assets/WindowOpen.jpg";
import fireWorse from "../../../assets/FireWorse.jpg";
import seeFire from "../../../assets/SeeFire.jpg";
import burningHouse from "../../../assets/BurningHouse.jpg";
import callHelp from "../../../assets/CallHelp.jpg";

export default function LearnRecognize() {
  const [value, setValue] = useState(10);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [current, setCurrent] = useState(0);
  const [isCorrectChoice, setIsCorrectChoice] = useState(null);

  const scenarios = [
    {
      id: "home",
      image: kitchenSmoke,
      description:
        "You're at home and you smell smoke coming from the kitchen. What do you do?",
      options: [
        {
          text: "Go to the kitchen to check",
          nextScenario: "kitchen",
          isCorrect: false,
          feedback:
            "It's brave to investigate, but it's safer to get help first when you smell smoke.",
        },
        {
          text: "Open a window",
          nextScenario: "window",
          isCorrect: false,
          feedback:
            "Opening a window might help with smoke, but it's not addressing the main problem.",
        },
      ],
      call911: {
        text: "Call 911",
        nextScenario: null,
        isCorrect: true,
        feedback:
          "Great choice! Calling 911 immediately when you smell smoke is the safest option.",
      },
    },
    {
      id: "kitchen",
      image: stoveFire,
      description: "You see a small fire on the stove. What's your next move?",
      options: [
        {
          text: "Try to put it out with water",
          nextScenario: "water",
          isCorrect: false,
          feedback:
            "Water can make some fires worse, especially if it's an oil fire. It's safer to call for help.",
        },
        {
          text: "Leave the house immediately",
          nextScenario: "outside",
          isCorrect: true,
          feedback:
            "Good thinking! Getting out of the house quickly is very important when there's a fire.",
        },
      ],
      call911: {
        text: "Call 911",
        nextScenario: null,
        isCorrect: true,
        feedback:
          "Excellent choice! Calling 911 right away is the best thing to do in case of a fire.",
      },
    },
    {
      id: "window",
      image: windowOpen,
      description:
        "You've opened a window, but the smoke is getting worse. What now?",
      options: [
        {
          text: "Go back to check the kitchen",
          nextScenario: "kitchen",
          isCorrect: false,
          feedback:
            "It's dangerous to go towards the source of smoke. It's better to get out and get help.",
        },
        {
          text: "Leave the house",
          nextScenario: "outside",
          isCorrect: true,
          feedback:
            "Great decision! Getting out of the house when there's smoke is the safe thing to do.",
        },
      ],
      call911: {
        text: "Call 911",
        nextScenario: null,
        isCorrect: true,
        feedback:
          "Perfect! Calling 911 is always the right choice when there's a potential fire.",
      },
    },
    {
      id: "water",
      image: fireWorse,
      description:
        "The water made the fire worse! It's spreading quickly. What do you do?",
      options: [
        {
          text: "Try to find a fire extinguisher",
          nextScenario: "extinguisher",
          isCorrect: false,
          feedback:
            "While fire extinguishers can be helpful, at this point it's safer to get out and call for help.",
        },
        {
          text: "Leave the house immediately",
          nextScenario: "outside",
          isCorrect: true,
          feedback:
            "Excellent choice! When a fire is spreading, getting out quickly is the best thing to do.",
        },
      ],
      call911: {
        text: "Call 911",
        nextScenario: null,
        isCorrect: true,
        feedback:
          "Great thinking! Calling 911 right away is crucial when a fire is spreading.",
      },
    },
    {
      id: "outside",
      image: seeFire,
      description:
        "You're safely outside, but the fire is still burning inside. What's the best action?",
      options: [
        {
          text: "Wait for help to arrive",
          nextScenario: "wait",
          isCorrect: false,
          feedback:
            "Waiting is good, but there's one more important step to take.",
        },
      ],
      call911: {
        text: "Call 911",
        nextScenario: null,
        isCorrect: true,
        feedback:
          "Perfect! Even when you're safe outside, it's crucial to call 911 to report the fire.",
      },
    },
    {
      id: "extinguisher",
      image: fireWorse,
      description:
        "You couldn't find a fire extinguisher, and the fire is getting bigger. What now?",
      options: [
        {
          text: "Leave the house immediately",
          nextScenario: "outside",
          isCorrect: true,
          feedback:
            "Great decision! When you can't control a fire, getting out quickly is the best choice.",
        },
      ],
      call911: {
        text: "Call 911",
        nextScenario: null,
        isCorrect: true,
        feedback:
          "Excellent! Calling 911 is crucial when a fire is out of control.",
      },
    },
    {
      id: "wait",
      image: burningHouse,
      description:
        "You're waiting outside, but no one seems to know about the fire. What should you do?",
      options: [
        {
          text: "Ask a neighbor for help",
          nextScenario: "neighbor",
          isCorrect: false,
          feedback:
            "Asking for help is good, but there's a faster way to get professional help.",
        },
      ],
      call911: {
        text: "Call 911",
        nextScenario: null,
        isCorrect: true,
        feedback:
          "Perfect! Even if you're safe outside, it's important to call 911 to report the fire.",
      },
    },
    {
      id: "neighbor",
      image: callHelp,
      description:
        "Your neighbor suggests calling the fire department. What's the best way to do that?",
      options: [],
      call911: {
        text: "Call 911",
        nextScenario: null,
        isCorrect: true,
        feedback:
          "Excellent! Calling 911 is the fastest way to reach the fire department in an emergency.",
      },
    },
  ];

  const handleOptionClick = (option) => {
    setFeedbackMessage(option.feedback);
    setShowFeedback(true);
    setIsCorrectChoice(option.isCorrect);

    setTimeout(() => {
      const nextScenarioId = option.nextScenario;
      if (nextScenarioId === null) {
        // Handle the end of the scenarios or transition to a different screen
        // For example, navigate to another page or show a completion screen
        console.log(
          "Reached end of scenarios. Handle navigation or completion screen here."
        );
      } else {
        const nextScenarioIndex = scenarios.findIndex(
          (scenario) => scenario.id === nextScenarioId
        );
        setCurrent(nextScenarioIndex);
      }

      setShowFeedback(false);
      setIsCorrectChoice(null);
      if (!option.isCorrect) {
        setValue(value - 1);
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-[375px] h-[812px] bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <Volume2 className="text-gray-600" size={24} />
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-semibold">{value}</span>
              <Heart className="text-red-600" size={24} />
            </div>
          </div>

          {showFeedback ? (
            <div
              className={`bg-${
                isCorrectChoice ? "green" : "red"
              }-100 border border-${
                isCorrectChoice ? "green" : "red"
              }-300 rounded-lg p-4 mb-6 flex items-start`}
            >
              <div
                className={`text-${
                  isCorrectChoice ? "green" : "red"
                }-500 mr-2 flex-shrink-0`}
                style={{ fontSize: "20px", lineHeight: "20px" }}
              >
                {isCorrectChoice ? "✓" : "✗"}
              </div>
              <div>
                <p
                  className={`font-extrabold ${
                    isCorrectChoice ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {isCorrectChoice ? "Correct choice" : "Wrong choice"}
                </p>
                <p className="text-black text-sm">{feedbackMessage}</p>
              </div>
            </div>
          ) : (
            <div className="mb-6" style={{ height: "64px" }}>
              <p className="font-bold text-black">
                {scenarios[current].description}
              </p>
            </div>
          )}

          <div className="flex-1 border-2 border-gray-300 rounded-2xl mb-6 overflow-hidden">
            <img
              src={scenarios[current].image}
              alt="scenario"
              key={current}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative space-y-4">
            <div
              className="absolute w-24 h-24 rounded-full"
              style={{ top: "-50px", left: "-10px" }}
            >
              <img src={deco2} alt="decoration" className="w-full h-full" />
            </div>
            {scenarios
              .filter((scenario, index) => index === current) // Filter to get the current scenario
              .flatMap((scenario) => scenario.options) // Flatten options array
              .map((option, index) => (
                <button
                  key={index}
                  className="w-full border border-gray-300 rounded-full bg-white hover:bg-gray-300 text-gray-800 transition duration-300 ease-in-out"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.text}
                </button>
              ))}
          </div>
        </div>

        <div className="relative p-6 pt-2 flex justify-center items-center">
          <button
            onClick={() => handleOptionClick(scenarios[current].call911)}
            className="w-40 border border-gray-100 bg-white text-gray-800 font-semibold py-3 px-4 rounded-full transition duration-300 ease-in-out shadow-xl"
          >
            Call 911
            <div className="absolute left-5 bottom-5 w-10 h-10 rounded-full">
              <img src={star} alt="decoration" className="w-full h-full" />
            </div>
            <div className="absolute right-5 bottom-7 w-24 h-24 rounded-full">
              <img src={deco1} alt="decoration" className="w-full h-full" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
