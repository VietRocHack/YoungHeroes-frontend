import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Skills from './pages/Skills';
import Practice from './pages/Practice';
import PracticeCall from "./pages/practice/PracticeCall";
import Communicate from './pages/learn/communicate/Communicate';
import LearnRecognize from "./pages/learn/recognize/LearnRecognize";
import RecognizeResult from './pages/learn/recognize/RecognizeResult';
import CommunicateResult from './pages/learn/communicate/CommunicateResult';
import DecisionToCall from './pages/practice/DecisionToCall';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/skills" element={<Skills />} />
        <Route path="/skills/recognize" element={<LearnRecognize />} />
        <Route path="/skills/communicate" element={<Communicate />} />
        <Route path="/skills/communicate/result" element={<CommunicateResult />} />

        <Route path="/practice" element={<Practice />} />
        <Route path="/practice/decision" element={<DecisionToCall />} />
        <Route path="/practice/call" element={<PracticeCall />} />
        
        <Route path="/skills/recognize/result" element={<RecognizeResult />} />
        <Route path="/practice/recognize/result" element={<RecognizeResult />} />

      </Routes>
    </Router>
  );
}
