from http.server import BaseHTTPRequestHandler
import json
import os
import sys
from urllib.parse import urlparse, parse_qs
from pathlib import Path

# Add src directory to path
sys.path.insert(0, str(Path(__file__).parent.parent / 'src'))

from services.OpenAI import OpenAIService
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Parse query parameters
            parsed_path = urlparse(self.path)
            query_params = parse_qs(parsed_path.query)
            
            text = query_params.get('text', [None])[0]
            call_id = query_params.get('callId', [None])[0]
            
            if not text or not call_id:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Missing text or callId parameter"}).encode())
                return
            
            api_key = os.getenv('OPENAI_API_KEY')
            assistant_id = os.getenv('OPENAI_ASSISTANT_DISPATCHER_ID')
            voice = os.getenv('TTS_VOICE', 'alloy')
            model = os.getenv('TTS_MODEL', 'tts-1')
            
            if not api_key:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "OPENAI_API_KEY not set"}).encode())
                return
            
            openai = OpenAIService(api_key)
            thread_id, text_message = openai.generate_dispatcher_response(text, assistant_id=assistant_id, thread_id=call_id)
            
            # Parse JSON response and extract message
            try:
                message_data = json.loads(text_message)
                message_text = message_data.get("message", text_message)
            except (json.JSONDecodeError, KeyError, TypeError):
                message_text = text_message
            
            # Generate speech
            audio_file_path = openai.generate_speech(message_text, voice, model)
            
            # Read and send audio file
            if not audio_file_path.exists():
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Audio file was not created"}).encode())
                return
            
            with open(audio_file_path, 'rb') as f:
                audio_data = f.read()
            
            self.send_response(200)
            self.send_header('Content-Type', 'audio/mpeg')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(audio_data)
            
        except Exception as e:
            import traceback
            traceback.print_exc()
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())

