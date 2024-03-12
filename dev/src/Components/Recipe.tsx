import BottomBar from "./BottomBar";
import React from "react";
import '../Styles/MainPage.css';
import '../Styles/Main.css';
import Header from "./Header";

function Recipe() {
    return (
        <div className="application-page">
            <div className="application-header">
                <Header headerStyle="recipe"/>
            </div>
            <div className="application-page-content">

            </div>
            <div className="application-bottomBar">
                <BottomBar activePage="0"/>
            </div>
        </div>
    );
}

export default Recipe;