import React, { useState } from 'react';
import ReasoningSteps from './ReasoningSteps';
import CitationCard from './CitationCard';

export default function ChatWindow() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // In a real app, you would fetch from your backend here
      // const res = await fetch('/api/diagnose', { ... });
      // const data = await res.json();
      
      // Mock response for starter code
      setTimeout(() => {
        const aiMsg = {
          role: 'assistant',
          content: 'Based on the symptoms provided, here is the clinical assessment.',
          reasoningSteps: [
            "Analyzed patient symptoms: headache, fever.",
            "Cross-referenced with WHO infectious disease guidelines.",
            "Identified potential viral etiology."
          ],
          citations: [
            { id: 1, title: "WHO Guidelines on Viral Infections", url: "#", snippet: "Fever and headache are common presenting symptoms..." }
          ]
        };
        setMessages(prev => [...prev, aiMsg]);
        setLoading(false);
      }, 1500);

    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            Enter patient symptoms to get clinical decision support.
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
              {msg.content}
            </div>
            {msg.reasoningSteps && <ReasoningSteps steps={msg.reasoningSteps} />}
            {msg.citations && msg.citations.length > 0 && (
              <div className="mt-2 space-y-2 w-full max-w-[80%]">
                {msg.citations.map(c => <CitationCard key={c.id} citation={c} />)}
              </div>
            )}
          </div>
        ))}
        {loading && <div className="text-gray-500 italic">MediGuide AI is analyzing...</div>}
      </div>
      <div className="p-4 border-t bg-gray-50 flex gap-2">
        <input 
          type="text"
          className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Describe patient symptoms..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
