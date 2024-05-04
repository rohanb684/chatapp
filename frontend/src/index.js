import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './context/AccountContext';

const clientId = '932468813005-bk7gou9bs64t8moas6ggr72i2h9jr5qs.apps.googleusercontent.com';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
     <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
    <App />
    </AccountProvider>
    </GoogleOAuthProvider>
    </>
  
);

