import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../api/config";

export default function OutdoorPlants() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    axios
      .get(`${API_URL}/plants/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // ✅ نعرض فقط النباتات الخارجية
        const outdoorPlants = res.data.filter(
          (plant) => plant.category === "Outdoor Plants"
        );
        setPlants(outdoorPlants);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load outdoor plants ❌");
      });
  }, []);

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-16 px-8">

      {/* 🔙 زر العودة إلى الهوم */}
      <div className="flex justify-start mb-6">
        <Link
          to="/home"
          className="bg-[#4C763B] text-white px-5 py-2 rounded-full font-medium hover:bg-[#3a5e2f] transition shadow-md"
        >
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-green-800 text-center mb-10">
        🌻 Outdoor Plants
      </h1>

      {/* 🔍 شريط البحث */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search for a plant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 p-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* ⚠️ رسالة الخطأ */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* 🪴 قائمة النباتات */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => (
            <div
              key={plant.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <img
                src={plant.image_url}
                alt={plant.name}
                className="object-cover w-full h-56"
              />
              <div className="p-5 text-center">
                <h2 className="text-xl font-semibold text-green-800 mb-3">
                  {plant.name}
                </h2>
                <Link
                  to={`/plants/${plant.id}`}
                  className="inline-block bg-[#4C763B] text-white px-6 py-2 rounded-full font-medium hover:bg-[#3a5e2f] transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center w-full">
            No outdoor plants found 🌱
          </p>
        )}
      </div>
    </div>
  );
}
