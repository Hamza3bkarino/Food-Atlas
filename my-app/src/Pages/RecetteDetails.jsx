import "./RecetteDetails.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecetteDetails() {
  const { id } = useParams();
  const [recette, setRecette] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/Recettes")
      .then((res) => {
        const found = res.data.find((item) => item.id == id); // fonctionne même si id = "8"
        setRecette(found);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (loading) return <p className="loading">Chargement...</p>;
  if (!recette) return <p className="notFoundDetail">Recette introuvable ❌</p>;

  return (
    <div className="RecetteDetailsContainer">

      

      <div className="detailsText">
        <img className="detailImage" src={recette.image} alt={recette.titre} />
        <h1>{recette.titre}</h1>
        <p><strong>Pays :</strong> {recette.pays}</p>
        <p><strong>Catégorie :</strong> {recette.categorie}</p>
        <p>{recette.description}</p>

        <h2>Ingrédients</h2>
        <ul>
          {recette.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>

        <h2>Étapes</h2>
        <ul>
          {recette.etapes.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>

        <Link to="/recettes" className="backBtn">← Retour aux Recettes</Link>
      </div>
    </div>
  );
}
