import React from "react";
import ReactDOM from "react-dom";
import "./DeletePopup.css";

export default function DeletePopup({ onConfirm, onCancel, loading }) {
  if (typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={onCancel}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h3>Confirmez la suppression</h3>
        <p>Êtes-vous sûr de vouloir supprimer cette recette ?</p>

        <div className="popup-buttons">
          <button className="cancel-btn" onClick={onCancel}>Annuler</button>

          <button className="delete-btn" onClick={onConfirm}>
            {loading ? <div className="mini-loader"></div> : "Supprimer"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
