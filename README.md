# RAG Assistant Frontend

This is the React-based frontend for the Open RAG (Retrieval-Augmented Generation) Assistant 
[Backend Repo](https://github.com/Stevencibambo/open-rag-assistant), a conversational AI system powered by a local LLM (via Ollama) and FastAPI backend. The frontend allows users to ask questions in natural language and receive responses based on retrieved documents.

## 🚀 Features
- Clean and responsive UI using Bootstrap
- Dynamic chat interface with history of questions and answers
- Integration with FastAPI backend via REST API
- Handles HTML responses for rich answers (lists, links, etc.)

## 📦 Tech Stack
- React (with Create React App)
- Bootstrap (for styling)
- Fetch API for communication with backend

## ⚙️ Setup Instructions
- Clone the repository:
> git clone https://github.com/Stevencibambo/rag-assistant-frontend.git

> rag-assistant-frontend

- Install dependencies:
> npm install 

- Run the app

> npm start

This will start the app on http://localhost:3000.

⚠️ Make sure the backend (FastAPI) is running on http://localhost:8000 or update the endpoint in the frontend if different.

The page will reload when you make changes.\
You may also see any lint errors in the console.

