import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import MovieDetailPage from "./pages/MovieDetailPage";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
