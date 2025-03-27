// CriarConta.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Routes, Route, Link } from 'react-router-dom';

const CriarConta = () => {
    const [nome, setNome] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erroMensagem, setErroMensagem] = useState('');
    const [emailValido, setEmailValido] = useState(true);
    const [senhaValida, setSenhaValida] = useState(true);
    const [nomeValido, setNomeValido] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const validarNome = (nome) => {
        return nome.trim() !== '';
    };

    const validarEmail = (email) => {
        return email.length > 0;
    };

    const validarSenha = (senha) => {
        return senha.length > 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const emailValido = validarEmail(email);
        const senhaValida = validarSenha(senha);
        const nomeValido = validarNome(nome);

        if (!nomeValido) {
            alert('Invalid Name!');
            setErroMensagem('Invalid Name!');
        } else if (!emailValido) {
            alert('Email cannot be empty!');
            setErroMensagem('Email cannot be empty!');
        } else if (!senhaValida) {
            alert('The password cannot be empty!');
            setErroMensagem('The password cannot be empty!');
        } else {
            setErroMensagem('');
            navigate("/escolha");  // Após o cadastro, redireciona para a página de escolha
        }

        setEmailValido(emailValido);
        setSenhaValida(senhaValida);
        setNomeValido(nomeValido);
    };

    return (
        <div className='containerReg'>
            <div className='metadeReg'>
                <div className='cadastroMeio'>
                    <h2 className='titulo1'>Create your <strong className='pink'>Account</strong></h2>
                    <div className='container-caixadetexto'>
                        <div className='content-titulo'>
                            <h7 className='textforbox'>Full Name</h7>
                        </div>
                        <input
                            className='caixadetexto'
                            type='text'
                            name='nome'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <div className='content-titulo'>
                            <h7 className='textforbox'>Birth Date</h7>
                        </div>
                        <input
                            className='caixadetexto'
                            type='date'
                            name='nascimento'
                            value={nascimento}
                            onChange={(e) => setNascimento(e.target.value)}
                        />
                        <div className='content-titulo'>
                            <h7 className='textforbox'>Email</h7>
                        </div>
                        <input
                            className='caixadetexto'
                            type='text'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className='content-titulo'>
                            <h7 className='textforbox'>Password</h7>
                        </div>
                        <input
                            className='caixadetexto'
                            type='password'
                            name='senha'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        
                        <div className='content-titulo'>
                            <h7 className='textforbox'>Confirm Password</h7>
                        </div>
                        <input
                            className='caixadetexto'
                            type='password'
                            name='confirmarSenha'
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />
                        <Link className='textzin' to="/">Already has an Account</Link>
                    </div>
                    <div className='container-botoes'>
                        <button className='botao-login botao-login2' onClick={handleSubmit}>Create</button>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CriarConta;