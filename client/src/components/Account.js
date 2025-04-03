import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/Logo-1.png';
import profile from './images/profile.png';
import certificado from './images/certificado.png';


const ModalCertificado = ({ isOpen, onClose, certificado }) => {
    if (!isOpen) return null;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = certificado;
        link.download = 'certificado.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={certificado} className="track-icon-2" alt="Certificate" />
                <p className="access-link access-2">ICP</p>
                <button className="close-button" onClick={onClose}>&times;</button>
                <button className="start-button" onClick={handleDownload}>Download</button>
            </div>
        </div>
    );
};

const Account = () => {
    const [modalCertificadoOpen, setModalCertificadoOpen] = useState(false);

    return (
        <div className='perfil-geral'>
            <div className="menu-container">
                <div className="logo-container">
                    <Link to="/home">
                        <img src={logo} alt="Logo" className="logo" />
                    </Link>
                </div>
                <div className="profile-container">
                    <Link to="/account">
                        <img src={profile} alt="Account" className="profile-image" />
                    </Link>
                </div>
            </div>
            <div className="content-container">
                <h1 className="title">Certificates</h1>
                <hr className="horizontal-line" />
                <div className="tracks-container">
                    <div className="track-card" onClick={() => setModalCertificadoOpen(true)}>
                        <img src={certificado} className="track-icon-2" alt="Certificado" />
                        <br />
                        <p className="track-name">Certificate</p>
                        <p className="access-link access-2">ICP</p>
                    </div>
                </div>
            </div>
            <div className="content-container">
                <h1 className="title">Account</h1>
                <hr className="horizontal-line" />
                <div className='content-perfil'>
                    <div className="profile-detail"><strong>Name:</strong> Mateus Costa </div>
                    <div className="profile-detail"><strong>Email:</strong> mateus.costa@outlook.com</div>
                    <div className="profile-detail"><strong>Birth Date:</strong> 05/08/1998 </div>
                    <div className="profile-detail"><strong>Public Key:</strong> 39d522449de73c7a09e493d7fd0197f7b8e0108c60945e68cb317d689f75fbf2</div>
                </div>
                <div className="logout-container">
                    <Link to='/'>
                        <button>Exit</button>
                    </Link>
                </div>
            </div>
            <ModalCertificado isOpen={modalCertificadoOpen} certificado={certificado} onClose={() => setModalCertificadoOpen(false)} />
        </div>
    );
};

export default Account;