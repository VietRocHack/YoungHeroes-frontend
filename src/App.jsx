import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PracticeCall from "./pages/practice/PracticeCall";
import PracticeResult from "./pages/practice/PracticeResult";
import LearnRecognize from "./pages/learn/recongize/LearnRecognize";

export default function App() {
  return (
    // <>
    //   // <PracticeCall />
    //   // <PracticeResult />
    //   <LearnRecognize />
    // </>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* <Route path="/skills" element={<Skills />} />
        <Route path="/skills/recognize" element={<Recognize />} />
        <Route path="/skills/recognize/result" element={<RecognizeResult />} />
        <Route path="/skills/communicate" element={<Communicate />} />
        <Route path="/skills/communicate/result" element={<CommunicateResult />} />
        
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice/scenario" element={<Scenario />} />
        <Route path="/practice/call" element={<Call />} />
        <Route path="/practice/result" element={<Result />} /> */}
      </Routes>
    </Router>
  );
}
