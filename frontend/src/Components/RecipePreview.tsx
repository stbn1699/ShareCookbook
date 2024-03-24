import "../Styles/ReccipePreview.css";
import '../Styles/Main.css';

function RecipePreview(props: { fond: string; titre: string; temps: number; personnes: number; likes_count: number;}){
    return(
        <div className="reciprev-box">
            <div className="reciprev-preview">
                <div className="image-fond">

                </div>
                <div className="fond-gradient">
                    <div className="josefin-slab reciprev-info">
                        - {props.temps} min
                        <br/>
                        - {props.personnes} personnes
                        <br/>
                        - {props.likes_count} likes
                    </div>
                    <div className="josefin-slab reciprev-title">{props.titre}</div>
                </div>
            </div>
        </div>
    )
}

export default RecipePreview;