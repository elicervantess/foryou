import React from 'react';
import Navbar from '../components/NavBar';
import LoginForm from '../components/LoginForm';
import '../styles/LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <Navbar />
      <div className="login-page-content">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
