import React, { useState } from 'react';
import './Footer.css'
export default function Footer() {
 

 

  return (
    <div className='footer'>
      <footer>
        <div className='footerElement'>
          <img src="/images/logoFooter.png" alt="logo" />
          <p>
            Votre destination pour les recettes delice.<br />
            Explorez les meilleurs recettes, genres et nouveautés.
          </p>

        </div>

        <div className='copyright'>
          <p>© 2025 FoodAtlas. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}