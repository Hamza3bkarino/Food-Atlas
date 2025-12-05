import React, { useState, useRef } from "react";
import axios from "axios";
import Tags from "@yaireo/tagify/dist/react.tagify"; 
import "@yaireo/tagify/dist/tagify.css";
import toast from 'react-hot-toast';
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

  // const [etapesText, setEtapesText] = useState("");
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
    console.log("etapes == ", formData.etapes)
    e.preventDefault();

    let newErrors = {};

  if (!formData.titre.trim() ||!formData.pays.trim() || !formData.categorie.trim() 
    || !formData.image || !formData.description.trim() ){
    newErrors.message = "Ce champ est obligatoire";
  }
    
  if (formData.ingredients.length === 0)
    newErrors.ingredients = "Ajoutez au moins un ingrédient.";

  if (formData.etapes.length === 0)
    newErrors.etapes = "Ajoutez au moins une étape.";
 
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({ message: ""});

    axios.post("http://localhost:3000/Recettes", formData)
      .then(() => {
       toast.success("Recette ajoutée avec succès ! ✅");

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
    <div className="container-ajouter">
       <img src="/images/Baker.png" alt="left decoration" className="side-image left" />
    <div className="ajout-container">
      <h1>Ajouter une nouvelle recette</h1>

      <form onSubmit={handleSubmit} className="form-recette">

        <label>Titre :</label>
        <input 
          type="text"
          value={formData.titre}
          onChange={(e)=> setFormData({ ...formData, titre: e.target.value })}
        />
        {errors.message && <p className="error">{errors.message}</p>}

        <label>Pays :</label>
        <input 
          type="text"
          value={formData.pays}
          onChange={(e)=> setFormData({ ...formData, pays: e.target.value })}
        />
        {errors.message && <p className="error">{errors.message}</p>}

        <label>Catégorie :</label>
        <input 
          type="text"
          value={formData.categorie}
          onChange={(e)=> setFormData({ ...formData, categorie: e.target.value })}
        />
        {errors.message && <p className="error">{errors.message}</p>}

        <label>Image :</label>
        <input 
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={imageInputRef}
        />
        {errors.message && <p className="error">{errors.message}</p>}

        {formData.image && (
          <img src={formData.image} alt="preview" className="preview-img" />
        )}

        <label>Description :</label>
        <textarea
          value={formData.description}
          placeholder="Entrez une description du plat"
          onChange={(e)=> setFormData({ ...formData, description: e.target.value })}
        />
        {errors.message && <p className="error">{errors.message}</p>}

        <label>Ingrédients :</label>
        <Tags
          className = "tags-input-style"
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
          value={formData.etapes.join("\n")}
          placeholder="Entrez les étapes, une par ligne"
          onChange={(e)=> { 
            // setEtapesText(e.target.value);
            setFormData({ ...formData, etapes: (e.target.value.split("\n"))})}}
        />
        {errors.etapes && <p className="error">{errors.etapes}</p>}

        <button type="submit">Ajouter</button>
      </form>
    </div>
    <img src="/images/Puji.png" alt="right decoration" className="side-image right" />
    </div>
  );
}
