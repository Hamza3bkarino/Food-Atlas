import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Recettes from "./Pages/Recettes";
import Navbar from "./Components/Navbar";
import RecetteDetails from "./Pages/RecetteDetails";


import OurRecettes from './Pages/MesRecettes';
import Ajouter from "./Pages/Ajouter";

function App() {
  return (
    <>
    <BrowserRouter>
     <Navbar/> 
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/recettes" element={<Recettes/>} />
      <Route path="/recette/:id" element={<RecetteDetails />} />
      <Route path="/MesRecettes" element={<OurRecettes/>} />
      <Route path="/ajouter" element={<Ajouter/>} />


    </Routes> 
    <Footer/>
    </BrowserRouter>
  
    </>
  );
}

export default App;
