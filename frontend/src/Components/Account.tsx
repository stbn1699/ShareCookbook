import React, {useEffect, useState} from "react";
import Header from "./Header";
import BottomBar from "./BottomBar";
import "../Styles/Account.css";
import {Link} from "react-router-dom";
import RecipePreview from "./RecipePreview";

function Account() {
    const [userData, setUserData] = useState({username: '', full_name: '', email: ''});
    const [publications, setPublications] = useState([]);
    const userUUID = localStorage.getItem('userUUID') || sessionStorage.getItem('userUUID');

    useEffect(() => {
        fetch(`${sessionStorage.getItem('apiUrl')}/user/getById/${userUUID}`)
            .then(response => response.json())
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        fetch(`${sessionStorage.getItem('apiUrl')}/publication/getPublicationsByUserId/${userUUID}`)
            .then(response => response.json())
            .then(data => {
                setPublications(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div className="application-page">
            <div className="application-header">
                <Header headerStyle="Account"/>
            </div>
            <div className="application-page-content">
                <div className="Accounts-title">Informations du compte</div>
                <div className="Accounts-input-info-box">
                    <div className="Accounts-input-info josefin-slab">Nom d'utilisateur : {userData.username}</div>
                    <div className="Accounts-input-info josefin-slab">Nom : {userData.full_name}</div>
                    <div className="Accounts-input-info josefin-slab">E-mail : {userData.email}</div>
                </div>
                <div className="Accounts-title">Publications</div>
                {publications && publications.map((publication: any) => (
                    <Link to={`/Recipe/${publication.uuid}`}>
                        <RecipePreview fond="01"
                                       titre={publication.title}
                                       temps={publication.info_1}
                                       personnes={publication.info_2}
                                       likes_count={publication.likes_count}/>
                    </Link>
                ))}
            </div>
            <div className="application-bottomBar">
                <BottomBar activePage="4"/>
            </div>
        </div>
    );
}

export default Account;