// API configuration for local development vs production
// Check if we're in the browser and on localhost
const isLocalDevelopment = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Use local Flask backend in development, relative paths in production
const API_BASE_URL = isLocalDevelopment 
  ? 'http://127.0.0.1:5000/api'
  : '/api';

export const api = {
  newCall: () => `${API_BASE_URL}/new_call`,
  tts: (text, callId) => `${API_BASE_URL}/tts?text=${encodeURIComponent(text)}&callId=${encodeURIComponent(callId)}`,
  getCallStates: (callId) => `${API_BASE_URL}/get_call_states?callId=${encodeURIComponent(callId)}`,
  stt: () => `${API_BASE_URL}/stt`,
};

