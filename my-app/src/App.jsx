<<<<<<< HEAD
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Recettes from "./Pages/Recettes";
import Navbar from "./Components/Navbar";
import RecetteDetails from "./Pages/RecetteDetails";
=======
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Recettes from './Pages/Recettes';
import Navbar from './Components/Navbar';
import Ajouter from './Pages/Ajouter'

>>>>>>> maryam
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
          {/* <Route path="/Details/:title" element={<Details/>} />
      <Route path="/contact" element={<Contact/>} /> */}
<<<<<<< HEAD
        </Routes>
        <Footer />
      </BrowserRouter>
=======
      <Route path="/ajouter" element={<Ajouter/>} />


    </Routes> 
    <Footer/>
    </BrowserRouter>
  
>>>>>>> maryam
    </>
  );
}

export default App;
