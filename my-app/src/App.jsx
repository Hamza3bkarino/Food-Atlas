import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Recettes from "./Pages/Recettes";
import Navbar from "./Components/Navbar";
import RecetteDetails from "./Pages/RecetteDetails";
import MesRecettes from "./Pages/MesRecettes";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home/>} /> */}
          <Route path="/recettes" element={<Recettes />} />
          <Route path="/recette/:id" element={<RecetteDetails />} />
          <Route path="/mesRecettes" element={<MesRecettes />} />
          {/* <Route path="/Details/:title" element={<Details/>} />
      <Route path="/contact" element={<Contact/>} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
