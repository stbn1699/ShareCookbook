import Header from "./Header";
import {Link} from "react-router-dom";
import RecipePreview from "./RecipePreview";
import BottomBar from "./BottomBar";
import React, {useEffect, useState} from "react";
import '../Styles/SearchRecipe.css';
import {BsSearch} from "react-icons/bs";

function SearchRecipe() {
    const [searchContent, setSearchContent] = useState("");
    const [errorText, setErrorText] = useState("");
    const [publications, setPublications] = useState([]);

    const searchContentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchContent(event.target.value);
    };

    const searchRecipes = () => {
        fetch(`${sessionStorage.getItem('apiUrl')}/publication/getPublicationBySearch/${searchContent}`)
            .then(response => response.json())
            .then(data => setPublications(data))
            .catch(error => console.error('Error:', error));
        setErrorText("Aucune correspondance trouvée...");
    };

    useEffect(() => {
        setErrorText("Effectuez une recherche...");
    }, []);

    return (
        <div className="application-page">
            <div className="application-header">
                <Header headerStyle="SearchRecipe"/>
            </div>
            <div className="application-page-content">
                <div className="SearchRecipe-search-bar">
                    <input
                        type="text"
                        value={searchContent}
                        onChange={searchContentInputChange}
                        placeholder="Effectuez une recherche..."
                        className="SearchRecipe-search-input"
                    />
                    <button onClick={searchRecipes} className="SearchRecipe-search-button">
                        <BsSearch style={{fontSize: '4vh', color: '#f2e8cf'}}/>
                    </button>
                </div>
                {publications !== undefined && publications.length === 0 && <div className="SearchRecipe-errorText josefin-slab">{errorText}</div>}
                {publications && publications.map((publication: any) => (
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
                <BottomBar activePage="2"/>
            </div>
        </div>
    )
}

export default SearchRecipe;