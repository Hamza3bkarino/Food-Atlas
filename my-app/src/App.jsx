import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Recettes from './Pages/Recettes';

function App() {

  return (
    <>
    <BrowserRouter>
    {/* <Navbar/>
    <Routes>

      <Route path="/recettes" element={<Recettes/>} />
      <Route path="/Details/:title" element={<Details/>} />
      <Route path="/contact" element={<Contact/>} />
    </Routes> */}
    <Footer/>
    </BrowserRouter>
  
    </>
  )
}

export default App;
