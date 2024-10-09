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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 text-gray-200">
      <div className="bg-gray-900 bg-opacity-75 p-8 rounded-lg shadow-2xl w-full max-w-md text-center transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-yellow-500 mb-6">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-left">Name</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition duration-300 text-gray-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="flex items-center text-gray-400">
            <input
              type="checkbox"
              className="mr-2 form-checkbox bg-gray-700 border-gray-600 rounded text-yellow-500 focus:ring-0"
              checked={hasPlace}
              onChange={(e) => setHasPlace(e.target.checked)}
            />
            <label>Do you have a place to publish?</label>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-400 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Register
          </button>
        </form>
        <div className="mt-4">
          <GoogleAuth />
        </div>
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
