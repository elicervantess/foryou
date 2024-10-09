import React from 'react';
import Navbar from '../components/NavBar';
import RegisterForm from '../components/RegisterForm';
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  return (
    <div className="register-page">
      <Navbar />
      <div className="register-page-content">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
