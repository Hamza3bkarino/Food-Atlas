import './Categories.css'

export default function Categorie () {

    return(
        <>
            <div className='Categorie_Section'>
                <div className='Categorie_Card'>
                    <img src="/images/tagine.png" alt="tagine" width={70} />
                    <h3>Maroc</h3>
                </div>
                <div className='Categorie_Card'>
                    <img src="/images/spaghetti.png" alt="tagine" width={70} />
                    <h3>Italie</h3>
                </div>
                <div className='Categorie_Card'>
                    <img src="/images/bread.png" alt="tagine" width={70} />
                    <h3>France</h3>
                </div>
            </div>
        </>
    )
}