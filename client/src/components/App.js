import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import CriarConta from './CriarConta';

class App extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/create-account" element={<CriarConta />} />
                </Routes>
            </div>
        );
    }
}

export default App;