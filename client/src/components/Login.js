import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();  // Usando o hook useNavigate corretamente

    // Função para verificar se os campos de email e senha não estão vazios
    const validarCampos = () => {
        if (!email || !senha) {
            alert('Please, fill with email and password!');
            return false;  // Retorna falso se algum dos campos estiver vazio
        }
        return true;  // Retorna verdadeiro se ambos os campos tiverem valor
    };

    // Função chamada quando o botão "Entrar" é pressionado
    const handleSubmit = (event) => {
        event.preventDefault();

        // Valida os campos antes de tentar o login
        if (validarCampos()) {
            navigate("/track");  // Navega para a próxima página após login
        }
    };


    return (
        <div className='containerLog'>
            <div className='metade'>
                <div className='loginMeio'>
                    <div className='ajusteMeio'>
                        <div className='content-titulo'>
                            <h2 className='titulo1'>Login</h2>
                        </div>
                        <div className='container-caixadetexto'>
                            <div className='content-titulo'>
                                <h5 className='textforbox'>Email</h5>
                            </div>
                            <input
                                className='caixadetexto'
                                type='text'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  // Atualiza o estado de email
                            />
                            <div className='content-titulo'>
                                <h5 className='textforbox'>Password</h5>
                            </div>
                            <input
                                className='caixadetexto'
                                type='password'
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}  // Atualiza o estado de senha
                            />
                        </div>
                        <div className='container-botoes'>
                            <Link>
                            <button className='botao-login' onClick={handleSubmit}>Enter</button>
                            </Link>
                            <Link to="/create-account">
                                <button className='botao-login botao-login2'>Create</button>
                            </Link>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;