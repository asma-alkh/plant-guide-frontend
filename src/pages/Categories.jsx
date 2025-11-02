import { Link } from "react-router-dom";
import bgIndoor from "../assets/bgImage/indoor.jpg";
import bgOutdoor from "../assets/bgImage/outdoor.jpg";

export default function Categories() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-20 px-6 text-center">
      <h1 className="text-4xl font-bold text-green-800 mb-12">Plant Categories</h1>

      <div className="flex flex-col md:flex-row justify-center gap-10">
        {/*  Indoor Plants Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full md:w-1/3 hover:scale-105 transition-transform duration-300">
          <img src={bgIndoor} alt="Indoor Plants" className="object-cover w-full h-64" />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Indoor Plants</h2>
            <Link
              to="/indoor"
              className="inline-block bg-[#4C763B] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3a5e2f] transition shadow-lg"
            >
              Browse Indoor Plants
            </Link>
          </div>
        </div>

        {/*  Outdoor Plants Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full md:w-1/3 hover:scale-105 transition-transform duration-300">
          <img src={bgOutdoor} alt="Outdoor Plants" className="object-cover w-full h-64" />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Outdoor Plants</h2>
            <Link
              to="/outdoor"
              className="inline-block bg-[#4C763B] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3a5e2f] transition shadow-lg"
            >
              Browse Outdoor Plants
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
