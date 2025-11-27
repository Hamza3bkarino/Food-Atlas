import './Recettes.css'
import { useState , useEffect} from 'react';
import axios from "axios";
import RecetteCard from '../Components/Recette_Card';
import FilterByCategory from '../Components/Filter/FilterByCategory';

export default function Recettes(){
    
    const [recettes,setRecettes] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/Recettes')
        .then(res => setRecettes(res.data))
        .catch(err => console.log(err));
    },[])

    return(
        <>
            <FilterByCategory/>
            <section className='AllCards'>
            {
                recettes.map((item,index)=>{
                    return <RecetteCard key={index} recettes={item} />                    
                })
            }
            </section>
        </>
    )
}