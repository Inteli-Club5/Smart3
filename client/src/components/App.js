import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import CriarConta from './CriarConta';
import Track from './Track';
import Home from './Home';
import Payment from './Payment';

class App extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/create-account" element={<CriarConta />} />
                    <Route path="/track" element={<Track />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="signature" element={<Payment />} />
                </Routes>
            </div>
        );
    }
}

export default App;