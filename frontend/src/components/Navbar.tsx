import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
  const {userState, logout} = useAuth();
  
  return (
    <nav className="h-[10vh] bg-linear-to-br from-primary-600 via-primary-500 via-65% to-primary-400 py-3.5 px-8  flex justify-center items-center shadow-xl">
      <div className={`w-[65vw] flex justify-between items-center`}>
        <Link to="/">
          <div className="h-12  text-2xl font-bold text-transparent bg-clip-text bg-linear-to-b from-secondary-600 from-50% to-secondary-400 to-80%">
            {/* put sth here */}
          </div>
        </Link>
        <Link to="/">
          <div className="h-12  text-4xl font-bold text-transparent bg-clip-text bg-linear-to-b from-secondary-600 from-50% to-secondary-400 to-80%">
            Filmageddon
          </div>
        </Link>
        
        {userState.isAuthenticated? <Link to="/profile">
          <div className="profile-img flex h-12 w-12 rounded-xl transition duration-300 ease-in-out hover:scale-110 bg-smoke overflow-hidden">
            <img onClick={logout}
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
