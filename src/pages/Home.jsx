import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import API_URL from "../api/config";
import bgImage from "../assets/bgImage/plant5.jpg";
import bgIndoor from "../assets/bgImage/indoor.jpg";
import bgOutdoor from "../assets/bgImage/outdoor.jpg";

export default function Home() {
  const navigate = useNavigate();
  const categoriesRef = useRef(null);
  const soilRef = useRef(null);
  const [soils, setSoils] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/login");

    axios
      .get(`${API_URL}/soils/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSoils(res.data))
      .catch(() => setError("❌ Failed to load soil types."));
  }, [navigate]);

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSoil = () => {
    soilRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-[95%] max-w-[1400px] mx-auto p-10 mt-10 flex flex-col space-y-10">
        {/* Navbar */}
        <nav className="flex justify-between items-center border-b border-white/20 pb-4">
          <div className="flex space-x-6 text-sm font-semibold tracking-wide">
            <button onClick={scrollToSoil} className="hover:text-green-200">
              SOILS
            </button>
            <a href="#" className="hover:text-green-200">
              CONTACT
            </a>
            <a href="#" className="hover:text-green-200">
              S
            </a>
          </div>
          <div className="flex space-x-4 text-lg">
            <FaHeart
              onClick={() => navigate("/favorites")}
              className="hover:text-green-300 cursor-pointer transition duration-300"
            />
          </div>
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="w-full md:w-1/2 bg-white/10 rounded-xl overflow-hidden shadow-lg">
            <img
              src={bgImage}
              alt="Plant example"
              className="object-cover w-full h-[400px] lg:aspect-square opacity-90 hover:opacity-100 transition duration-500"
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
              Discover the ideal soil, watering schedule, and sunlight
              requirements for each plant. Whether you’re a beginner or a plant
              lover,{" "}
              <span className="font-semibold text-green-200">Plant Guide</span>{" "}
              helps you create a greener and more vibrant space. Explore
              detailed info about indoor and outdoor plants, and keep track of
              your favorites easily.
            </p>

            <div className="flex gap-5">
              <button
                onClick={scrollToCategories}
                className="relative z-50 bg-[#4C763B] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3a5e2f] transition shadow-lg"
              >
                Explore Plants
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*(Categories Section) */}
      <section
        ref={categoriesRef}
        className="relative z-10 mt-20 bg-[#E8EEE7] py-20 text-center text-green-900 rounded-t-[3rem] shadow-inner"
      >
        <h1 className="text-4xl font-bold mb-12 flex justify-center items-center gap-3 text-[#2E4D3A]">
          <span className="text-4xl">🍀</span> Plant Categories
        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-10 px-6">
          {/*  Indoor Plants */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden w-full md:w-1/3 border border-green-100 hover:shadow-2xl transition">
            <img
              src={bgIndoor}
              alt="Indoor Plants"
              className="object-cover w-full h-64 hover:scale-105 transition duration-500"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-[#2E4D3A] mb-4">
                Indoor Plants
              </h2>
              <Link
                to="/indoor"
                className="inline-block bg-[#4C763B] text-white font-medium tracking-wide px-6 py-2 rounded-full hover:bg-[#3a5e2f] transition shadow-md hover:shadow-lg"
              >
                Browse Indoor Plants
              </Link>
            </div>
          </div>

          {/*  Outdoor Plants */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden w-full md:w-1/3 border border-green-100 hover:shadow-2xl transition">
            <img
              src={bgOutdoor}
              alt="Outdoor Plants"
              className="object-cover w-full h-64 hover:scale-105 transition duration-500"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-[#2E4D3A] mb-4">
                Outdoor Plants
              </h2>
              <Link
                to="/outdoor"
                className="inline-block bg-[#4C763B] text-white font-medium tracking-wide px-6 py-2 rounded-full hover:bg-[#3a5e2f] transition shadow-md hover:shadow-lg"
              >
                Browse Outdoor Plants
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Soil section */}
      <section
        ref={soilRef}
        className="relative z-10 py-20 text-center text-green-900 rounded-t-[3rem] shadow-inner bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-12 flex justify-center items-center gap-3 text-[#2E4D3A]">
            Soil Types
          </h1>

          {error && <p className="text-red-500">{error}</p>}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-8">
            {soils.map((soil) => (
              <div
                key={soil.id}
                className="bg-white/80 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 backdrop-blur-md"
              >
                <h2 className="text-2xl font-semibold text-[#2E4D3A] mb-3">
                  {soil.name}
                </h2>
                <p className="text-gray-700 text-sm mb-3">{soil.description}</p>
                <p className="text-green-800 text-sm font-medium">
                  <strong> Mixture:</strong> {soil.mixture_of}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
