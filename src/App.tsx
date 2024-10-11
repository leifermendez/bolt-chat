import React, { useState } from 'react';
import { MessageCircle, Send, X, ChevronDown } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-400 to-green-500 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              <MessageCircle className="text-white" size={20} />
            </div>
            <h1 className="text-white text-xl font-semibold">AI Assist</h1>
          </div>
          <button className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition duration-300">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 h-96 overflow-y-auto bg-gradient-to-b from-green-50 to-white">
          <div className="mb-8">
            <p className="text-gray-600 text-center text-lg">What do you want to know about James?</p>
          </div>
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className="bg-white rounded-2xl p-3 shadow-sm text-sm max-w-[80%] ml-auto">
                {msg}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-white">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-grow p-2 bg-transparent focus:outline-none text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button className="text-green-500 text-sm font-medium flex items-center space-x-1 hover:text-green-600 transition duration-300">
              <span>Topics</span>
              <ChevronDown size={16} />
            </button>
            <div className="space-x-2">
              <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-gray-50 transition duration-300">
                Generate Summary
              </button>
              <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-gray-50 transition duration-300">
                Are they a good fit for my job post?
              </button>
              <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-gray-50 transition duration-300">
                What is their training style?
              </button>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-600 transition duration-300">
              Show more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;