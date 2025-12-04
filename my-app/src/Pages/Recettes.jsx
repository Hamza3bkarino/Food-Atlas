import './Recettes.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RecetteCard from '../Components/Recette_Card';
import FilterByCategory from '../Components/Filter/FilterByCategory';
import { TbError404 } from "react-icons/tb";
import Loading from '../Components/Loading';
import PopUpUpdate from '../Components/PopUpUpdate/PopUpUpdate';

export default function Recettes({ isAdmin }) {
    const [recettes, setRecettes] = useState([]);
    const [filtered, setFiltered] = useState('Tout');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [recetteToUpdate, setRecetteToUpdate] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/Recettes')
            .then(res => setRecettes(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = (id) => {
        setRecettes(prev => prev.filter(r => r.id !== id));
    };

    const handleEdit = (recette) => {
        setRecetteToUpdate(recette);
        setShowEditPopup(true);
    };

    const handleUpdate = (updatedRecette) => {
        setRecettes(prev =>
            prev.map(r => r.id === updatedRecette.id ? updatedRecette : r)
        );
        setShowEditPopup(false); // fermer popup après update
    };

    const filteredRecettes = recettes.filter(r => {
        const matchSearch = r.titre.toLowerCase().includes(search.toLowerCase());
        const matchCountry = filtered === "Tout" ? true : r.pays.toLowerCase() === filtered.toLowerCase();
        return matchSearch && matchCountry;
    });

    return (
        <>
            {loading && <Loading />}
            {!loading && (
                <div className='mainSection'>
                    <div className='Filter_Search'>
                        <input
                            type="search"
                            placeholder='Search'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <FilterByCategory filtred={filtered} setFiltered={setFiltered} />
                    </div>

                    <section className='AllCards'>
                        {filteredRecettes.length > 0 ? filteredRecettes.map((recette, idx) => (
                            <div key={recette.id} className="fade-card" style={{ animationDelay: `${idx * 0.2}s` }}>
                                <RecetteCard
                                    recettes={recette}
                                    isAdmin={isAdmin}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                            </div>
                        )) : (
                            <div className='notFound'>
                                <p>Not Found</p>
                                <TbError404 className='icon404' />
                            </div>
                        )}
                    </section>
                </div>
            )}

            {showEditPopup && recetteToUpdate && (
                <PopUpUpdate
                    recette={recetteToUpdate}
                    onClose={() => setShowEditPopup(false)}
                    onUpdate={handleUpdate}
                />
            )}
        </>
    );
}
