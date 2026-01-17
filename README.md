# Young Heroes - Next.js App

Emergency training app for kids built with Next.js 15, React 19, Tailwind CSS, and Python backend APIs.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+ (for local development)
- OpenAI API key

### Installation

1. Install Node.js dependencies:

```bash
npm install
```

2. Install Python dependencies (for local development):

```bash
pip install -r requirements.txt
```

3. Set up environment variables:

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_ASSISTANT_DISPATCHER_ID=your_assistant_id_here
TTS_VOICE=alloy
TTS_MODEL=tts-1
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Python 3.9** - Backend API serverless functions
- **OpenAI API** - For text-to-speech, speech-to-text, and assistant functionality

## Project Structure

```
├── api/              # Python serverless functions (Vercel)
│   ├── new_call.py   # Create new chat thread
│   ├── tts.py        # Text-to-speech endpoint
│   ├── stt.py        # Speech-to-text endpoint
│   └── get_call_states.py  # Get call state
├── src/
│   ├── app/          # Next.js App Router pages
│   │   ├── layout.jsx
│   │   ├── page.jsx
│   │   ├── skills/   # Skills pages
│   │   └── practice/ # Practice pages
│   ├── services/     # Python service classes
│   │   └── OpenAI.py
│   └── assets/       # Image assets
├── public/           # Static assets
│   └── assets/      # Images served from public
├── requirements.txt # Python dependencies
└── vercel.json      # Vercel configuration
```

## API Endpoints

The following API endpoints are available as Python serverless functions:

- `GET /api/new_call` - Create a new chat thread
- `GET /api/tts?text=...&callId=...` - Generate text-to-speech audio
- `GET /api/get_call_states?callId=...` - Get call state
- `POST /api/stt` - Convert speech to text (multipart/form-data)

## Deployment to Vercel

1. Push your code to GitHub

2. Import your repository to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. Configure environment variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add the following:
     - `OPENAI_API_KEY`
     - `OPENAI_ASSISTANT_DISPATCHER_ID`
     - Optionally:
     - `TTS_VOICE` (default: `alloy`)
     - `TTS_MODEL` (default: `tts-1`)

4. Deploy:
   - Vercel will automatically detect Next.js and Python functions
   - The `vercel.json` file configures Python 3.9 runtime for API routes

## Local Development with Python APIs

For local development, you can run the Flask backend separately:

```bash
cd src
python server.py
```

Then update the API calls in `src/app/practice/call/page.jsx` to use `http://127.0.0.1:5000/api/...` for local testing.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Python Runtime](https://vercel.com/docs/functions/runtimes/python)
