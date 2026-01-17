from http.server import BaseHTTPRequestHandler
import json
import os
import sys
import tempfile
from pathlib import Path
import cgi
import io

# Add src directory to path
sys.path.insert(0, str(Path(__file__).parent.parent / 'src'))

from services.OpenAI import OpenAIService
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        tmp_path = None
        try:
            # Get content type
            content_type = self.headers.get('Content-Type', '')
            
            if 'multipart/form-data' in content_type:
                # Parse multipart form data
                form = cgi.FieldStorage(
                    fp=self.rfile,
                    headers=self.headers,
                    environ={'REQUEST_METHOD': 'POST'}
                )
                
                if 'audio' not in form:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": "No audio file provided"}).encode())
                    return
                
                audio_file = form['audio']
                if audio_file.filename:
                    # Save to temporary file
                    with tempfile.NamedTemporaryFile(delete=False, suffix='.webm') as tmp_file:
                        audio_data = audio_file.file.read()
                        tmp_file.write(audio_data)
                        tmp_path = tmp_file.name
                else:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": "Invalid audio file"}).encode())
                    return
            else:
                # Handle raw audio data
                content_length = int(self.headers.get('Content-Length', 0))
                if content_length == 0:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": "No audio file provided"}).encode())
                    return
                
                audio_data = self.rfile.read(content_length)
                with tempfile.NamedTemporaryFile(delete=False, suffix='.webm') as tmp_file:
                    tmp_file.write(audio_data)
                    tmp_path = tmp_file.name
            
            try:
                api_key = os.getenv('OPENAI_API_KEY')
                if not api_key:
                    self.send_response(500)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": "OPENAI_API_KEY not set"}).encode())
                    return
                
                openai = OpenAIService(api_key)
                transcription = openai.speech_to_text(tmp_path)
                
                self.send_response(200)
                self.send_header('Content-Type', 'text/plain')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(transcription.encode())
            finally:
                # Clean up temporary file
                if tmp_path and os.path.exists(tmp_path):
                    os.remove(tmp_path)
                    
        except Exception as e:
            import traceback
            traceback.print_exc()
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
            if tmp_path and os.path.exists(tmp_path):
                os.remove(tmp_path)

