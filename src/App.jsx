import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import IndoorPlants from "./pages/IndoorPlants";
import OutdoorPlants from "./pages/OutdoorPlants";
import PlantDetail from "./pages/PlantDetail";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/indoor" element={<IndoorPlants />} />
        <Route path="/outdoor" element={<OutdoorPlants />} />
        <Route path="/plants/:id" element={<PlantDetail />} />
      </Routes>
    </Router>
  );
}

export default App