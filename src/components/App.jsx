import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Track from './Track';
import Home from './Home';
import Account from './Account';
import Payment from './Payment';
import Lesson from './Lesson';
import Quiz from './Quiz';
import AI from './Ai';

class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/track" element={<Track />} />
                        <Route path="/signature" element={<Payment />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/lessons" element={<Lesson />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/ai" element={<AI />} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;