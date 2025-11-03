import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../api/config";

export default function PlantDetail() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    axios
      .get(`${API_URL}/plants/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPlant(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load plant details ❌");
      });
  }, [id]);

  const handleAddFavorite = async () => { 
    const token = localStorage.getItem("access_token");
  

  try {
    const response = await axios.post(
      `${API_URL}/favorites/`,
      {plant: plant.id}, 
      {
        headers: {Authorization: `Bearer ${token}`}
      }
    );
    setMessage(" ✅ Added to favorites successfully")

  } catch (err) {
    console.error(err);
    setMessage(("❌ This plant is already in your favorites!"))
  } else {
    setMessage("⚠️ Something went wrong. Please try again later.");
    

  }
  }

  if (error)
    return (
      <p className="text-red-500 text-center mt-10 text-lg font-semibold">
        {error}
      </p>
    );

  if (!plant)
    return (
      <p className="text-gray-600 text-center mt-10 text-lg">Loading plant...</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-16 px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <img
          src={plant.image_url}
          alt={plant.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-8 text-green-900">
          <h1 className="text-4xl font-bold text-green-800 mb-4">{plant.name}</h1>

          <p className="text-lg mb-6 whitespace-pre-line">
            {plant.description}
          </p>

          <div className="bg-green-50 p-4 rounded-lg shadow-sm mb-4">
            <p>
              <span className="font-semibold">🌿 Soil Type:</span>{" "}
              {plant.soil?.name || "N/A"}
            </p>
            <p>
              <span className="font-semibold"></span>{" "}
              {plant.sunlight || "Not specified"}
            </p>
            <p>
              <span className="font-semibold"></span>{" "}
              {plant.watering_frequency || "Not specified"}
            </p>
          </div>
          {/* Favorite button */}
          <div className="flex gap-4">
            <button 
            onClick={handleAddFavorite}
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
              ❤️ Add to Favorites
            </button>
          </div>
          <Link
          to={
            plant.category === "Outdoor Plants" || plant.category === 2
            ? "/outdoor"
            : "/indoor"
          }
          className="inline-block bg-[#4C763B] text-white px-6 py-2 rounded-full hover:bg-[#3a5e2f] transition">
            ← Back to Plants
            </Link>
        </div>
        {/* Message after add to favorite */}
        {message && (
          <p className="text-center mt-4 text-green-700 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
