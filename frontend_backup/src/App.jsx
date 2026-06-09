import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">MediGuide AI</h1>
        <p className="text-sm opacity-80">Global Clinical Decision Support Agent</p>
      </header>
      <main className="flex-grow container mx-auto p-4 flex">
        <ChatWindow />
      </main>
    </div>
  );
}

export default App;
