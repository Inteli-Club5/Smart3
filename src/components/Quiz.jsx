import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/logo-1.png';
import profile from './images/profile.png';
import icp from './images/icp.png';

const questions = [
    {
        question: "Which blockchain layer is responsible for enabling different networks to connect?",
        options: ["L0", "L1", "L2", "Dapp"],
        answer: "L0"
    },
    {
        question: "How does the Internet Computer achieve scalability without relying on Layer 2 solutions?",
        options: [
            "By using external sidechains",
            "Through sharding with rollups",
            "By adding new subnets that run smart contracts directly",
            "By reducing the number of transactions per block"
        ],
        answer: "By adding new subnets that run smart contracts directly"
    },
    {
        question: "Which layer of the Internet Computer runs smart contracts called canisters?",
        options: ["L0", "L1", "L2", "App Layer"],
        answer: "L1"
    },
    {
        question: "How do users access applications on the Internet Computer?",
        options: [
            "Through mobile apps",
            "Via browser with no centralized servers",
            "Using dedicated validator nodes",
            "Through the Bitcoin network"
        ],
        answer: "Via browser with no centralized servers"
    },
    {
        question: "In the Internet Computer architecture, what are canisters?",
        options: [
            "Governance tokens",
            "Validator nodes",
            "Advanced smart contracts that store logic and data",
            "Digital wallets for ICP"
        ],
        answer: "Advanced smart contracts that store logic and data"
    }
];


function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60); // Inicia com 60 segundos

    const question = questions[currentQuestionIndex];
    const navigate = useNavigate();  // Usando o hook useNavigate

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer); // Limpa o timer quando o componente for desmontado
        } else {
            // Avança para a próxima pergunta quando o tempo acabar
            setTimeout(() => {
                handleNextQuestion();
            }, 1000);
        }
    }, [timeLeft]);

    const handleAnswerClick = (option) => {
        setSelectedAnswer(option);
        if (option === question.answer) {
            setIsAnswerCorrect(true);
        } else {
            setIsAnswerCorrect(false);
        }

        setTimeout(() => {
            handleNextQuestion();
        }, 1000);
    };


    const handleNextQuestion = () => {
        setIsAnswerCorrect(null);
        setSelectedAnswer(null);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(60);
        } else {
            navigate('/account');
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
            <div className="quiz-container2">
                <div className="timer white" style={{ fontSize: '20px' }}>
                    {timeLeft} seconds
                </div>
                <img src={icp} className="track-icon-3" />
                <div className="question-container">
                    <h2 className='tituloQuestion white'>{question.question}</h2>
                </div>

                <div className="score">
                    <p className='white'>Question {currentQuestionIndex + 1} of {questions.length}</p>
                </div>

                <div className="options-container">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            className={`option-button ${selectedAnswer === option ? (isAnswerCorrect ? 'correct' : 'incorrect') : ''}`}
                            onClick={() => handleAnswerClick(option)}
                            disabled={selectedAnswer !== null}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Quiz;