export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    pictureProfile: string;
}
  
export interface UserState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}

export interface AuthContextType {
    userState: UserState;
    login: (userData: UserState) => void;
    logout: () => void;
}

export interface MovieProps {
    _id: any;
    title: string;
    poster_path: string;
    runtime: number;
    tagline: string;
    popularity: number;
}
  
export interface MovieDetail {
    _id: any;
    title: string;
    poster_path: string;
    original_language: string;
    runtime: number;
    tagline: string;
    overview: string;
    popularity: number;
    revenue: number;
}

export interface Review {
    _id: any;
    userId: string;
    movieId: string;
    review: string;
    star?: number;
    likedBy: string[];
}

export interface ReviewComment {
    _id: any;
    reviewId: string;
    userId: string;
    comment: string;
}

export interface LoginFormInputs {
    email: string;
    password: string;
}

export interface RegisterFormInputs {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}