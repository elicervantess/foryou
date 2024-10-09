import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import GoogleAuth from "../components/GoogleAuth";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [hasPlace, setHasPlace] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const role = hasPlace ? "OWNER" : "USER";
    try {
      const response = await register(email, name, password, hasPlace);
      console.log("Register successful:", response);
      navigate("/home");
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Do you have a place to publish?
            </label>
            <input
              type="checkbox"
              className="mt-1"
              checked={hasPlace}
              onChange={(e) => setHasPlace(e.target.checked)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded mt-4 transition-transform transform hover:scale-105 hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <div className="mt-4">
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
