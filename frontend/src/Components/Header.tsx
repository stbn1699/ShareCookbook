import {useNavigate} from "react-router-dom";
import {BsArrowLeftCircleFill} from "react-icons/bs";
import "../Styles/Header.css";

function Header(props: { headerStyle: string }) {

    const navigate = useNavigate();

    switch (props.headerStyle) {
        case "Recipe":
            return (
                <div className="bottom-bar-box">
                    <button className="goBack-button" onClick={() => {
                        navigate(-1);
                    }}>
                        <BsArrowLeftCircleFill style={{fontSize: '4vh', color: '#386641'}}/>
                    </button>
                    <div className="header-title josefin-slab">Recette</div>
                    <div className="header-cale"></div>
                </div>
            );
        case "Commentaires":
            return (
                <div className="bottom-bar-box">
                    <button className="goBack-button" onClick={() => {
                        navigate(-1);
                    }}>
                        <BsArrowLeftCircleFill style={{fontSize: '4vh', color: '#386641'}}/>
                    </button>
                    <div className="header-title josefin-slab">Commentaires</div>
                    <div className="header-cale"></div>
                </div>
            );
        case "SearchRecipe":
            return (
                <div className="bottom-bar-box">
                    <button className="goBack-button" onClick={() => {
                        navigate(-1);
                    }}>
                        <BsArrowLeftCircleFill style={{fontSize: '4vh', color: '#386641'}}/>
                    </button>
                    <div className="header-title josefin-slab">Recherche</div>
                    <div className="header-cale"></div>
                </div>
            );
        case "NewRecipe":
            return (
                <div className="bottom-bar-box">
                    <div className="header-title josefin-slab">Nouvelle Recette</div>
                </div>
            );
        case "Account":
            return (
                <div className="bottom-bar-box">
                    <div className="header-title josefin-slab">Mon profil</div>
                </div>
            );
        case "Parametres":
            return (
                <div className="bottom-bar-box">
                    <div className="header-title josefin-slab">Paramètres</div>
                </div>
            );
        case "none":
            return (
                <div className="bottom-bar-box">

                </div>
            );
        default:
            return (
                <div className="bottom-bar-box">

                </div>
            );
    }
}

export default Header;