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

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setLoading(true); // optionnel pour indiquer le chargement

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "recettes_preset"); // ⚠️ Remplacer par votre preset Cloudinary

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dh6r1fw3q/image/upload", {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    if (result.secure_url) {
      setFormData(prev => ({ ...prev, image: result.secure_url }));
      toast.success("Image uploadée ✅");
    } else {
      toast.error("Erreur lors de l'upload de l'image !");
    }
  } catch (err) {
    console.error(err);
    toast.error("Erreur Cloudinary !");
  } finally {
    setLoading(false);
  }
};



const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
        id: recette.id,
        titre: formData.titre,
        description: formData.description,
        categorie: formData.categorie,
        pays: formData.pays,
        image: formData.image || recette.image, // ✅ Assure que l'image est toujours présente
        ingredients: formData.ingredients.split("\n").filter(i => i.trim()), // Nettoie les lignes vides
        etapes: formData.etapes.split("\n").filter(e => e.trim()),
    };

    try {
        await axios.put(`http://localhost:3000/Recettes/${recette.id}`, payload);
        onUpdate(payload);
        toast.success("Recette modifiée avec succès ! ✅");
        onClose(); // ✅ Ferme le popup après succès
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
                    <label>Ingrédients :</label>
                    <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} />
                    <label>Étapes :</label>
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
