import { useState } from "react";
import { useEffect } from "react";
import hero1 from "../assets/images/hero1.png"
import hero2 from "../assets/images/hero2.png"
import hero3 from "../assets/images/hero3.png"
import "./Home.css";
import Categorie from "../Components/CategorieSection/Categories";
import { useNavigate } from "react-router";

export default function Home() {
    const navigate = useNavigate()
    const images = [hero1, hero2, hero3];
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = images.length;
    const currentImage = images[currentSlide];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 4000);
        return () => clearInterval(interval);
    }, [])

    return (
        <>
        <section className="hero">
        <div
            className="hero-image"
            style={{ backgroundImage: `url(${currentImage})` }}
        ></div>

    <div className="hero-overlay">
           <div className="hero-content">
            <h1>VOYAGE CULINAIRE À TRAVERS LE MONDE</h1>
            <p>Découvrez des recettes délicieuses venues du monde entier</p>
            <button className="hero-btn" onClick={()=>navigate('/recettes')}>Commander maintenant</button>
           </div>
        </div>
    </section>

        <section >
            <h1 style={{textAlign:'center' ,fontSize:'70px',marginBottom:'100px'}} >Categories</h1>
            <Categorie/>
        </section>
    </>
    );
}