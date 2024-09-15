import { Headphones } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import planet from "../../assets/planet.png";
import ballon from "../../assets/ballon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const states = {
  START: "start",
  DISPATCHER: "dispatcher",
  USER: "user",
  END: "end",
  ERROR: "error",
};

const buttonInfo = {
  start: "Start Call",
  dispatcher: "Waiting for dispatcher...",
  user: "Stop Recording",
  end: "Call Ended",
  error: "Error",
};

export default function PracticeCall() {
  const [id, setId] = useState(null);
  const [state, setState] = useState(states.START);
  const [clickable, setClickable] = useState(true);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const finishedRef = useRef(false);
  const [isRecording, setIsRecording] = useState(false);
  const audioBlobRef = useRef(null);
  const textRef = useRef("");

  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const requestMicrophoneAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);
      } catch (err) {
        console.error("Microphone access denied", err);
      }
    };

    requestMicrophoneAccess();

    // Function to fetch the ID from the API
    const fetchIdFromAPI = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/new_call"); // Replace with your API endpoint
        if (response.data) {
          localStorage.setItem("uniqueId", response.data); // Save ID to localStorage
          setId(response.data); // Set ID in state
        }
      } catch (error) {
        console.error("Error fetching ID:", error);
      }
    };

    // Check if the ID already exists in localStorage
    const storedId = localStorage.getItem("uniqueId");
    if (storedId) {
      setId(storedId); // Set ID from localStorage
    } else {
      // If no ID is found, call the API to fetch a new one
      fetchIdFromAPI();
    }
  }, []); // Empty dependency array ensures it only runs once

  const handleStartCall = () => {
    console.log("Starting call...");
    setClickable(false);
    setState(states.DISPATCHER);
  };

  const handleDispatcherCall = async (text) => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/tts", {
        responseType: "arraybuffer",
        params: {
          text: text,
          callId: id,
        },
      });
      if (response.data) {
        console.log("Audio file received:", response.data);
        const saveAudioFile = (audioData) => {
          const blob = new Blob([audioData], { type: "audio/wav" });
          const url = URL.createObjectURL(blob);
          return url;
        };

        const audiourl = saveAudioFile(response.data);

        const playaudio = new Audio(audiourl);
        playaudio.play();

        // Function to wait until the audio ends
        const waitForAudioToEnd = () => {
          return new Promise((resolve) => {
            playaudio.addEventListener("ended", resolve);
          });
        };

        await waitForAudioToEnd();
      }
    } catch (error) {
      setState(states.ERROR);
      console.error("Error starting call:", error);
    } finally {
      var isEnding = false;
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/get_call_states",
          {
            params: {
              callId: id,
            },
          }
        );
        if (response.data) {
          console.log(response.data);
          if (response.data[0]) {
            isEnding = true;
          }
        }
      } catch (error) {
        setState(states.ERROR);
        console.error("Error getting call states:", error);
      } finally {
        if (isEnding) {
          finishedRef.current = true;
          setState(states.END);
          localStorage.removeItem("uniqueId");
        } else {
          setState(states.USER);
          startRecording();
          setClickable(true);
        }
      }
    }
  };

  // Start recording
  const startRecording = () => {
    if (mediaRecorderRef.current) {
      console.log("Recording started");
      audioChunksRef.current = []; // Clear any previous data
      mediaRecorderRef.current.start();
      setIsRecording(true);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        audioBlobRef.current = audioBlob; // Store the audio Blob in state
        setIsRecording(false);
        textRef.current = await handleSpeechToText();

        setState(states.DISPATCHER);
        await handleDispatcherCall(textRef.current);
      };
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSpeechToText = async () => {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlobRef.current);

      const response = await axios.post(
        "http://127.0.0.1:5000/api/stt",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        console.log("Speech to text result:", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error converting speech to text:", error);
    }
  };

  const handleClick = async () => {
    switch (state) {
      case states.START:
        handleStartCall();
        await handleDispatcherCall("<START>");
        break;
      case states.USER:
        stopRecording();
        setClickable(false);
        console.log("Recording stopped");
        console.log("Audio chunks:", audioChunksRef.current);
        console.log("Audio Blob:", audioBlobRef.current);
        break;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[375px] h-[812px] bg-red-100 rounded-3xl shadow-lg overflow-hidden flex flex-col">
        <div className="flex-1 p-6 flex flex-col">
          <div className="text-center mt-8">
            <h1 className="text-4xl text-black">911</h1>
            <h2 className="text-2xl font-semibold mt-1 text-red-400">
              Emergency Calling...
            </h2>
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
                style={{
                  width: "311px",
                  height: "311px",
                  animationDelay: "0.2s",
                }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-300 rounded-full opacity-30 animate-pulse"
                style={{
                  width: "256px",
                  height: "256px",
                  animationDelay: "0.4s",
                }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-400 rounded-full flex items-center justify-center opacity-65 animate-pulse"
                style={{ width: "191px", height: "191px" }}
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
            onClick={handleClick}
            disabled={!clickable}
          >
            {buttonInfo[state]}
          </button>
        </div>

        <div className="p-6 pt-0 flex justify-center items-center">
          <button
            className="w-60 mb-8 bg-white text-gray-800 font-semibold py-3 px-4 rounded-full transition duration-300 ease-in-out shadow-xl"
            onClick={() => navigate("/practice/recognize/result")}
          >
            End Call
          </button>
        </div>
      </div>
    </div>
  );
}
