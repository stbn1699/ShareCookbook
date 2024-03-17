import React, {useEffect, useState} from "react";
import "../Styles/MainPage.css";
import Header from "./Header";
import RecipePreview from "./RecipePreview";
import BottomBar from "./BottomBar";
import {Link} from "react-router-dom"

export function MainPage() {

    const [publications, setPublications] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/publications/getAll')
            .then(response => response.json())
            .then(data => setPublications(data))
            .then(data => console.log("publications : " + publications))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="application-page">
            <div className="application-header">
                <Header headerStyle="none"/>
            </div>
            <div className="application-page-content">
                {publications.map((publication: any) => (
                    <Link to="/Recipe" key={publication.id}>
                        <RecipePreview fond="01"
                                       titre={publication.title}
                                       temps={publication.info_1}
                                       personnes={publication.info_2}
                                       likes_count={publication.likes_count}/>
                    </Link>
                ))}
            </div>
            <div className="application-bottomBar">
                <BottomBar activePage="1"/>
            </div>
        </div>
    );
}

export default MainPage;