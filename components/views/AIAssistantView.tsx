
import React, { useState, useRef, useEffect } from 'react';
import { streamAIResponse } from '../../services/geminiService';
import type { ChatMessage } from '../../types';
import MarkdownRenderer from '../MarkdownRenderer';

const UserMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex justify-end mb-4">
        <div className="bg-primary text-white rounded-lg py-2 px-4 max-w-lg">
            {message}
        </div>
    </div>
);

const ModelMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex justify-start mb-4">
        <div className="bg-gray-200 text-gray-800 rounded-lg py-2 px-4 max-w-lg">
            <MarkdownRenderer content={message} />
        </div>
    </div>
);


export const AIAssistantView: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    useEffect(() => {
        // Initial welcome message
        setMessages([
          {
            id: 'init-1',
            role: 'model',
            parts: [{text: 'Hello! I am your AI Study Assistant. How can I help you prepare for your exams today?'}]
          }
        ]);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const newUserMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            parts: [{ text: input }],
        };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await streamAIResponse(input);
            
            let currentModelMessage: ChatMessage = {
                id: `model-${Date.now()}`,
                role: 'model',
                parts: [{ text: '' }],
            };
            setMessages(prev => [...prev, currentModelMessage]);

            for await (const chunk of stream) {
                const chunkText = chunk.text;
                currentModelMessage.parts[0].text += chunkText;
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage.id === currentModelMessage.id) {
                        lastMessage.parts[0].text = currentModelMessage.parts[0].text;
                    }
                    return newMessages;
                });
            }

        } catch (error) {
            console.error(error);
            const errorMessage: ChatMessage = {
                id: `error-${Date.now()}`,
                role: 'model',
                parts: [{ text: 'Sorry, I encountered an error. Please try again.' }],
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] bg-white rounded-xl shadow-md">
            <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
                {messages.map((msg) =>
                    msg.role === 'user' ? (
                        <UserMessage key={msg.id} message={msg.parts[0].text} />
                    ) : (
                        <ModelMessage key={msg.id} message={msg.parts[0].text} />
                    )
                )}
                 {isLoading && messages[messages.length - 1]?.role !== 'model' && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-gray-200 rounded-lg p-4 max-w-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-75"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything about your subjects..."
                        className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-primary text-white rounded-full p-3 hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="m22 2-11 11"/></svg>
                    </button>
                </form>
            </div>
        </div>
    );
};
