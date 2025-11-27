import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Recettes from './Pages/Recettes';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path="/recettes" element={<Recettes/>} />

    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App;
