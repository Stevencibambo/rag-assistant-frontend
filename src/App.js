import React, { useState, useRef, useEffect } from "react";
import { Container, Button, Form, Alert } from 'react-bootstrap';
import ReactMarkdown from "react-markdown"



function App() {
    const [messages, setMessages] = useState([])
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    const askQuestion = async() => {
        if (!question.trim()) return;

        const userMessage = { type: "user", text: question};
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);

        try {
            const res = await fetch("http://localhost:8000/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question })
            });
            if (!res.ok) {
                throw new Error("Erreur serveur");
            }

            const data = await res.json();

            const botMessage = {
                type: "bot",
                text: data.response || "Aucune réponse reçue."
            }
            setMessages(prev => [...prev, botMessage]);
            setQuestion("");
        } catch (error) {
            console.error(error);
            setMessages(prev => [
                ...prev, {type: "bot", text: "Erreur lors de la connexion au serveur."}
            ]);
        }
        setLoading(false);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth"});
    }, [messages]);

    return ( 
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
        <div className="bg-white shadow p-5 rounded w-100" style={{ maxWidth: "800px" }}>
            <h2 className="mb-4">Ms. Jenny</h2>
            <div className="mb-4 border rounded p-3 bg-light" style={{ maxHeight: "50vh", overflowY: "auto" }}>
                {messages.map((msg, idx) => (
                    <div 
                    key={idx} 
                    className={`mb-3 p-3 rounded ${ msg.type === "user" ? "bg-primary text-white text-end lead" : "bg-white border lead"}`}>
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                    )
                )}
                <div ref={bottomRef} />
            </div>
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && askQuestion()}
            placeholder="Posez votre question..." className="form-control mb-3"/>

            <button onClick={askQuestion} disabled={loading} className="btn btn-primary">
                {loading ? "Chargement..." : "Envoyer"}
            </button>
        </div>
    </div>
  );
}

export default App;