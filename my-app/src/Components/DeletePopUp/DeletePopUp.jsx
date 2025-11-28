import './DeletePopup.css'

export default function DeletePopup({ onConfirm, onCancel ,loading }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>Êtes-vous sûr de vouloir supprimer ? </h3>
        <p className="popup-text">Cette action est irréversible.</p>

        <div className="popup-buttons">
          <button className="btn cancel" onClick={onCancel}>Annuler</button>
          <button className="btn delete" onClick={onConfirm}>{loading ? <div className="mini-loader"></div> : 'Supprimer'} </button>
        </div>
      </div>
    </div>
  );
}
