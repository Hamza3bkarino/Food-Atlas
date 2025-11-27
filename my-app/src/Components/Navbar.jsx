import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <nav>
        <img onClick={() => navigate("/")} src="/images/AtlasLogo.png" alt="logo" />

        <div className="navElement">
          <ul>
            <li><a href="/">Acceuil</a></li>
            <li><a href="./Recettes">Recettes</a></li>
            <li><a href="./Contact">Contact</a></li>
          </ul>

          <div className="dropdown-container" tabIndex="0" onBlur={() => setOpen(false)}>
            <img className="icon" onClick={() => setOpen(!open)} src="/images/person.svg" alt="icon"/>

            {open && (
              <div className="dropdown-menu">
                <p onClick={() => navigate("/Ajouter")}>
                  Ajouter une recette
                </p>
                <p onClick={() => navigate("/MesRecettes")}>
                  Mes recettes
                </p>
              </div>
            )}
          </div>

        </div>
      </nav>
    </div>
  );
}
