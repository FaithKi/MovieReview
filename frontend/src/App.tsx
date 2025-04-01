import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import MovieDetailPage from "./pages/MovieDetailPage";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Layout>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
            </Routes>
          </Layout>

          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
