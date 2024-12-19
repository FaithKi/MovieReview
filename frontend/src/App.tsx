import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
