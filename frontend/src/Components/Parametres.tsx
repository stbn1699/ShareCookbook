import Header from "./Header";
import {Link, useNavigate} from "react-router-dom";
import BottomBar from "./BottomBar";
import React from "react";
import "../Styles/Parametres.css";

function Parametres() {

    const navigate = useNavigate();

    const deconnexion = () => {
        // Supprimer userUUID du localStorage
        localStorage.removeItem('userUUID');

        // Supprimer userUUID du sessionStorage
        sessionStorage.removeItem('userUUID');

        navigate('/');
    };

    return (
        <div className="application-page">
            <div className="application-header">
                <Header headerStyle="Parametres"/>
            </div>
            <div className="application-page-content Parametres-page-content">
                <button className="Parametres-deconnexion josefin-slab" onClick={deconnexion}>Déconnexion</button>
            </div>
            <div className="application-bottomBar">
                <BottomBar activePage="5"/>
            </div>
        </div>
    )
}

export default Parametres