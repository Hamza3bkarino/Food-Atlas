import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './PopUpUpdate.css';

export default function PopUpUpdate({ recette, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    titre: recette.titre,
    description: recette.description,
    categorie: recette.categorie,
    pays: recette.pays,
    image: recette.image,
    ingredients: Array.isArray(recette.ingredients) ? recette.ingredients.join("\n") : recette.ingredients,
    etapes: Array.isArray(recette.etapes) ? recette.etapes.join("\n") : recette.etapes,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      ingredients: formData.ingredients.split("\n"),
      etapes: formData.etapes.split("\n"),
    };

    try {
      await axios.put(`http://localhost:3000/Recettes/${recette.id}`, payload);
      onUpdate(payload); 
      toast.success("Recette modifiée avec succès ! ✅");
      setTimeout(onClose, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>Modifier la Recette</h2>
        <form onSubmit={handleSubmit}>
          <label>Titre :</label>
          <input type="text" name="titre" value={formData.titre} onChange={handleChange} required />

          <label>Pays :</label>
          <input type="text" name="pays" value={formData.pays} onChange={handleChange} required />

          <label>Catégorie :</label>
          <input type="text" name="categorie" value={formData.categorie} onChange={handleChange} required />

          <label>Description :</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Image :</label>
          <input type="file" onChange={handleImageChange} />
          {formData.image && <img src={formData.image} alt="preview" className="preview-img" />}
          
          <label>Ingrédients (1 par ligne) :</label>
          <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} />

          <label>Étapes (1 par ligne) :</label>
          <textarea name="etapes" value={formData.etapes} onChange={handleChange} />

          

          <div className="popup-buttons">
            <button type="button" onClick={onClose}>Annuler</button>
            <button type="submit" disabled={loading}>{loading ? "Sauvegarde..." : "Sauvegarder"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
