import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api/config";
import bgImage from "../assets/bgImage/plant5.jpg";

export default function Schedule() {
  const [tasks, setTasks] = useState([]);
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const [newTask, setNewTask] = useState({
    plant: "",
    task_name: "",
    date: "",
    day: "",
  });

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("⚠️ Please log in.");
      return;
    }

    axios
      .get(`${API_URL}/plants/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPlants(res.data))
      .catch(() => setError("❌ Failed to load plants."));

    axios
      .get(`${API_URL}/schedules/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data))
      .catch(() => setError("❌ Failed to load schedule."));
  }, []);

  //  Add or Update  
  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const payload = {
      plant: Number(newTask.plant),
      task_name: newTask.task_name,
      date: newTask.date,
      day: newTask.day,
    };

    try {
      if (editingId) {
        const res = await axios.put(
          `${API_URL}/schedules/${editingId}/`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks(tasks.map((t) => (t.id === editingId ? res.data : t)));
        setEditingId(null);
      } else {
        const res = await axios.post(`${API_URL}/schedules/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks([...tasks, res.data]);
      }
      setNewTask({ plant: "", task_name: "", date: "", day: "" });
      setError("");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to save task.");
    }
  };

  // delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(`${API_URL}/schedules/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch {
      setError("❌ Failed to delete task.");
    }
  };

  //  update 
  const handleEdit = (task) => {
    setNewTask({
      plant: task.plant,
      task_name: task.task_name,
      date: task.date,
      day: task.day,
    });
    setEditingId(task.id);
  };

  // Cancel Edit
  const handleCancel = () => {
    setEditingId(null);
    setNewTask({ plant: "", task_name: "", date: "", day: "" });
  };

  const toggleMenu = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, showMenu: !t.showMenu }
          : { ...t, showMenu: false }
      )
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-10 max-w-4xl mx-auto shadow-lg">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-10">
          🌿 My Weekly Plant Schedule
        </h1>

        <form onSubmit={handleSave} className="mb-10">
          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={newTask.plant}
              onChange={(e) =>
                setNewTask({ ...newTask, plant: e.target.value })
              }
              className="border p-2 rounded-lg w-full"
              required
            >
              <option value="">Select a plant</option>
              {plants.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              value={newTask.day}
              onChange={(e) => setNewTask({ ...newTask, day: e.target.value })}
              className="border p-2 rounded-lg w-full"
              required
            >
              <option value="">Select day</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Task name (e.g. Watering)"
            value={newTask.task_name}
            onChange={(e) =>
              setNewTask({ ...newTask, task_name: e.target.value })
            }
            className="border p-2 rounded-lg w-full mt-3"
            required
          />

          <input
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
            className="border p-2 rounded-lg w-full mt-3"
            required
          />

          {/* add or edit button */}
          <button
            type="submit"
            className={`w-full py-3 mt-4 rounded-full text-white font-semibold text-lg transition ${
              editingId
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {editingId ? "✏️ Update Task" : "➕ Add Task"}
          </button>

          {/* cancel button */}
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-full font-semibold mt-2 transition"
            >
              ❌ Cancel
            </button>
          )}

          {/* back to home button*/}
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="w-full bg-green-100 text-green-800 font-semibold py-3 rounded-full mt-4 hover:bg-green-200 transition"
          >
            ⬅ Back to Home
          </button>
        </form>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-10 relative">
          {days.map((day, index) => {
            const filtered = tasks.filter(
              (t) => t.day?.toLowerCase() === day.toLowerCase()
            );
            return (
              <div key={day} className="relative pl-8">
                {index !== days.length - 1 && (
                  <div className="absolute left-3 top-4 bottom-0 w-[2px] bg-green-400"></div>
                )}
                <div className="flex items-start space-x-4">
                  <div className="w-4 h-4 bg-green-600 rounded-full mt-1"></div>
                  <div>
                    <h2 className="text-2xl font-bold text-green-800 mb-4">
                      {day.toUpperCase()}
                    </h2>

                    {filtered.length > 0 ? (
                      filtered.map((task) => (
                        <div
                          key={task.id}
                          className="relative bg-white/80 backdrop-blur-sm border border-green-100 rounded-2xl shadow-md mb-3 p-4 pl-6"
                        >
                          <h3 className="text-green-900 font-semibold text-lg">
                            🌱 {task.task_name}
                          </h3>
                          <p className="text-sm text-gray-700">
                            {task.plant_name || "Unknown"} — {task.date}
                          </p>
                          {/* lade to edit or delete */}
                          <button
                            onClick={() => toggleMenu(task.id)}
                            className="absolute right-3 top-3 text-gray-500 text-xl hover:text-green-700"
                          >
                            ⋮
                          </button>
                          {/* Edit  */}
                          {task.showMenu && (
                            <div className="absolute right-3 top-9 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <button
                                onClick={() => handleEdit(task)}
                                className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                              >
                                 Edit
                              </button>

                              {/* delete  */}
                              <button
                                onClick={() => handleDelete(task.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                 Delete
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">
                        No tasks for this day 🌤
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}