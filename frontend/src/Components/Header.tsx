import {useNavigate} from "react-router-dom";
import {BsArrowLeftCircleFill} from "react-icons/bs";
import "../Styles/Header.css";

function Header(props: { headerStyle: string }) {

    const navigate = useNavigate();

    switch (props.headerStyle) {
        case "recipe":
            return (
                <div className="bottom-bar-box">
                    <button className="goBack-button" onClick={() => {navigate('/MainPage');}}>
                        <BsArrowLeftCircleFill style={{fontSize: '4vh', color: '#386641'}}/>
                    </button>
                </div>
            );
        case "NewRecipe":
            return (
                <div className="bottom-bar-box">
                    <div className="header-title josefin-slab">NewRecipe</div>
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