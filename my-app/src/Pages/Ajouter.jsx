import React, { useState } from "react";
import axios from "axios";
import './Ajouter.css'

export default function Ajouter() {
  const [formData, setFormData] = useState({
    titre: "",
    pays: "",
    categorie: "",
    image: "",
    description: "",
    ingredients: "",
    etapes: ""
  });

  // 🔥 UPLOAD IMAGE VERS CLOUDINARY
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "recettes_preset");
    data.append("folder", "recettesFolder");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dh6r1fw3q/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadData = await res.json();

    // on ajoute l'URL de l'image dans formData
    setFormData({ ...formData, image: uploadData.secure_url });
  };

  // 🔥 ENVOI DES DONNÉES VERS JSON SERVER
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/Recettes", formData)
      .then(() => {
        alert("Recette ajoutée avec succès !");
      })
      .catch((err) => {
        console.log("Erreur :", err);
      });
  };

  return (
    <div className="ajout-container">
      <h1>Ajouter une nouvelle recette</h1>

      <form onSubmit={handleSubmit} className="form-recette">

        <label>Titre :</label>
        <input 
          type="text"
          value={formData.titre}
          onChange={(e)=> setFormData({ ...formData, titre: e.target.value })}
        />

        <label>Pays :</label>
        <input 
          type="text"
          value={formData.pays}
          onChange={(e)=> setFormData({ ...formData, pays: e.target.value })}
        />

        <label>Catégorie :</label>
        <input 
          type="text"
          value={formData.categorie}
          onChange={(e)=> setFormData({ ...formData, categorie: e.target.value })}
        />

        <label>Image :</label>
        <input 
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {formData.image && (
          <img src={formData.image} alt="preview" className="preview-img" />
        )}

        <label>Description :</label>
        <textarea
          value={formData.description}
          onChange={(e)=> setFormData({ ...formData, description: e.target.value })}
        />

        <label>Ingrédients :</label>
        <textarea
          value={formData.ingredients}
          onChange={(e)=> setFormData({ ...formData, ingredients: e.target.value })}
        />

        <label>Étapes :</label>
        <textarea
          value={formData.etapes}
          onChange={(e)=> setFormData({ ...formData, etapes: e.target.value })}
        />

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
