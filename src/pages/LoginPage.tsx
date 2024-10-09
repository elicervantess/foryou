import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import GoogleAuth from "../components/GoogleAuth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log("Login successful:", response);
      navigate("/home", { state: { message: "Ingreso correctamente" } });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 text-gray-200">
      <div className="bg-gray-900 bg-opacity-75 p-8 rounded-lg shadow-2xl w-full max-w-md text-center transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-yellow-500 mb-6">
          Login With ExploreConnect
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-left">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition duration-300 text-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-left">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition duration-300 text-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-400 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <GoogleAuth />
        </div>
        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-yellow-500 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
