import React, {useEffect, useState} from "react";
import Header from "./Header";
import BottomBar from "./BottomBar";
import "../Styles/Account.css";

function Account() {
    const [userData, setUserData] = useState({username: '', full_name: '', email: ''});

    useEffect(() => {
        const userUUID = localStorage.getItem('userUUID') || sessionStorage.getItem('userUUID');

        fetch(`${sessionStorage.getItem('apiUrl')}/user/getById/${userUUID}`)
            .then(response => response.json())
            .then(data => {
                setUserData(data);
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
                <div className="input-info-box">
                    <div className="input-info josefin-slab">Nom d'utilisateur : {userData.username}</div>
                    <div className="input-info josefin-slab">Nom : {userData.full_name}</div>
                    <div className="input-info josefin-slab">E-mail : {userData.email}</div>
                </div>
            </div>
            <div className="application-bottomBar">
                <BottomBar activePage="4"/>
            </div>
        </div>
    );
}

export default Account;