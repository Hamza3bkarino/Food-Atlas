
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Recettes from './Pages/Recettes';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
function App() {

  return (
    <>
    <BrowserRouter>
    {/* <Navbar/> */}
    <Routes>
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} /> 
      <Route path="/recettes" element={<Recettes/>} />
      {/* <Route path="/Details/:title" element={<Details/>} />
      <Route path="/contact" element={<Contact/>} /> */}
    </Routes>
    {/* <Footer/> */}
    </BrowserRouter>
  
    </>
  )
}

export default App
