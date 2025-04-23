import React, { useState, useRef, useEffect } from 'react';
import { HiPaperAirplane, HiChevronLeft, HiOutlineThumbUp, HiOutlineThumbDown, HiOutlineChatAlt } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AiAgent = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! I'm your AI assistant. How can I help you today?", 
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    
    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      // Add AI response
      const aiMessage = {
        id: messages.length + 2,
        text: generateResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Simple response generator - replace with actual AI logic later
  const generateResponse = (userInput) => {
    const responses = [
      "That's an interesting question. Let me think about that.",
      "I understand what you're asking. Here's what I think...",
      "Based on my knowledge, I'd approach this by...",
      "Great question! The answer depends on several factors...",
      "I'd be happy to help with that. Let's break this down..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
            <HiChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-600 rounded-full opacity-75"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full -ml-1"></div>
          <span className="text-lg font-medium ml-1">AI Chat</span>
        </div>
        <div className="w-24"></div> {/* Spacer for balance */}
      </header>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 shadow-md rounded-tl-none'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.sender === 'ai' ? (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full opacity-75"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full -ml-1"></div>
                    <span className="text-xs font-medium">AI</span>
                  </div>
                ) : (
                  <span className="text-xs font-medium">You</span>
                )}
                <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
              </div>
              <p className="whitespace-pre-wrap">{message.text}</p>
              
              {/* Feedback buttons for AI messages only */}
              {message.sender === 'ai' && (
                <div className="flex justify-end gap-2 mt-2">
                  <button className="text-gray-500 hover:text-blue-600 p-1 rounded-full transition-colors">
                    <HiOutlineThumbUp className="w-4 h-4" />
                  </button>
                  <button className="text-gray-500 hover:text-red-600 p-1 rounded-full transition-colors">
                    <HiOutlineThumbDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {/* AI typing indicator */}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none p-4 shadow-md max-w-[80%]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full opacity-75"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full -ml-1"></div>
                <span className="text-xs font-medium">AI</span>
                <span className="text-xs opacity-70">{formatTime(new Date())}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Empty div for scroll reference */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-4xl mx-auto">
          <div className="flex-1 bg-gray-100 rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
            <textarea
              className="w-full px-4 py-3 bg-transparent outline-none resize-none min-h-[48px] max-h-40"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              rows={1}
            />
          </div>
          <button 
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            disabled={!inputMessage.trim()}
          >
            <HiPaperAirplane className="w-5 h-5" />
          </button>
        </form>
        
        <div className="text-xs text-gray-500 text-center mt-2">
          Press Enter to send, Shift+Enter for a new line
        </div>
      </div>
    </div>
  );
};

export default AiAgent;