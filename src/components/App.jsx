import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Track from './Track';
import Home from './Home';
import Account from './Account';
import Payment from './Payment';

class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />
                        <Route path="/track" element={
                            <ProtectedRoute>
                                <Track />
                            </ProtectedRoute>
                        } />
                        <Route path="/signature" element={
                            <ProtectedRoute>
                                <Payment />
                            </ProtectedRoute>
                        } />
                        <Route path="/account" element={
                            <ProtectedRoute>
                                <Account />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;