import './Recettes.css'
import { useState , useEffect} from 'react';
import axios from "axios";
import RecetteCard from '../Components/Recette_Card';

export default function Recettes(){
    
    const [recettes,setRecettes] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/Recettes')
        .then(res => setRecettes(res.data))
        .catch(err => console.log(err));
    },[])

    return(
        <>
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