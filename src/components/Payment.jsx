import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/Logo-1.png';
import profile from './images/profile.png';
import pix from './images/pix.png';
import onchain from './images/onchain.png';

class Payment extends Component {

    connectPlugAndPay = async () => {
        if (!window.ic || !window.ic.plug) {
            alert("Plug Wallet not found. Please install it to continue.");
            return;
        }

        try {
            // Connect to Plug Wallet
            const connected = await window.ic.plug.requestConnect({
                whitelist: [],
                host: "https://icp0.io" // Testnet host
            });

            if (!connected) {
                alert("Failed to connect to Plug Wallet.");
                return;
            }

            // Get the user's principal ID
            const principal = await window.ic.plug.agent.getPrincipal();
            console.log("Connected with account:", principal.toText());

            const icpAmount = 3.90 * 1e8; // Amount in e8s (ICP's smallest unit)

            // Destination address (Testnet address example)
            const toAddress = "39d522449de73c7a09e493d7fd0197f7b8e0108c60945e68cb317d689f75fbf2";

            // Execute the transaction with lower fee
            const result = await window.ic.plug.requestTransfer({
                to: toAddress,
                amount: icpAmount,
                host: "https://icp0.io", // Ensure it's using the testnet
                fee: 10_000, // Set a low fee (10,000 e8s ≈ 0.0001 ICP)
            });

            console.log("Transaction sent! Details:", result);

            if (result && result.height) {
                window.location.href = "/home";
            } else {
                alert("Transaction failed.");
            }
        } catch (error) {
            console.error("Error connecting or processing transaction:", error);
            alert("Error processing the transaction.");
        }
    };

    render() {
        return (
            <div className='containerHomeAss'>
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
                <div className="content-container">
                    <h1 className="title">Checkout</h1>
                    <hr className="horizontal-line2" />
                    <div className="cards-container2">
                        <div className="card">
                            <div className='meioCard5'>
                                <img src={onchain} alt="Programação" className="card-image" />
                            </div>
                            <p className='textT'>Onchain</p>
                            <p className="titulo6">ICP 3.90</p>
                            <Link onClick={this.connectPlugAndPay}>
                                <button className='buttonEscolha'>Buy</button>
                            </Link>
                        </div>

                        <div className="card">
                            <div className='meioCard4 meioCard3'>
                                <img src={pix} alt="Finanças" className="card-image" />
                            </div>
                            <p className='textT'>Traditional</p>
                            <p className="titulo6">$ 20.00</p>
                            <Link>
                                <button className='buttonEscolha2'>Coming soon</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Payment;