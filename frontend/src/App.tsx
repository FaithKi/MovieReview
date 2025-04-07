import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import MovieDetailPage from "./pages/MovieDetailPage";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import Login from "./pages/LoginPage";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>      
        <div>
          <BrowserRouter>
            <Navbar />
            <Layout>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/movie/:id" element={<MovieDetailPage />} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
              </Routes>
            </Layout>

            <Footer />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
