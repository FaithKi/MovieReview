import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post("/api/auth/login",
            { email, password },{
            headers: 
            { "Content-Type": "application/json" },
        });

        const data = await response.data // { user, token }
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post("/api/auth/register", 
            {name, email, password },
            {
            headers: 
            { "Content-Type": "application/json", },
        });

        const data = await response.data // { user, token }
        return data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};
