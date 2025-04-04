import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const navigate = useNavigate();
    const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();

    // Redirect to track page if already authenticated
    React.useEffect(() => {
        if (isAuthenticated && user) {
            navigate("/track");
        }
    }, [isAuthenticated, user, navigate]);

    // Handle Auth0 login
    const handleAuth0Login = () => {
        loginWithRedirect();
    };

    if (isLoading) {
        return <div className="containerLog">
            <div className="metade">
                <div className="loginMeio">
                    <div className="ajusteMeio">
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        </div>;
    }

    return (
        <div className='containerLog'>
            <div className='metade'>
                <div className='loginMeio'>
                    <div className='ajusteMeio'>
                        <div className='content-titulo'>
                            <h2 className='titulo1'>Login</h2>
                        </div>
                        <div className='container-botoes'>
                            <button className='botao-login' onClick={handleAuth0Login}>
                                Login
                            </button>
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