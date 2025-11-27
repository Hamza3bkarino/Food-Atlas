import './FilterByCategory.css'

export default function FilterByCategory (){

    return(
        <>
            <select name="Country"  id='Country'>
                <option id='option' value="Tout">Tout</option>
                <option id='option' value="France">France</option>
                <option id='option' value="Italie">Italie</option>
                <option id='option' value="Maroc">Maroc</option>
            </select>
        </>
    )
}