import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api/config";

export default function Schedule() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const [newTask, setNewTask] = useState({
        plant: "", 
        task_name: "",
        date: "",
    });
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        axios.get(`${API_URL}/schedules/`, {
            headers:{ Authorization: `Bearer ${token}` },
        })
        .then((res) => setTasks(res.data))
        .catch(() => setError("❌ Failed to load schedule"))
    }, []);
    const handleAdd = async (e) => {
        e.preventDefault();
        const token  = localStorage.getItem("access_token");
        try{
            const res = await axios.post(`${API_URL}/schedule/`, newTask, {
                headers: {Authorization: `Bearer ${token}`},
            });
            setTasks([...tasks, res.data]);
            setNewTask({plant: "", task_name: "", date: ""});
        } catch {
            setError("❌ Failed to add task ");
        }
    };
    
    const handleDelete = async (id) => {
        const token = localStorage.getItem("access_token");
        await axios.delete(`${API_URL}/schedule/${id}/`, {
            headers: {Authorization: `Bearer ${token}`},
        });
        setTasks(tasks.filter((t) => t.id !== id));
    };
    

    return (
        <div>
            <h1>📅 My Plant Care Schedule</h1>
        </div>
    );
}