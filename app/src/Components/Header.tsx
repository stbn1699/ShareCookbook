import {useNavigate} from "react-router-dom";
import {BsArrowLeftCircleFill} from "react-icons/bs";
import "../Styles/Header.css";

function Header(props: { headerStyle: string }) {

    const navigate = useNavigate();

    switch (props.headerStyle) {
        case "recipe":
            return (
                <div>
                    <button className="goBack-button" onClick={() => {navigate(-1);}}>
                        <BsArrowLeftCircleFill style={{fontSize: '4vh', color: '#386641'}}/>
                    </button>
                </div>
            );
        case "none":
            return (
                <div>

                </div>
            );
        default:
            return (
                <div>

                </div>
            );
    }
}

export default Header;