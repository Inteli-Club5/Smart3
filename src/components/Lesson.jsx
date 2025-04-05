import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/logo-1.png';
import profile from './images/profile.png';

const lessons = [
    {
        title: "Exploring the Blockchain Pyramid",
        content: "Imagine you're climbing a mountain. At each layer you reach, you gain a new view and perspective on how the blockchain world works. The solid base, the challenging middle, the fast trails, the stunning views... each of these layers plays a crucial role in the blockchain ecosystem. Let’s explore how they connect — and how the Internet Computer fits into this landscape!",
    },
    {
        title: "What Are Blockchain Layers?",
        content: "Blockchain layers are different operational levels that help solve issues like scalability, cost, and speed. They work together to create a more efficient network where transactions and smart contracts can run securely and effectively.",
    },
    {
        title: "Layer 0 (L0): The Interoperability Foundation",
        content: "Layer 0 provides the infrastructure that connects different blockchains. Protocols like Cosmos and Polkadot allow cross-chain communication, building an interconnected ecosystem. The Internet Computer also offers its own unique approach by enabling native canister-to-canister communication across subnets.",
    },
    {
        title: "Layer 1 (L1): The Core Blockchain Protocol",
        content: "L1 is the heart of a blockchain — like Bitcoin, Ethereum, or the Internet Computer. On the Internet Computer, this layer is powered by a decentralized network of nodes run by independent data centers, enabling smart contracts (called canisters) to run directly on-chain with web-speed performance and low cost.",
    },
    {
        title: "Layer 2 (L2): Scaling Beyond the Base Layer",
        content: "While many blockchains rely on Layer 2 solutions to scale, the Internet Computer takes a different route — it scales natively at the protocol level. Instead of needing external rollups or sidechains, ICP introduces seamless scalability by adding new subnets, each capable of running smart contracts and dapps directly.",
    },
    {
        title: "Layer 3 (L3): Decentralized Applications (DApps)",
        content: "On the Internet Computer, DApps are built using canisters — advanced smart contracts that run at web speed and can serve front-end and back-end from the same environment. These dapps range from DeFi protocols and social networks to enterprise software and games.",
    },
    {
        title: "Application Layer: The User Experience",
        content: "This is where users interact with blockchain-based products — like wallets, social media platforms, or finance tools. On the Internet Computer, users can access dapps directly from the browser with no need for centralized servers, offering a seamless and fully decentralized web experience.",
    }
];

const Lesson = () => {

    const [currentLesson, setCurrentLesson] = useState(0);
    const navigate = useNavigate();

    const nextLesson = () => {
        if (currentLesson < lessons.length - 1) {
            setCurrentLesson(currentLesson + 1);
        } else {
            navigate("/quiz"); 
        }
    };
    const prevLesson = () => {
        if (currentLesson > 0) {
            setCurrentLesson(currentLesson - 1);
        }
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
                <div className="div-center">
                <div className="video-container">
                    <iframe
                        width="100%"
                        height="400px"
                        src="https://www.youtube.com/embed/watch?v=M2XnywvwxFM"
                        title="Video Player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="lessons-card">
                    <h1 className="titulo1">{lessons[currentLesson].title}</h1>
                    <p className="textT2">{lessons[currentLesson].content}</p>
                    <div className="div-buttonsL">
                        <button className="prev-button" onClick={prevLesson} disabled={currentLesson === 0}>Return</button>
                        <button className="next-button" onClick={nextLesson}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lesson;