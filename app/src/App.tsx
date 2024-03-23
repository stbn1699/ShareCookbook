import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Login from "./Components/Login";
import MainPage from "./Components/MainPage";
import Recipe from "./Components/Recipe";
import SignUp from "./Components/SignUp";
import NewRecipe from "./Components/NewRecipe";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/MainPage" element={<MainPage/>}/>
                <Route path="/Recipe/:uuid" element={<Recipe/>}/>
                <Route path="/NewRecipe" element={<NewRecipe/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
            </Routes>
        </Router>
    );
}

export default App;


/*
* TODO et trucs a fix :
* - l'ajout d'un nouvel ingrédient, il faudrait que ça focus l'input a chaque fois sinon relou
* - les boutons de la nouvelle recette (ajouter et reset)
* - passer tout en français
* - mettre les infos de la prévisualisation MainPage en plus large pour accueillir 100-999 personnes
* - modifier le style de "se souvenir de moi
* - ajouter un bouton de déconexion dans la page paramètres
* - faire des options de compte comme changer son username, au moins pour le moment afficher les infos*/