import BottomBar from "./BottomBar";
import React from "react";
import '../Styles/MainPage.css';
import '../Styles/Main.css';

function MainPage() {
    return (
        <div className="application-page">
            <div className="application-page-content">
                <h1>Main page</h1>
                <p>This is the main page of the application.</p>
            </div>
            <div className="application-bottomBar">
                <BottomBar/>
            </div>
        </div>
    );
}

export default MainPage;