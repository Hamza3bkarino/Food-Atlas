import './Recette_Card.css'
import { GrFormView } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function RecetteCard({recettes}) {
    return (
        <div className="card">
            <img id='Card_Img' src={recettes.image} alt={recettes.titre} width={'270px'}/>

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

                    {/* 🔥 Bouton qui mène vers la page détail */}
                    <Link to={`/recette/${recettes.id}`} className="basket">
                      <GrFormView />
                    </Link>
                </div>
            </div>
        </div>
    )
}
