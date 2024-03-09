import BottomBar from "./BottomBar";
import React from "react";
import '../Styles/MainPage.css';
import '../Styles/Main.css';
import Header from "./Header";
import RecipePreview from "./RecipePreview";

function MainPage() {
    return (
        <div className="application-page">
            <div className="application-header">
                <Header/>
            </div>
            <div className="application-page-content">
                <RecipePreview fond="01" titre="boeuf bourguignon" temps="120" personnes="6" account="@JouJ"/>
            </div>
            <div className="application-bottomBar">
                <BottomBar/>
            </div>
        </div>
    );
}

export default MainPage;