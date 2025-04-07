import {AxiosError} from "axios";
import { useState } from "react";
import { RegisterFormInputs } from "../type";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/authServices"
import { handleInputChange } from "../utils/utils";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const [form, setForm] = useState<RegisterFormInputs>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try{
            const {user, token} = await registerUser(form.name, form.email, form.password);
            login({
                isAuthenticated: true,
                user: user,
                token: token
            })
            navigate("/");
        } catch(error: any){
            if (error instanceof AxiosError) {
                const customMessage = error.response?.data?.message;
                console.error(customMessage || error.message);
                setError(customMessage || error.message || "Register failed");
            } 
            
        }
    }

    return <>
        <div className="flex items-center justify-center min-h-screen   ">
            <form onSubmit={handleRegister} className=" mx-auto w-200 flex gap-5 p-6 bg-white rounded-2xl shadow-md space-y-4">
                <div>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg/640px-Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg"
                    alt="login"
                    className="w-96 h-96 object-cover"
                />
                </div>

                <div className="flex flex-col justify-center flex-grow gap-4">
                    <div>
                        <label htmlFor="name" className="block font-medium mb-1">Username</label>
                        <input
                        type="text"
                        name="name"
                        id="name"
                        value={form.name}
                        onChange={(e) => handleInputChange(e, setForm)}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-medium mb-1">Email</label>
                        <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => handleInputChange(e, setForm)}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block font-medium mb-1">Password</label>
                        <input
                        type="password"
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={(e) => handleInputChange(e, setForm)}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block font-medium mb-1">Confirm Password</label>
                        <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={form.confirmPassword}
                        onChange={(e) => handleInputChange(e, setForm)}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <span><a href="/login" className="text-blue-500 hover:underline">Already have an account?</a></span>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </div>
                
            </form>
</div>
    </>
}