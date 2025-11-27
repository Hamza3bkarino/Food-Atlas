import './Recettes.css'
import { useState , useEffect} from 'react';
import axios from "axios";
import RecetteCard from '../Components/Recette_Card';
import FilterByCategory from '../Components/Filter/FilterByCategory';

export default function Recettes(){
    
    const [recettes,setRecettes] = useState([]);
    const [filtered, setFiltered] = useState('Tous')

    useEffect(()=>{
        axios.get('http://localhost:3001/Recettes')
        .then(res => setRecettes(res.data))
        .catch(err => console.log(err));
    },[]);

    const Recettes = filtered !== "Tous"
                        ? recettes.filter(elm =>
                            elm.pays.toLowerCase() === filtered.toLowerCase()
                        )
                        : recettes;
    


    return(
        <>
            <FilterByCategory filtred={filtered} setFiltered={setFiltered}/>
            <section className='AllCards'>
            {
                Recettes.map((item,index)=>{
                    return <RecetteCard key={index} recettes={item} />                    
                })
            }
            </section>
        </>
    )
}