import { useState } from 'react'
import { FiChevronDown } from "react-icons/fi";
import './FilterByCategory.css'

export default function FilterByCategory ({filtred,setFiltered}){
    const [open,setOpen] = useState(false);

    return(
        <>
            <div className="custom-select">
                <div className="selected" onClick={()=> setOpen(!open)}>
                    {filtred || "Choisir un pays"}
                    <span className='arrow' >
                        <FiChevronDown/>
                    </span>
                </div>
            {
                open &&(
                    <>
                        <div className={`options open`}>
                            <div onClick={() => {setFiltered("Tout") ; setOpen(false)}}>Tout</div>
                            <div onClick={() => {setFiltered("France") ; setOpen(false)}}>France</div>
                            <div onClick={() => {setFiltered("Italie") ; setOpen(false)}}>Italie</div>
                            <div onClick={() => {setFiltered("Maroc") ; setOpen(false)}}>Maroc</div>
                        </div>

                    </>
                )
            }
                
            </div>
        </>
    )
}