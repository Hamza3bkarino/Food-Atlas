import { useState, useEffect } from "react";

import hero1 from "../assets/images/hero1.webp";
import hero2 from "../assets/images/hero2.png";
import hero3 from "../assets/images/hero3.jpeg";

import chef1 from "../assets/images/chef1.jpg";
import chef2 from "../assets/images/chef2.png";
import chef3 from "../assets/images/chef3.jpeg";

import "./Home.css";
import Categorie from "../Components/CategorieSection/Categories";

export default function Home() {
  const images = [hero1, hero2, hero3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;
  const currentImage = images[currentSlide];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="hero">
        <div
          key={currentSlide}
          className="hero-image"
          style={{ backgroundImage: `url(${currentImage})` }}
        ></div>

        <div className="hero-overlay">
          <div className="hero-content">
            <h1>VOYAGE CULINAIRE À TRAVERS LE MONDE</h1>
            <p>Découvrez des recettes délicieuses venues du monde entier</p>
            <button className="hero-btn">Explorez nos recettes</button>
          </div>
        </div>
      </section>

      <section className="chefs-section">
        <h2 className="chefs-title">RENCONTREZ NOS CHEFS EXPERTS</h2>

        <div className="chefs-container">
          <div className="chef-card">
            <img src={chef1} alt="Chef 1" className="chef-img" />
            <h3 className="chef-name">JEF RICK</h3>
            <span className="chef-role">CHEF PRINCIPAL</span>
            <p className="chef-desc">
              Découvrez nos créations gastronomiques préparées avec passion et précision.
            </p>
          </div>

          <div className="chef-card">
            <img src={chef2} alt="Chef 2" className="chef-img" />
            <h3 className="chef-name">JACOB HILTON</h3>
            <span className="chef-role">CHEF EXÉCUTIF</span>
            <p className="chef-desc">
              Spécialiste de la cuisine moderne, Jacob apporte créativité et expertise.
            </p>
          </div>

          <div className="chef-card">
            <img src={chef3} alt="Chef 3" className="chef-img" />
            <h3 className="chef-name">LINDA ERTON</h3>
            <span className="chef-role">COMMIS DE CUISINE</span>
            <p className="chef-desc">
              Experte en plats traditionnels revisités avec élégance et finesse.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}