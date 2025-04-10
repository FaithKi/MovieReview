import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { User } from "../type";

import { useNavigate } from "react-router-dom";
import MovieList from "../components/MovieList";

export default function Profile() {
    const {userState, logout} = useAuth();
    const [user, setUser] = useState<User>();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${userState.token}`
                    }
                });
                setUser(response.data);
                console.log(response.data);
                setLoading(false);
            } catch(error: unknown){
                if (axios.isAxiosError(error)){
                    const customMessage = error.response?.data?.message;
                    console.error(customMessage || error.message);
                    setError(customMessage || error.message || "Fetch user failed");
                }
            }
            console.dir(userState);
        }
        fetchUser();    
    }, [userState.token]);

    const onLogout = () => {
        logout();
        navigate("/login");
    }
    return <>{
        isLoading ? <LoadingScreen /> :
        <div className="flex flex-col gap-10 items-center  ">
            {user && 
                <div className="flex flex-col items-center gap-5 py-10">
                    <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                    <img src="https://people.com/thmb/4w9l4F40TrN3Ix2d-PH2XODqra0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/sylvester-stallone-rocky-III-diet-062123-1-9a3af3b939fb417fb2032dfc03fa83cf.jpg" 
                    alt="Profile" className="w-32 h-32 rounded-full" />
                    <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                </div>
            }
            <MovieList
                header="Favorites"
                movies={[]}
            />
            <MovieList
                header="Recent Likes"
                movies={[]}
            />
            <MovieList
                header="Recent Reviews"
                movies={[]}
            />
            <MovieList
                header="Watchlist"
                movies={[]}
            />
        </div>
    }</>
}