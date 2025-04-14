import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
  const {userState} = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="h-[10vh] bg-primary-600 py-3.5 px-8  flex justify-center items-center shadow-xl">
      <div className={`w-[90vw]  md:w-[80vw] lg:w-[60vw] flex justify-between items-center`}>

        <Link to="/">
          <div className="h-12  text-4xl font-bold text-primary-600 bg-secondary-400 rounded-xl px-2">
            Filmageddon
          </div>
        </Link>
        
        {userState.isAuthenticated? <Link to="/profile">
          <div className="profile-img flex h-12 w-12 rounded-xl transition duration-300 ease-in-out hover:scale-110 bg-smoke overflow-hidden">
            <img onClick={() => navigate("/profile")}
              src="https://people.com/thmb/4w9l4F40TrN3Ix2d-PH2XODqra0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/sylvester-stallone-rocky-III-diet-062123-1-9a3af3b939fb417fb2032dfc03fa83cf.jpg"
              alt="user profile"
            />
          </div>
        </Link>:
        <Link to="/login">
          <div className="h-12  text-4xl font-bold text-transparent bg-clip-text bg-linear-to-b from-secondary-600 from-50% to-secondary-400 to-80%">
            Login
          </div>
          </Link>
          }
      </div>
    </nav>
  );
}
