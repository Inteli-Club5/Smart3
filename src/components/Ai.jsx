import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/logo-1.png';
import profile from './images/profile.png';

function AI() {
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
                <div className="chat-messages" id="chat-messages">
                    <div className="message ai-message">Hi! How can I help you today?</div>
                </div>
                <form
                    className="chat-input-container"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const input = e.target.elements.userInput;
                        const message = input.value.trim();
                        if (message) {
                            const messageElement = document.createElement('div');
                            messageElement.className = 'message user-message';
                            messageElement.textContent = message;
                            document.getElementById('chat-messages').appendChild(messageElement);
                            input.value = '';

                            // 🧠 Replace this block with your AI response function
                            // Example: fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message }) })

                            setTimeout(() => {
                                const aiReply = document.createElement('div');
                                aiReply.className = 'message ai-message';
                                aiReply.textContent = "Got it! Let me think...";
                                document.getElementById('chat-messages').appendChild(aiReply);
                                document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
                            }, 1000);
                        }
                    }}
                >
                    <input type="text" name="userInput" placeholder="Type your message..." className="chat-input" autoComplete="off" />
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
            <br />
        </div>
    );
}

export default AI;