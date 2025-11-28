import './Recettes.css'
import { useState , useEffect} from 'react';
import axios from "axios";
import RecetteCard from '../Components/Recette_Card';
import FilterByCategory from '../Components/Filter/FilterByCategory';
import { TbError404 } from "react-icons/tb";
import Loading from '../Components/Loading';


export default function Recettes({isAdmin}){
    
    const [recettes,setRecettes] = useState([]);
    const [filtered, setFiltered] = useState('Tout');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true)
        axios.get('http://localhost:3000/Recettes')
        .then(res => setRecettes(res.data))
        .catch(err => console.log(err))
        .finally(() => {
                setLoading(false);   
            });
    },[]);

     const handleDelete = (id) => {
        setRecettes(prev => prev.filter(recette => recette.id !== id));
    }

    const Recettes =  recettes.filter(recette => {

        const matchSearch = recette.titre
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCountry = 
            filtered === "Tout" 
            ? true 
            : recette.pays.toLowerCase() === filtered.toLowerCase();

        return matchSearch && matchCountry;
    });


    return(
        <>
            <div className='Filter_Search'>
                <input type="search" name='search' id='search' placeholder='Search'value={search} onChange={(e)=>setSearch(e.target.value)} />
                <FilterByCategory filtred={filtered} setFiltered={setFiltered}/>
            </div>
            {loading && <Loading/>}
            {!loading &&(

                <section className='AllCards'>
                {
                    Recettes.map((item,index)=>{
                        return <RecetteCard key={index} recettes={item} isAdmin={isAdmin} onDelete={handleDelete} />                    
                    })
                }
                {
                    Recettes.length===0 &&(
                        <>
                        <div className='notFound'>
                            <p>Not Found</p>
                            <TbError404 className='icon404'/>
                        </div>
                        
                        </>
                    )
                }
                </section>
            )}
        </>
    )
}