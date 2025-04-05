import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { askGpt, resetConversation } from '../ai/aiModule';
import logo from './images/logo-1.png';
import profile from './images/profile.png';

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
            // Get AI response
            const aiResponse = await askGpt(userMessage, userId);
            
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
                            {msg.content}
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
                    />
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
            <br />
        </div>
    );
}

export default AI;