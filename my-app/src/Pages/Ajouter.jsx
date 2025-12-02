import React, { useState, useRef } from "react";
import axios from "axios";
import Tags from "@yaireo/tagify/dist/react.tagify"; 
import "@yaireo/tagify/dist/tagify.css";
import './Ajouter.css'

export default function Ajouter() {
  const [formData, setFormData] = useState({
    titre: "",
    pays: "",
    categorie: "",
    image: "",
    description: "",
    ingredients: [],
    etapes: []
  });

  const [etapesText, setEtapesText] = useState("");
  const [errors, setErrors] = useState({});
  const imageInputRef = useRef(null);

  // UPLOAD IMAGE VERS CLOUDINARY
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

  // ENVOI DES DONNÉES VERS JSON SERVER
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

  if (!formData.titre.trim() ||!formData.pays.trim() || !formData.categorie.trim() 
    || !formData.image || !formData.description.trim() ){
    newErrors.titre = "Ce champ est obligatoire";
  }
    
  if (formData.ingredients.length === 0)
    newErrors.ingredients = "Ajoutez au moins un ingrédient.";

  if (formData.etapes.length === 0)
    newErrors.etapes = "Ajoutez au moins une étape.";
 
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  // sinon → on vide les erreurs
  setErrors({ titre: "", pays: "", categorie: "" });

    axios.post("http://localhost:3000/Recettes", formData)
      .then(() => {
        alert("Recette ajoutée avec succès !");

         setFormData({
        titre: "",
        pays: "",
        categorie: "",
        image: "",
        description: "",
        ingredients: [],
        etapes: []
      });
      setEtapesText("");
       if (imageInputRef.current) imageInputRef.current.value = "";
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
        {errors.titre && <p className="error">{errors.titre}</p>}

        <label>Pays :</label>
        <input 
          type="text"
          value={formData.pays}
          onChange={(e)=> setFormData({ ...formData, pays: e.target.value })}
        />
        {errors.pays && <p className="error">{errors.pays}</p>}

        <label>Catégorie :</label>
        <input 
          type="text"
          value={formData.categorie}
          onChange={(e)=> setFormData({ ...formData, categorie: e.target.value })}
        />
        {errors.categorie && <p className="error">{errors.categorie}</p>}

        <label>Image :</label>
        <input 
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={imageInputRef}
        />
        {errors.image && <p className="error">{errors.image}</p>}

        {formData.image && (
          <img src={formData.image} alt="preview" className="preview-img" />
        )}

        <label>Description :</label>
        <textarea
          value={formData.description}
          placeholder="Entrez une description du plat"
          onChange={(e)=> setFormData({ ...formData, description: e.target.value })}
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <label>Ingrédients :</label>
        <Tags
          className="tags-input-style"
          value={formData.ingredients}
           placeholder="Entrez les ingrédients puis appuyez sur Entrée..."
          onChange={(e) =>
            setFormData({
              ...formData,
              ingredients: JSON.parse(e.detail.value).map(t => t.value)
            })
          }
        />
        {errors.ingredients && <p className="error">{errors.ingredients}</p>}  

        <label>Étapes : (une étape par ligne )</label>
        <textarea
          value={etapesText}
          placeholder="Entrez les étapes, une par ligne"
          onChange={(e)=> { 
            setEtapesText(e.target.value);
            setFormData({ ...formData, etapes: e.target.value.split("\n").filter(l => l.trim() !== "") })}}
        />
        {errors.etapes && <p className="error">{errors.etapes}</p>}

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
