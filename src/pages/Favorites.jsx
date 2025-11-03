import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api/config";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    axios
      .get(`${API_URL}/favorites/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFavorites(res.data))
      .catch(() => setError("Failed to load favorites ❌"));
  }, []);

  const handleRemove = (id) => {
    const token = localStorage.getItem("access_token");

    axios
      .delete(`${API_URL}/favorites/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setFavorites(favorites.filter((fav) => fav.id !== id));
      })
      .catch(() => alert("Error removing favorite ❌"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-8">
      <h1 className="text-4xl font-bold text-green-800 text-center mb-10">
        ❤️ My Favorite Plants
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {favorites.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <img
                src={fav.plant.image_url}
                alt={fav.plant.name}
                className="object-cover w-full h-56"
              />
              <div className="p-5 text-center">
                <h2 className="text-xl font-semibold text-green-800 mb-3">
                  {fav.plant.name}
                </h2>

                <div className="flex justify-center gap-3">
                  {/* detail button */}
                  <Link
                    to={`/plants/${fav.plant.id}`}
                    className="bg-[#658C58] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#4e6d47] transition duration-300 shadow-md"
                  >
                    View Details
                  </Link>

                  {/* remove button */}
                  <button
                    onClick={() => handleRemove(fav.id)}
                    className="bg-[#A72703] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#821c02] transition duration-300 shadow-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center text-lg">
          No favorite plants yet 🌿
        </p>
      )}
    </div>
  );
}
