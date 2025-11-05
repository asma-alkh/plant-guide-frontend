import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api/config";
import { FiUser, FiMail, FiEdit2, FiArrowLeft, FiMapPin, FiTrash2 } from "react-icons/fi";
import bgImage from "../assets/bgImage/plant5.jpg";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    location: "",
    profile_image: null,
  });

 
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get(`${API_URL}/profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setFormData({
          bio: res.data.bio || "",
          location: res.data.location || "",
          profile_image: null,
        });
      } catch (err) {
        console.error("Profile load error:", err);
        setError("❌ Failed to load profile info. Please log in again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);


  const handleSave = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return alert("Please log in again.");

    const updatedData = new FormData();
    updatedData.append("bio", formData.bio);
    updatedData.append("location", formData.location);
    if (formData.profile_image) {
      updatedData.append("profile_image", formData.profile_image);
    }

    try {
      const res = await axios.put(`${API_URL}/profile/`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(res.data);
      setEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      setError("❌ Failed to update profile.");
    }
  };


  const handleDeleteImage = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile image?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`${API_URL}/profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile image deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting image:", error);
      setError("❌ Failed to delete profile image.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-10 max-w-lg w-[90%]">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-sm text-green-200 hover:text-green-100 mb-6 transition"
        >
          <FiArrowLeft /> Back to Home
        </button>

        <h1 className="text-3xl font-extrabold text-green-100 mb-8 text-center">
          My Profile
        </h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {user ? (
          <>
            <div className="flex flex-col items-center mb-6">
              {user.profile_image ? (
                <>
                  <img
                    src={
                      user.profile_image.startsWith("http")
                        ? user.profile_image
                        : `${API_URL.replace("/api", "")}${user.profile_image}`
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-green-400 mb-4"
                  />
                  <button
                    onClick={handleDeleteImage}
                    className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded-full text-white text-sm hover:bg-red-600 transition"
                  >
                    <FiTrash2 /> Delete Image
                  </button>
                </>
              ) : (
                <div className="w-32 h-32 rounded-full border-2 border-green-300 flex items-center justify-center text-green-200 text-sm mb-4">
                  No Image
                </div>
              )}

              <h2 className="text-2xl font-bold">{user.user?.username}</h2>
              <p className="text-green-100 flex items-center gap-2 mt-1">
                <FiMail /> {user.user?.email}
              </p>

              {user.location && (
                <p className="flex items-center gap-2 mt-1 text-green-100">
                  <FiMapPin /> {user.location}
                </p>
              )}

              {user.bio && (
                <p className="italic text-green-100 mt-2">"{user.bio}"</p>
              )}
            </div>
            {editing ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="bio" className="block text-sm text-green-100 mb-1">
                    Bio
                  </label>
                  <input
                    id="bio"
                    type="text"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full p-2 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm text-green-100 mb-1">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>

                <div>
                  <label htmlFor="profile_image" className="block text-sm text-green-100 mb-1">
                    Profile Image
                  </label>
                  <input
                    id="profile_image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, profile_image: e.target.files[0] })}
                    className="w-full p-2 text-white"
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-400/30 px-5 py-2 rounded-full hover:bg-gray-400/50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-green-500 px-5 py-2 rounded-full text-white font-semibold hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-green-500 px-6 py-2 rounded-full text-white font-semibold hover:bg-green-600 transition"
                >
                  <FiEdit2 /> Edit Profile
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-green-200">No profile data found.</p>
        )}
      </div>
    </div>
  );
}