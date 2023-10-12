import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/PupilContext';
import { LoginProvider } from './context/loginContext';
import { DecodeProvider } from './context/DecodeContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <LoginProvider>
    <DecodeProvider>
      <AuthProvider>
      <App/>
      </AuthProvider>
    </DecodeProvider>
    </LoginProvider>
  </Router>
);

