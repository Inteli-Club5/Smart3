import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import './index.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

const domainAuth0 = import.meta.env.VITE_AUTH0_DOMAIN;
const clientIdAuth0 = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audienceAuth0 = import.meta.env.VITE_AUTH0_AUDIENCE;

root.render(
  <Auth0Provider
    domain={domainAuth0}
    clientId={clientIdAuth0}
    audience={audienceAuth0}
    authorizationParams={{
      redirect_uri: window.location.origin,
      scope: "openid profile email"
    }}
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>
);