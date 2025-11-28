import DeletePopup from './DeletePopUp/DeletePopUp';
import './Recette_Card.css'
import { GrFormView } from "react-icons/gr";
import { useState } from 'react';
import axios from 'axios';

export default function RecetteCard({recettes,isAdmin=false,onDelete}){
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const handleDelete = () => {
      setShowPopup(true)
  }
  const confirmDelete =() => {
    setLoading(true)    
    axios.delete(`http://localhost:3000/Recettes/${recettes.id}`)
      .then( res => onDelete(recettes.id))
      .catch(err => console.error(err))
      .finally(() => {
            setLoading(false);  
            setShowPopup(false); 
          })
        
  }
  const cancelDelete =() => {
    setShowPopup(false)
  }

  
    return(
        <>
          <div className="card">
            <img id='Card_Img' src={recettes.image} alt={recettes.titre} srcset="" width={'270px'}/>


            <div className="card-body">
              <div className="card-header">
                <h3>{recettes.titre}</h3>
                <span className="heart">❤</span>
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
                {!isAdmin &&(
                  <button className="basket">
                    <GrFormView/>
                  </button>
                )}
              </div>
            {isAdmin &&(
              <div className='AdminButtons'>
                <button id='edit'>
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
    )
}