import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { MovieProps, User } from "../type";
import StarHistogram from "../components/StarHistogram";
import { useNavigate } from "react-router-dom";
import MovieList from "../components/MovieList";
import { fetchProfileMovies } from "../utils/movieUtils";

export default function Profile() {
    const {userState, logout} = useAuth();
    const [user, setUser] = useState<User>();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<MovieProps[]>([]);
    const [recentLikes, setRecentLikes] = useState<MovieProps[]>([]);
    const [recentReviews, setRecentReviews] = useState<MovieProps[]>([]);
    const [watchlist, setWatchlist] = useState<MovieProps[]>([]);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            if (!userState.token || !userState.user) {
                navigate("/login");
                return;
            }
            const response = await axios.get(`/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${userState.token}`,
                },
            });
            setUser(response.data);
            setLoading(false);
        } catch(error: unknown){
            if (axios.isAxiosError(error)){
                const customMessage = error.response?.data?.message;
                console.error(customMessage || error.message);
                setError(customMessage || error.message || "Fetch user failed");
            }
        }
        // console.dir(userState);
    }
    const fetchRecentLikes = async () => {
        await fetchProfileMovies(`/api/review/likes/${userState.user?._id}`, setRecentLikes);
    }

    const fetchWatchlist = async () => {
        await fetchProfileMovies(`/api/watchlist/${userState.user?._id}`, setWatchlist);
    }

    useEffect(() => {
        fetchUser();   
        console.log("user", user);
    }, [userState.token]);


    useEffect(() => {
        fetchWatchlist();
        fetchRecentLikes();
    }, [userState.token]);

    const onLogout = () => {
        logout();
        navigate("/login");
    }

    return <>{
        isLoading || !user ? <LoadingScreen /> :
        <div className="flex flex-col gap-10 items-center  mb-20">
            <div className="flex flex-col items-center gap-5 bg-secondary-600/60 w-[100vw] py-10">
                <h2 className="text-xl font-semibold text-secondary-400">{user.name}</h2>
                <img src="https://people.com/thmb/4w9l4F40TrN3Ix2d-PH2XODqra0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/sylvester-stallone-rocky-III-diet-062123-1-9a3af3b939fb417fb2032dfc03fa83cf.jpg" 
                alt="Profile" className="w-32 h-32 rounded-full" />
                <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            </div>
            
            <div className="w-[90vw]  md:w-[80vw] lg:w-[60vw] h-64">
                <StarHistogram starStats={user?.starStats || new Map<string, number>()} />
            </div>

            <MovieList
                header="Favorites"
                movies={favorites}
            />
            <MovieList
                header="Recent Likes"
                movies={recentLikes}
            />
            <MovieList
                header="Recent Reviews"
                movies={recentReviews}
            />
            <MovieList
                header="Watchlist"
                movies={watchlist}
            />
        </div>
    }</>
}