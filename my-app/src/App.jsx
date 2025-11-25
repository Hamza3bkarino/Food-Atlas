
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home/>} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  
    </>
  )
}

export default App
