import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Footer from "./Components/Footer";
import Recettes from "./Pages/Recettes";
import Navbar from "./Components/Navbar";
import RecetteDetails from "./Pages/RecetteDetails";
import OurRecettes from './Pages/MesRecettes';
import Ajouter from "./Pages/Ajouter";

import Home from './Pages/Home';
import Contact from './Pages/Contact';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} /> 
      <Route path="/recettes" element={<Recettes/>} />
      <Route path="/recette/:id" element={<RecetteDetails />} />
      <Route path="/MesRecettes" element={<OurRecettes/>} />
      <Route path="/ajouter" element={<Ajouter/>} />


    </Routes> 
    <Footer/>
    
    {/* <Footer/> */}
    </BrowserRouter>
  
    </>
  );
}

export default App;
