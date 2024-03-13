import "../Styles/ReccipePreview.css";
import '../Styles/Main.css';

function RecipePreview(props: { fond: string; titre: string; temps: number; personnes: number;}){
    return(
        <div className="recipe-box">
            <div className="recipe-preview">
                <div className="image-fond">

                </div>
                <div className="fond-gradient">
                    <div className="josefin-slab recipe-column recipe-info">
                        - {props.temps} min
                        <br/>
                        - {props.personnes} personnes
                    </div>
                    <div className="josefin-slab recipe-column recipe-title">{props.titre}</div>
                </div>
            </div>
        </div>
    )
}

export default RecipePreview;