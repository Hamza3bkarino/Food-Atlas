import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
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
            <li><Link to="/" onClick={() => setOpen(false)}>Acceuil</Link></li>
            <li><Link to="/recettes" onClick={() => setOpen(false)}>Recettes</Link></li>
            <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
          </ul>

          <div className="dropdown-container" tabIndex="0" onBlur={() => setOpen(false)}>
            <img
              className="icon"
              onClick={() => setOpen(!open)}
              src="/images/person.svg"
              alt="icon"
            />

            {open && (
              <div className="dropdown-menu">
                <p
                  onClick={() => {
                    setOpen(false);
                    navigate("/ajouter");
                  }}
                >
                  Ajouter une recette
                </p>

                <p
                  onClick={() => {
                    setOpen(false);
                    navigate("/mesRecettes");
                  }}
                >
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
