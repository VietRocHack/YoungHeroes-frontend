// API configuration for local development vs production
// IMPORTANT: This function is called at runtime, not build time
// This ensures correct API URL based on where the app is running

function getApiBaseUrl() {
  // Server-side rendering (Next.js SSR) - always use production API
  if (typeof window === 'undefined') {
    return '/api';
  }
  
  // Client-side - check the actual URL
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port;
  
  // Only use local Flask backend if ALL of these are true:
  // 1. Hostname is localhost or 127.0.0.1
  // 2. Protocol is http (not https)
  // 3. Port is 3000 or empty (Next.js dev server)
  // This ensures Vercel (https://young-heroes.vercel.app) always uses /api
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  const isHttp = protocol === 'http:';
  const isDevPort = port === '3000' || port === '';
  
  const isLocal = isLocalhost && isHttp && isDevPort;
  
  // Return appropriate API URL
  // On Vercel: hostname will be 'young-heroes.vercel.app', protocol will be 'https:', so isLocal = false → returns '/api'
  // On localhost: hostname will be 'localhost', protocol will be 'http:', port will be '3000', so isLocal = true → returns 'http://127.0.0.1:5000/api'
  return isLocal ? 'http://127.0.0.1:5000/api' : '/api';
}

// Export API functions - each call gets fresh URL
export const api = {
  newCall: () => {
    const base = getApiBaseUrl();
    return `${base}/new_call`;
  },
  tts: (text, callId) => {
    const base = getApiBaseUrl();
    return `${base}/tts?text=${encodeURIComponent(text)}&callId=${encodeURIComponent(callId)}`;
  },
  getCallStates: (callId) => {
    const base = getApiBaseUrl();
    return `${base}/get_call_states?callId=${encodeURIComponent(callId)}`;
  },
  stt: () => {
    const base = getApiBaseUrl();
    return `${base}/stt`;
  },
};

