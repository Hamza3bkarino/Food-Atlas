import DeletePopup from './DeletePopUp/DeletePopUp';
import './Recette_Card.css'
import { GrFormView } from "react-icons/gr";
import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function RecetteCard({recettes, isAdmin=false, onDelete, onEdit}){

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  const likeSound = new Audio("/images/LikeSound.mp3");

  const toggleLike = () => {
    setLiked(!liked);
    likeSound.currentTime = 1;
    likeSound.play();
  };

  const handleDelete = () => {
    setShowPopup(true);
  }

  const confirmDelete = () => {
    setLoading(true);    
    axios.delete(`http://localhost:3000/Recettes/${recettes.id}`)
      .then(() => onDelete(recettes.id))
      .catch(err => console.error(err))
      .finally(() => {
        setLoading(false);  
        setShowPopup(false); 
      });
  }

  const cancelDelete = () => {
    setShowPopup(false);
  }

  return (
    <>
      <div className="card">
        <img id='Card_Img' src={recettes.image} alt={recettes.titre} width={'270px'} />

        <div className="card-body">
          <div className="card-header">
            <h3>{recettes.titre}</h3>
            <span 
              className={`heart ${liked ? "liked" : ""}`}
              onClick={toggleLike}
            >
              ❤
            </span>
          </div>

          <div className="card-rating">
            <span className="star filled">★</span>
            <span className="star filled">★</span>
            <span className="star filled">★</span>
            <span className="star filled">★</span>
            <span className="star filled">★</span>
            <span className="rating-count">(5)</span>
          </div>

          <p className="card-desc">
            {recettes.description}
          </p>

          <div className="card-footer">
            <span className="price">{recettes.categorie}</span>

            {!isAdmin && (
              <Link to={`/recette/${recettes.id}`} className="basket">
                <GrFormView />
              </Link>
            )}
          </div>

          {isAdmin && (
            <div className='AdminButtons'>
              {/* ✔ Utilisation correcte */}
              <button id='edit' onClick={() => onEdit(recettes)}>
                Editer
              </button>

              <button id='delete' onClick={handleDelete}>
                Effacer
              </button>
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <DeletePopup
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          loading={loading}
        />
      )}
    </>
  );
}
