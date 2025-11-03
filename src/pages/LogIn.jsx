import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ تأكدي إن useNavigate هنا
import axios from "axios";
import API_URL from "../api/config";
import bgImage from "../assets/bgImage/plant5.jpg";

export default function LogIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ لازم يكون هنا، قبل handleSubmit

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login/`, formData);
      setMessage(res.data.message);

      // ✅ حفظ التوكن
      localStorage.setItem("access_token", res.data.access_token);

      // ✅ تحويل المستخدم للصفحة الرئيسية
      navigate("/home");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Invalid username or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
      >
        <h2 className="text-3xl font-bold text-green-50 mb-6 drop-shadow-md">
          Welcome Back 🌿
        </h2>

        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
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
          Log In
        </button>

        {message && (
          <p className="mt-4 text-green-100 font-medium drop-shadow-sm">
            {message}
          </p>
        )}

        <p className="mt-6 text-green-100 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#B5E28C] font-semibold hover:text-white underline transition duration-200"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
