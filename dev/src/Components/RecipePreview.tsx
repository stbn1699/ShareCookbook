import "../Styles/ReccipePreview.css";
import '../Styles/Main.css';

function RecipePreview(props: { fond: string; titre: string; temps: string; personnes: string; account: string;}){
    return(
        <div className="recipe-box">
            <div className="recipe-preview">
                <div className="image-fond">
                    <img src="../img/recettes/recette-01.jpg" alt="test"/>
                </div>
                {/*<div className="fond-gradient">
                    <div className="josefin-slab recipe-poster">{props.account}</div>
                    <div className="josefin-slab recipe-title">{props.titre}</div>
                    <div className="josefin-slab recipe-info">
                        - {props.temps} min
                        - {props.personnes} personnes
                    </div>
                </div>*/}
            </div>
        </div>
    )
}

export default RecipePreview;