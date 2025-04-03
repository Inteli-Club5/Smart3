import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import programacaoImg from './images/programacao.png';
import blockchainImg from './images/blockas.png';
import businessImg from './images/business.png';
import lock from './images/Lock.png';

class Track extends Component {
    render() {
        return (
            <div className="track-container">
                <h1 className="track-title">What do you want to <strong className='gradient'>Learn</strong>?</h1>
                <div className="cards-container">
                    <div className="card">
                        <div className='meioCard'>
                            <img src={programacaoImg} alt="AI" className="card-image" />
                        </div>
                        <p className="titulo2">AI</p>
                        <p className='textT'>Master Artificial Intelligence, learn to develop machine learning models, build AI-powered applications, and explore the future of intelligent automation!</p>
                        <Link to="/track">
                            <button className='buttonEscolha'><img class="pequenino" src={lock}/></button>
                        </Link>
                    </div>
                    <div className="card">
                        <div className='meioCard2'>
                            <img src={blockchainImg} alt="Blockchain" className="card-image" />
                        </div>
                        <p className="titulo2">Blockchain</p>
                        <p className='textT'>Master blockchain and Web3, learn to create smart contracts, build dApps, and explore the world of decentralization!</p>
                        <Link to="/home">
                            <button className='buttonEscolha'>Join</button>
                        </Link>
                    </div>
                    <div className="card">
                        <div className='meioCard3'>
                            <img src={businessImg} alt="Business" className="card-image" />
                        </div>
                        <p className="titulo2">Business</p>
                        <p className='textT'>Master Business and Innovation, learn to create scalable strategies, build successful enterprises, and navigate the ever-evolving world of entrepreneurship!</p>
                        <Link to="/track">
                            <button className='buttonEscolha'><img class="pequenino" src={lock}/></button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default Track;