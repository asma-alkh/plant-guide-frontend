import { Link } from "react-router-dom";
import bgImage from "../assets/bgImage/plant5.jpg";

export default function Landing() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-14 w-[90%] md:w-[700px] lg:w-[850px] text-center border border-white/20">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-green-50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          🌿 Plant Guide
        </h1>

        <p className="text-xl md:text-2xl text-green-100 mb-10 max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          Discover how to care for your plants and make your home greener.
        </p>

        <div className="flex gap-6 justify-center">
          <Link
            to="/login"
            className="bg-[#B0CE88] text-white px-10 py-4 rounded-full text-lg font-semibold tracking-wide hover:bg-[#5EA426] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="bg-white text-[#6FB52E] px-10 py-4 rounded-full text-lg font-semibold border-2 border-[#6FB52E] hover:bg-[#6FB52E] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
