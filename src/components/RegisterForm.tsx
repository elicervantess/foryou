import React, { useState } from 'react';
import { register } from '../api';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [hasPlace, setHasPlace] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register(email, name, password, hasPlace);
      console.log("Registration successful:", response);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="register-input"
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <div className="role-selection">
          <input
            type="checkbox"
            checked={hasPlace}
            onChange={(e) => setHasPlace(e.target.checked)}
            className="role-checkbox"
          />
          <label className="role-label">Do you have a place to publish?</label>
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
