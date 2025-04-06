import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/Logo-1.png';
import profile from './images/profile.png';
import blockchain from './images/blockchain.png';
import chainlink from './images/chainlink.png';
import bitcoin from './images/bitcoin.png';
import icp from './images/icp.png';
import ethereum from './images/ethereum.png';
import scroll from './images/scroll.png';

const trackDescriptions = {
    "Blockchain": "Blockchain is a distributed ledger technology that ensures security and transparency in digital transactions.",
    "Chainlink": "Chainlink is a decentralized oracle network that connects smart contracts to real-world data.",
    "Bitcoin": "Bitcoin is the first decentralized cryptocurrency, designed to be a secure and intermediary-free digital medium of exchange.",
    "ICP": "ICP uses subnet technology to process transactions off the main chain, ensuring scalability and low cost.",
    "Ethereum": "Ethereum is a blockchain platform that enables the creation of smart contracts and decentralized applications.",
    "Scroll": "Scroll is a scalability solution for Ethereum based on Zero-Knowledge Rollups, enabling fast and cost-efficient transactions."
};

const Modal = ({ isOpen, onClose, title, trackImage, description }) => {
    if (!isOpen) return null;

    const isICPTrack = title.trim() === "ICP";

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={trackImage} className="track-icon-2" alt={title} />
                <h2>{title}</h2>
                <p className='texto'>{description}</p>
                <Link to={isICPTrack ? '/lessons' : '/signature'}>
                    <button className={isICPTrack ? "start-button" : "assine-button"}>{isICPTrack ? "Access" : "Sign"}</button>
                </Link>
                <button className="close-button" onClick={onClose}>&times;</button>
            </div>
        </div>
    );
};

const Home = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState("");
    const [trackImage, setTrackImage] = useState(null);
    const [trackDescription, setTrackDescription] = useState("");

    const openModal = (trackName, trackImage) => {
        setSelectedTrack(trackName);
        setTrackImage(trackImage);
        setTrackDescription(trackDescriptions[trackName] || "Description not avaliable");
        setModalOpen(true);
    };

    const programmingTracks = [
        { name: "ICP", image: icp, width: 20 },
        { name: "Blockchain", image: blockchain, width: 0 },
        { name: "Chainlink", image: chainlink, width: 0 },
        { name: "Bitcoin", image: bitcoin, width: 0 },
        { name: "Ethereum", image: ethereum, width: 0 },
        { name: "Scroll", image: scroll, width: 0 }
    ];

    const tracks = programmingTracks;

    return (
        <div className='containerHomeG'>
            <div className="menu-container">
                <div className="logo-container">
                    <Link to="/home">
                        <img src={logo} alt="Logo" className="logo" />
                    </Link>
                </div>
                <center>
                    <div className="logo-container2">
                        <Link className="no-effect" to="/track">
                            <h1 className='titulo4 selecionado'>Tracks</h1>
                        </Link>
                        <Link className="no-effect" to="/ai">
                            <h1 className='titulo4'>AI</h1>
                        </Link>
                    </div>
                </center>
                <div className="profile-container">
                    <Link to="/account">
                        <img src={profile} alt="Conta" className="profile-image" />
                    </Link>
                </div>
            </div>
            <div className="content-container">
                <h1 className="title">Blockchain</h1>
                <hr className="horizontal-line" />
                <div className="tracks-container">
                    {tracks.map((track, index) => (
                        <div key={index} className="track-card" onClick={() => openModal(track.name, track.image)}>
                            <img src={track.image} className="track-icon" alt={track.name} />
                            <p className="track-name">{track.name}</p>
                            <p className={track.name === "ICP" ? "access-link access" : "access-link hire"}>{track.name === "ICP" ? "Access" : "Sign"}</p>
                            <div className="progress-bar-container">
                                <div className="progress-bar" style={{ width: `${track.width}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={selectedTrack} trackImage={trackImage} description={trackDescription} />
        </div>
    );
};

export default Home;