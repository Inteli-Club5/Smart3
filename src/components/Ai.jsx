import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { askGpt, resetConversation } from '../ai/aiModule';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import logo from './images/Logo-1.png';
import profile from './images/profile.png';
import '../styles/Ai.css';

function AI() {
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Hi! How can I help you with your Web3 learning journey today?' }
    ]);
    
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { user, isAuthenticated } = useAuth0();
    const userId = user?.sub || 'anonymous-user';

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Reset conversation when component unmounts
    useEffect(() => {
        return () => {
            // Optional: save conversation before unmounting
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userMessage = inputMessage.trim();
        
        if (!userMessage) return;
        
        // Add user message to chat
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInputMessage('');
        setIsLoading(true);
        
        try {
            // Get AI response - without the provider parameter
            const aiResponse = await askGpt(userMessage, userId, {
                model: 'gpt-4o-mini',
                max_tokens: 500,
                temperature: 0.7
            });
            
            // Add AI response to chat
            setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
        } catch (error) {
            console.error('Error getting AI response:', error);
            setMessages(prev => [...prev, { 
                role: 'ai', 
                content: 'Sorry, I encountered an error. Please try again later.',
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        resetConversation(userId);
        setMessages([{ 
            role: 'ai', 
            content: 'Chat history has been reset. How can I help you today?' 
        }]);
    };

    return (
        <div className='containerHomeG'>
            <div className="menu-container">
                <div className="logo-container">
                    <Link to="/home">
                        <img src={logo} alt="Logo" className="logo" />
                    </Link>
                </div>
                <div className="profile-container">
                    <Link to="/account">
                        <img src={profile} alt="Conta" className="profile-image" />
                    </Link>
                </div>
            </div>
            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div 
                            key={index}
                            className={`message ${msg.role === 'user' ? 'user-message' : 'ai-message'} ${msg.isError ? 'error-message' : ''}`}
                        >
                            {msg.role === 'user' ? (
                                msg.content
                            ) : (
                                <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code({node, inline, className, children, ...props}) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    style={vscDarkPlus}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        }
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message ai-message typing-indicator">
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form className="chat-input-container" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..." 
                        className="chat-input" 
                        autoComplete="off" 
                        disabled={isLoading}
                    />
                    <button 
                        type="submit" 
                        className={`send-button ${isLoading ? 'disabled' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AI;