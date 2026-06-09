import React from 'react';

export default function ReasoningSteps({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-2 w-full max-w-[80%] bg-blue-50 border border-blue-100 rounded p-3 text-sm text-gray-700">
      <div className="font-semibold text-blue-800 mb-2 flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
        AI Reasoning Steps
      </div>
      <ul className="list-disc pl-5 space-y-1">
        {steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
