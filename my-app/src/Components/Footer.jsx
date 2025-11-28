import React, { useState } from 'react';
import './Footer.css'

export default function Footer() {
 
  return (
     <footer className="footer">
      <div className="footer-content">

        <div className="footer-column">
          <img src= "/images/AtlasLogo.png" alt="logo" className="footer-logo" />
          <p>Votre destination des recettes.<br />Explorez les meilleurs recettes.</p>
        </div>

        <div className="footer-column">
          <h3>QUICK LINKS</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/recettes">Recettes</a></li>
            <li><a href="/contact">Contacts</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>CATÉGORIES</h3>
          <ul>
            <li>🇲🇦 Maroc</li>
            <li>🇮🇹 Italien</li>
            <li>🇲🇽 Mexique</li>
            <li>🇯🇵 Japonais</li>
            <li>🇫🇷 Français</li>
          </ul>
        </div>

      </div>
      <div className="footer-bottom">
        © 2025 FoodAtlas. Tous droits réservés.
      </div>
    </footer>
  );
}