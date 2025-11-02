import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import bgImage from "../assets/bgImage/plant5.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login", { replace: true }); 
    } else {
      setCheckedAuth(true); 
    }
  }, [navigate]);

  if (!checkedAuth) {
    return null;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-[95%] max-w-[1400px] p-10 flex flex-col space-y-10">
        
        <nav className="flex justify-between items-center border-b border-white/20 pb-4">
          <div className="flex space-x-6 text-sm font-semibold tracking-wide">
            <a href="#" className="hover:text-green-200">ABOUT</a>
            <a href="#" className="hover:text-green-200">CONTACT</a>
          </div>
          <div className="flex space-x-4 text-lg">
            <FaSearch className="hover:text-green-300 cursor-pointer" />
            <FaHeart className="hover:text-green-300 cursor-pointer" />
          </div>
        </nav>
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="w-full md:w-1/2 bg-white/10 rounded-xl overflow-hidden shadow-lg">
            <img
              src={bgImage}
              alt="Plant example"
              className="object-cover w-full h-[400px] md:h-[500px] lg:h-[550px] lg:aspect-square opacity-90 hover:opacity-100 transition duration-500"
            />
          </div>
          <div className="w-full md:w-1/2 text-left">
            <h1 className="text-6xl font-extrabold mb-4 text-white drop-shadow-md">
              Plant Guide
            </h1>
            <h2 className="text-xl text-green-100 mb-3">
              Your guide to caring for your plants
            </h2>
            <p className="text-green-50 leading-relaxed mb-8 max-w-md">
              Discover the ideal soil, watering schedule, and sunlight requirements for each plant.  
              Whether you’re a beginner or a plant lover, <span className="font-semibold text-green-200">Plant Guide</span> helps you  
              create a greener and more vibrant space. Explore detailed info about indoor and outdoor plants, and keep track of your favorites easily.
            </p>

            <div className="flex gap-5">
              <button className="bg-[#4C763B] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3a5e2f] transition shadow-lg">
                Explore Plants
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
