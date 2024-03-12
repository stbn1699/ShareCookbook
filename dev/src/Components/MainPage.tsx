import {QueryError} from "mysql2";
import React, {useEffect, useState} from "react";
import "@/styles/styles.css"
import Header from "./Header";
import RecipePreview from "./RecipePreview";
import BottomBar from "./BottomBar";
import {Link} from "react-router-dom"

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "application",
    password: "application",
    database: "sharecookbook"
});

export function databaseConnexion() {
    connection.connect((err: QueryError) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
            return;
        }
        console.log('Connecté à la base de données MySQL');
    });
}

export function MainPage() {
    const [viewList, setViewList] = useState(false);
    const [publications, setPublication] = useState([]);

    useEffect(() => {
        connection.query('SELECT * FROM products', (err: QueryError | null, results: any) => {
            if (err) {
                console.error('Erreur lors de la requête SQL :', err);
                return;
            }
            setPublication(results);
        });
    }, []);

    function changeView() {
        setViewList(!viewList);
    }

    return (
        <div className="application-page">
            <div className="application-header">
                <Header headerStyle="none"/>
            </div>
            <div className="application-page-content">
                {publications.map((publication) => (
                    <Link to="/Recipe" key={publication.id}>
                        <RecipePreview fond="01" titre={publication.title} temps={publication.info_1}
                                       personnes={publication.info_2}/>
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