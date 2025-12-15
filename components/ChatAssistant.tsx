import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";
import { COMPANY_INFO, SERVICES } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Hi! I'm your Lawn Love assistant. How can I help you with your lawn today?` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const initChat = () => {
    if (!chatSessionRef.current) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const servicesList = SERVICES.map(s => `• ${s.title}: ${s.description}`).join('\n');
        
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: `You are a helpful, friendly, and professional AI assistant for Lawn Love, a lawn care business in Newark, NJ.
            
            Company Info:
            Name: ${COMPANY_INFO.name}
            Location: ${COMPANY_INFO.location}
            Phone: ${COMPANY_INFO.phone}
            Email: ${COMPANY_INFO.email}
            Address: ${COMPANY_INFO.address}
            
            Services Offered:
            ${servicesList}
            
            Guidelines:
            1. Answer customer questions about lawn care, explain our services, and offer advice.
            2. Always be polite and professional.
            3. Keep responses concise (under 3-4 sentences when possible).
            4. If asked about pricing, state that we offer free customized estimates and encourage them to use the "Get a Free Estimate" button or form on the website. Do not give specific prices.
            5. If asked about scheduling, say we are flexible and reliable.
            6. Only answer questions related to lawn care, landscaping, and our business. politely decline other topics.
            `,
          }
        });
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      initChat();
    }
  }, [isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) initChat();
      
      if (chatSessionRef.current) {
        const response = await chatSessionRef.current.sendMessage({ message: userMessage });
        setMessages(prev => [...prev, { role: 'model', text: response.text }]);
      } else {
        throw new Error("Chat session not initialized");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try calling us at " + COMPANY_INFO.phone }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-50 right-4 md:right-8 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2 px-4 py-3 rounded-full font-bold
          ${isOpen 
            ? 'bottom-24 md:bottom-8 bg-brand-card border border-white/10 text-white' 
            : 'bottom-24 md:bottom-8 bg-brand-green text-brand-black hover:bg-brand-greenHover'
          }`}
      >
        {isOpen ? (
          <>
            <X className="w-6 h-6" />
            <span>Close Chat</span>
          </>
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span>Ask an Expert</span>
          </>
        )}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed z-50 right-4 md:right-8 bottom-40 md:bottom-24 w-[calc(100vw-2rem)] md:w-96 h-[500px] max-h-[calc(100vh-12rem)] bg-brand-card border border-brand-green/30 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden ${
          isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-brand-dark p-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6 text-brand-black" />
          </div>
          <div>
            <h3 className="font-bold text-white">Lawn Love Assistant</h3>
            <p className="text-xs text-brand-green flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Powered by Gemini
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-black/50">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                  msg.role === 'user' ? 'bg-gray-700' : 'bg-brand-green/20'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-brand-green" />}
              </div>
              <div 
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-brand-green text-brand-black font-medium rounded-tr-sm' 
                    : 'bg-white/10 text-gray-200 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-brand-green" />
              </div>
              <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-brand-green animate-spin" />
                <span className="text-xs text-gray-400">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 bg-brand-dark border-t border-white/10">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about lawn care..."
              className="w-full bg-brand-black border border-white/10 rounded-full pl-4 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-green text-brand-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-greenHover transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};