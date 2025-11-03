import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center border-b border-white/20 pb-4">
      <div className="flex space-x-6 text-sm font-semibold tracking-wide">
        <a href="#" className="hover:text-green-200">Soils</a>
        <a href="#" className="hover:text-green-200">Contact</a>
      </div>
      <div className="flex space-x-4 text-lg">
        <FaHeart
          onClick={() => navigate("/favorites")}
          className="hover:text-green-300 cursor-pointer transition duration-300"
        />
      </div>
    </nav>
  );
}
