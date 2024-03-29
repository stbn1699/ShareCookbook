import React, {useEffect, useState} from "react";
import "../Styles/MainPage.css";
import Header from "./Header";
import RecipePreview from "./RecipePreview";
import BottomBar from "./BottomBar";
import {Link} from "react-router-dom"

export function MainPage() {

    const [publications, setPublications] = useState([]);

    useEffect(() => {
        console.log(`fetching publications from : ${sessionStorage.getItem('apiUrl')}/publications/getAll`)
        fetch(`${sessionStorage.getItem('apiUrl')}/publications/getAll`)
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
                    <Link to={`/Recipe/${publication.uuid}`}>
                        <RecipePreview fond="01"
                                       titre={publication.title}
                                       temps={publication.time_to_cook}
                                       personnes={publication.n_personnes}
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