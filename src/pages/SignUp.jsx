import { useState } from "react";
import axios from "axios";
import API_URL from "../api/config";
import bgImage from "../assets/bgImage/plant5.jpg";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/signup/`, formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
      >
        <h2 className="text-3xl font-bold text-green-50 mb-6 drop-shadow-md">
          Create Account
        </h2>

        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          className="border border-green-200 bg-white/20 text-white placeholder-green-100 w-full p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          className="border border-green-200 bg-white/20 text-white placeholder-green-100 w-full p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className="border border-green-200 bg-white/20 text-white placeholder-green-100 w-full p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <button className="bg-[#4C763B] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#3b5e2f] transition duration-300 shadow-md hover:shadow-lg">
          Sign Up
        </button>
        {message && (
          <p className="mt-4 text-green-100 font-medium drop-shadow-sm">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
